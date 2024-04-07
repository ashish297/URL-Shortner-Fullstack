const express = require("express");
const router = express.Router();
const { handleGenNewShortUrl, handleGetRedirectUrl, handleGetAnalytics } = require("../controllers/url")

router.route("/").post( handleGenNewShortUrl );

router.route("/:shortid").get(handleGetRedirectUrl);

router.route("/analytics/:shortid").get( handleGetAnalytics );

module.exports = router;




