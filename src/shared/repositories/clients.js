const { Client } = require('../../mysql/models');

/**
 * 一件取得一件取得
 * @param {Object} conditions
 * @return {Promise<Client>}
 */
const findOne = async (conditions) => {
  return await Client.findOne(conditions);
};

module.exports = {
  findOne,
};
