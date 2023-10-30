const { User } = require('../../mysql/models');

/**
 * メアド指定でユーザー一件取得
 * @param {string} email
 * @return {Promise<User>}
 */
const findOneByEmail = async (email) => {
  return await User.findOne({where: { email }, raw: true});
};

module.exports = {
  findOneByEmail,
};
