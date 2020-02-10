"use strict";

const express = require("express");

const checkAccountSession = require("../controllers/account/check-account-session");
const checkEscritorRol = require("../controllers/account/check-escritor-rol");
const getConcursos = require("../controllers/concurso/get-concursos");
const getConcurso = require("../controllers/concurso/get-concurso");
const addParticipanteToConcurso = require("../controllers/participante/add-into-concurso");

const router = express.Router();

router.get("/concursos", getConcursos);
router.get("/concursos/:idconcursos", getConcurso);
router.post("/concursos/:idconcursos", checkAccountSession, checkEscritorRol, addParticipanteToConcurso);

module.exports = router;