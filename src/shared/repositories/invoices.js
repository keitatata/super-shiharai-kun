const { Invoice } = require('../../mysql/models');

/**
 * 請求書情報を一覧取得する
 * @return {Promise<{ rows: Invoice[]; count: number }>}
 */
const findAll = async (conditions = {}) => {
  return await Invoice.findAndCountAll(conditions);
};

module.exports = {
  findAll,
};
