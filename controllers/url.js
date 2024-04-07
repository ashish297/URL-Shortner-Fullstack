const ShortUniqueId = require("short-unique-id");
const { randomUUID } = new ShortUniqueId({ length: 8 });
const url = require("../models/url");

async function handleGenNewShortUrl(req, res) {
  const body = req.body;
  const shortID = randomUUID();
  await url.create({
    shortId: shortID,
    redirectUrl: body.url,
    visitHistory: [],
    createdBy: req.user._id,
  })

  return res.render("home", {
    id: shortID,
  })

}

async function handleGetRedirectUrl(req, res) {
  const shortid = req.params.shortid;
  const entry = await url.findOneAndUpdate({shortId : shortid},{
    $push: {
      visitHistory: { timestamp: Date.now() }
    }
  })

  res.redirect(entry.redirectUrl);

}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortid;
  const result = await url.findOne({shortId});
  return res.json({
    totalClicks : result.visitHistory.length,
    analytics : result.visitHistory
  })
}

module.exports = {
  handleGenNewShortUrl,
  handleGetRedirectUrl,
  handleGetAnalytics
}