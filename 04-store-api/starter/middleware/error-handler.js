const errorHandlerMiddleware = async (err, req, res, next) => {
  console.log(err) //err is global, it may had came back from any thing (any error any place) so you can use it here
  return res.status(500).json({ msg: 'Something went wrong, please try again',err: `${err}` })
}

module.exports = errorHandlerMiddleware
