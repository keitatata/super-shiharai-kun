const { Invoice } = require('../../mysql/models');

/**
 * 請求書情報を一覧取得する
 * @return {Promise<{ rows: Invoice[]; count: number }>}
 */
const findAll = async (conditions = {}) => {
  return await Invoice.findAndCountAll(conditions);
};

/**
 * 請求書情報を作成する
 * @param {string} params.invoiceId
 * @param {string} params.clientId
 * @param {string} params.companyId
 * @param {number} params.issuedAt
 * @param {number} params.commission
 * @param {number} params.commissionRate
 * @param {number} params.tax
 * @param {number} params.taxRate
 * @param {number} params.invoiceAmount
 * @param {number} params.paymentAmount
 * @param {status} params.status
 * @param {number} params.paymentDeadline
 * @return {Promise<{ rows: Invoice[]; count: number }>}
 */
const create = async (params = {}) => {
  return await Invoice.create(params);
};

module.exports = {
  findAll,
  create,
};
