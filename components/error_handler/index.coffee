fs = require 'fs'
jade = require 'jade'
{ REVEAL_ERRORS } = require '../../config'

renderTemplate = jade.compile(
  fs.readFileSync(__dirname + '/template.jade')
  { filename: __dirname + '/template.jade' }
)

errorHandler = module.exports = exports = {}

# Since this is the last non-error-handling middleware
# use()d, we assume 404, as nothing else responded.
errorHandler.pageNotFound = (req, res, next) ->
  if req.accepts 'html' # respond with html page
    res.send 404, renderTemplate { code: 404, error: "Not Found", sd: res.locals?.sd or {} }
    return

  if req.accepts 'json' # respond with json
    res.send error: 'Not found'
    return

  # Default to plain-text. send()
  (res.type 'txt').send 'Not found'

# Error-handling middleware
errorHandler.internalError = (err, req, res, next) ->
  detail = if REVEAL_ERRORS then err.message else null
  res.send res.statusCode, renderTemplate
    code: res.statusCode
    error: err
    sd: res.locals?.sd or {}
    detail: detail

errorHandler.javascriptError = (req, res, next) ->
  console?.log(req.body) # Logs client-side errors to stdout for debugging purpose
  next new Error(JSON.stringify req.body)

errorHandler.socialAuthError = (err, req, res, next) ->
  if err.toString().match('User Already Exists')
    res.redirect '/log_in?error=already-signed-up'
  else if err.toString().match('Failed to find request token in session')
    res.redirect '/log_in?error=account-not-found'
  else
    next()