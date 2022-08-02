const express = require('express');
const { ROUTES } = require('../constants');
const { login, register, token, sessionVerify } = require('../controllers/auth');

const router = express.Router();

router.route(ROUTES.LOGIN).post(login);
router.route(ROUTES.REGISTER).post(register);
router.route(ROUTES.SESSION_VERIFY).get(sessionVerify)

module.exports.users = router;