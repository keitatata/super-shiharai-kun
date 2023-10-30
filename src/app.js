const express = require('express')
const createError = require('http-errors')
const app = express()
const port = 8080;
const invoiceRepository = require('./shared/repositories/invoices');
const { DEFAULT_LIMIT, DEFAULT_OFFSET } = require('./shared/constant');
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.get('/api/invoices', async (req, res) => {
  const { limit = DEFAULT_LIMIT, offset = DEFAULT_OFFSET } = req.query;
  const invoices = await invoiceRepository.findAll({where: {invoiceId: 'f9e1a133-d79a-4000-b0a9-8b7ffa11a320'}, limit, offset});
  res.json(invoices);
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