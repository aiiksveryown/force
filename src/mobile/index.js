import * as modules from "./lib/global_react_modules"
const app = (module.exports = require("express")())

// TODO: Move to src/lib/middleware/locals once done developing; this is just so
// we can get hot module reloading which only works in /desktop and /mobile
app.use(
  require("@artsy/stitch/dist/server").middleware({
    modules,
    Wrapper: modules.StitchWrapper,
  })
)

app.use(require("./apps/auth"))
app.use(require("./apps/page"))
app.use(require("./apps/home"))
app.use(require("./apps/unsubscribe"))
app.use(require("./apps/fair_organizer"))
app.use(require("./apps/contact"))
app.use(require("./apps/how_auctions_work"))
app.use(require("./apps/profile"))
app.use(require("./apps/user"))
app.use(require("./apps/artwork"))
app.use(require("./apps/feature"))
app.use(require("./apps/gene"))
app.use(require("./apps/artists"))
app.use(require("./apps/partners"))
app.use(require("./apps/articles"))
app.use(require("./apps/fair_organizer"))
app.use(require("./apps/fair"))
app.use(require("./apps/fair_info"))
app.use(require("./apps/tag"))
app.use(require("./apps/search"))
app.use(require("./apps/show"))
app.use(require("./apps/galleries_institutions"))
app.use(require("./apps/browse"))
app.use(require("./apps/partner_profile"))
app.use(require("./apps/favorites_following"))
app.use(require("./apps/shortcuts"))
app.use(require("./apps/art_fairs"))
app.use(require("./apps/auctions"))
app.use(require("./apps/shows"))
app.use(require("./apps/auction_support"))
app.use(require("./apps/dev"))
