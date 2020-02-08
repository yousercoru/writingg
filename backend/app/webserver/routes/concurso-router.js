"use strict";

const express = require("express");

const checkAccountSession = require('../controllers/account/check-account-session');

const createConcurso = require('../controllers/concurso/create-concurso');

const router = express.Router();

router.post("/concursos", checkAccountSession, createConcurso);

module.exports = router;