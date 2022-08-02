const express = require("express");
const { ROUTES } = require("../constants");
const { allInstruments, instrument } = require("../controllers/instruments");

const router = express.Router();

router.route(ROUTES.GET_ALL_INSTRUMENTS).get(allInstruments);
router.route(ROUTES.GET_INSTRUMENT).get(instrument);

module.exports.mainRouter = router;
