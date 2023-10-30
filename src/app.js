const express = require('express')
const createError = require('http-errors')
const app = express()
const port = 8080;
const clientRepository = require('./shared/repositories/clients');
const invoiceRepository = require('./shared/repositories/invoices');
const dayjs = require('dayjs');
const timezone = require('dayjs/plugin/timezone');
const utc = require('dayjs/plugin/utc');
const { DEFAULT_LIMIT, DEFAULT_OFFSET, INVOICE_STATUS, DEFAULT_TIME_ZONE, TAX_RATE, COMISSION_RATE } = require('./shared/constant');
const { passwordVerify, addNow } = require('./shared/middlewares');
const uuid = require('uuid');
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault(DEFAULT_TIME_ZONE);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.use(passwordVerify)
app.use(addNow)

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// 請求書一覧取得
app.get('/api/invoices', async (req, res) => {
  const { limit = DEFAULT_LIMIT, offset = DEFAULT_OFFSET } = req.query;
  const { companyId } = req._context.user

  // ユーザーが所属している企業の請求書で絞る
  const invoices = await invoiceRepository.findAll({ where: { companyId }, limit, offset });
  res.json(invoices);
})

// 請求書作成
app.post('/api/invoices', async (req, res) => {
  const { user, now } = req._context;
  const { clientId, paymentAmount } = req.body;
  // clientIdがstring, paymentAmountがnumberでなければエラー
  if (typeof clientId !== 'string' || typeof paymentAmount !== 'number') {
    res.status(400).json({ message: 'invalid request.' });
    return;
  }
  // ユーザーが所属している企業のクライアントであるかをチェックする
  const conditions = { where: { clientId, companyId: user.companyId }, raw: true }
  const client = await clientRepository.findOne(conditions);
  if (!client) {
    res.status(400).json({ message: 'client is not found.' });
    return;
  }
  // 支払金額 に手数料4%を加えたものに更に手数料の消費税を加えたものを請求金額とする
  const invoiceAmount = paymentAmount + (paymentAmount * COMISSION_RATE * (1 + TAX_RATE));
  const tax = invoiceAmount * TAX_RATE;
  const commission = invoiceAmount * COMISSION_RATE;
  const params = {
    invoiceId: uuid.v4(),
    companyId: user.companyId,
    clientId,
    issuedAt: dayjs(now).toDate(),
    commission,
    commissionRate: COMISSION_RATE,
    tax,
    taxRate: TAX_RATE,
    invoiceAmount,
    paymentAmount,
    status: INVOICE_STATUS.pending,
    // 支払い期限は発行日から1ヶ月後とする
    paymentDeadline: dayjs(now).add(1, 'month').endOf('day').toDate(),
  };
  await invoiceRepository.create(params);
  res.status(201).end();
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