const express = require('express')
const createError = require('http-errors')
const app = express()
const port = 8080;
const clientRepository = require('./shared/repositories/clients');
const invoiceRepository = require('./shared/repositories/invoices');
const { DEFAULT_LIMIT, DEFAULT_OFFSET, DEFAULT_TIME_ZONE } = require('./shared/constant');
const { passwordVerify, addNow } = require('./shared/middlewares');
const Op = require('sequelize').Op;
const dayjs = require('dayjs');
const timezone = require('dayjs/plugin/timezone');
const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault(DEFAULT_TIME_ZONE);
const expressErrorhandlers = require('express-errorhandlers');
const logger = require('morgan');
const { errorHandler } = expressErrorhandlers.middleware;

app.listen(process.env['SERVICE_PORT'] || port, () => {
  console.log(`Server running on port ${port}`);
});
app.use(logger('combined'));

app.use(passwordVerify)
app.use(addNow)

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// 請求書一覧取得
app.get('/api/invoices', async (req, res) => {
  const { limit = DEFAULT_LIMIT, offset = DEFAULT_OFFSET, startDate, endDate, statuses } = req.query;
  const { companyId } = req._context.user;
  const conditions = { companyId };
  // startDateがendDateよりも後の日付の場合はエラー
  const isValidDate = startDate && endDate ? dayjs(startDate).isBefore(dayjs(endDate)) : true;
  if (!isValidDate) {
    res.status(400).json({ message: 'invalid request.' });
    return;
  }
  // startDateが指定されている場合は条件に追加
  if (startDate) {
    conditions.paymentDeadline = { [Op.gte]: dayjs(startDate).toDate() };
  }
  // endDateが指定されている場合は条件に追加
  if (endDate) {
    if (conditions.paymentDeadline) {
      conditions.paymentDeadline = {
        [Op.and]: [
          conditions.paymentDeadline,
          { [Op.lte]: dayjs(endDate).endOf('day').toDate() },
        ],
      };
    } else {
      conditions.paymentDeadline = { [Op.lte]: dayjs(endDate).endOf('day').toDate() };
    }
  }
  // statusが指定されている場合は条件に追加
  if (statuses) {
    conditions.status = { [Op.in]: statuses.split(',') };
  }

  // ユーザーが所属している企業の請求書で絞る
  const invoices = await invoiceRepository.findAll({ where: conditions, limit: Number(limit), offset: Number(offset), raw: true });
  res.json(invoices);
})

// 請求書作成
app.post('/api/invoices', async (req, res) => {
  const { user, now } = req._context;
  const { clientId, paymentAmount } = req.body;
  // clientIdがstring, paymentAmountがnumberでなければエラー
  if (typeof clientId !== 'string' || typeof paymentAmount !== 'number') {
    res.status(400).json({ message: 'invalid request body param' });
    return;
  }
  // ユーザーが所属している企業のクライアントであるかをチェックする
  const conditions = { where: { clientId, companyId: user.companyId }, raw: true }
  const client = await clientRepository.findOne(conditions);
  if (!client) {
    res.status(400).json({ message: 'client is not found.' });
    return;
  }
  const invoice = await invoiceRepository.create({
    companyId: user.companyId,
    now,
    clientId,
    paymentAmount,
  });
  res.json(invoice);
})

// view engine setup
app.get('/ping', (req, res)=> {
  res.json({ "status": "ok"});
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.use(errorHandler({
  final: (req, res, handler) => {
    if (handler.status >= 500) {
      console.error(handler.error.stack);
    }
  },
}));
module.exports = app;
