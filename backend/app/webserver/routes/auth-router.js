"use strict";

const express = require("express");
const login = require("../controllers/auth/auth-login-controller");
const getAuthUser = require("../controllers/auth/get-auth-user");
const checkAccountSession = require("../controllers/account/check-account-session");

const router = express.Router();

router.get("/auth/user", checkAccountSession, getAuthUser);

router.post("/auth", login);

module.exports = router;
