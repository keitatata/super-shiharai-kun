const userRepository = require('../repositories/users');
const bcrypt = require('bcrypt');

/*
 * パスワード検証のmiddleware
 */
const passwordVerify = async (req, res, next) => {
  const { password, email } = req.headers;
  // ヘッダーにpasswordとemailがなければエラー
  if (!password || !email) {
    res.status(401).json({ message: 'Unauthorized' });
    next()
  }
  const user = await userRepository.findOneByEmail(req.headers.email)
  // ヘッダーのemailに紐づくユーザーが存在しない場合はエラー
  if (!user) {
    res.status(401).json({ message: 'maybe email or password are incorrect.' });
    next()
  }

  // パスワードがハッシュ値と一致しない場合はエラー
  const isCollect = bcrypt.compareSync(password, user.password);
  if (!isCollect) {
    res.status(401).json({ message: 'maybe email or password are incorrect.' });
    next()
  }
  // 認証に成功した場合はユーザー情報をcontextにセットする
  req._context = req._context || {}
  req._context.user = user
  next()
}

module.exports = passwordVerify