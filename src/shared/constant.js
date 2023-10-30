const c = {};
c.INVOICE_STATUS = {
  pending: 'pending',
  processing: 'processing',
  completed: 'completed',
  error: 'error',
};

c.DEFAULT_LIMIT = 10;
c.DEFAULT_OFFSET = 0;
c.DEFAULT_TIME_ZONE = 'Asia/Tokyo';

c.TAX_RATE = 0.10;
c.COMISSION_RATE = 0.04;

module.exports = c;