/*
 * contextに現在時刻をセットするmiddleware
 */
const addNow = async (req, res, next) => {
  req._context = req._context || {}
  req._context.now = new Date();
  next()
}

module.exports = addNow