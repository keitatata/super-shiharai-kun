const { Invoice } = require('../../mysql/models');
const uuid = require('uuid');
const dayjs = require('dayjs');
const timezone = require('dayjs/plugin/timezone');
const utc = require('dayjs/plugin/utc');
const { INVOICE_STATUS, DEFAULT_TIME_ZONE, TAX_RATE, COMISSION_RATE } = require('../constant');
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault(DEFAULT_TIME_ZONE);

/**
 * 請求書情報を一覧取得する
 * @return {Promise<{ rows: Invoice[]; count: number }>}
 */
const findAll = async (conditions = {}) => {
  return await Invoice.findAndCountAll(conditions);
};

/**
 * 請求書情報を作成する
 * @param {string} params.clientId
 * @param {string} params.companyId
 * @param {number} params.paymentAmount
 * @param {number} params.now
 * @return {Promise<void>}
 */
const create = async (params) => {
  const { companyId, now, clientId, paymentAmount } = params;
  // 支払金額 に手数料4%を加えたものに更に手数料の消費税を加えたものを請求金額とする (小数点は切り上げ)
  const invoiceAmount = Math.ceil(paymentAmount + (paymentAmount * COMISSION_RATE * (1 + TAX_RATE)));
  // 請求金額の4%を手数料とする (小数点は切り上げ)
  const commission = Math.ceil(paymentAmount * COMISSION_RATE);
  // 手数料の消費税を計算する (小数点は切り上げ)
  const tax = Math.ceil(commission * TAX_RATE);
  return await Invoice.create({
    invoiceId: uuid.v4(),
    companyId,
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
  });
};

module.exports = {
  findAll,
  create,
};
