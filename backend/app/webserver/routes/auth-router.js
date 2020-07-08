"use strict";

const express = require("express");
const login = require("../controllers/auth/auth-login-controller");
const { getAuthUser } = require("../controllers/auth/get-auth-user");
const checkAccountSession = require("../controllers/account/check-account-session");
const updateAccount = require("../controllers/account/update-account");

const router = express.Router();

router.get("/auth/user", checkAccountSession, getAuthUser);

router.post("/auth", login);

router.put("/update-account", checkAccountSession, updateAccount);

module.exports = router;
