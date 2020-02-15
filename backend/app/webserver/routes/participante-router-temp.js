"use strict";

const express = require("express");

const checkAccountSession = require("../controllers/account/check-account-session");
const checkEscritorRol = require("../controllers/account/check-escritor-rol");
const checkOrganizadorRol = require("../controllers/account/check-organizador-rol");
const getConcursos = require("../controllers/concurso/get-concursos");
const getConcurso = require("../controllers/concurso/get-concurso");
const addParticipanteToConcurso = require("../controllers/participante/add-participante-concurso");
const deleteParticipanteToConcurso = require("../controllers/participante/delete-participante-concurso");
const getConcursosParticipante = require("../controllers/participante/get-concursos-participante");
const getConcursosOrganizador = require("../controllers/participante/get-concursos-organizador");

const router = express.Router();

router.get("/concursos", getConcursos);
router.get("/concursos/:idconcursos", getConcurso);
router.post(
  "/concursos/:idconcursos",
  checkAccountSession,
  checkEscritorRol,
  addParticipanteToConcurso
);
router.put(
  "/concursos/:idconcursos",
  checkAccountSession,
  deleteParticipanteToConcurso
);
router.get(
  "/participantes/:userId/idconcursos",
  checkAccountSession,
  checkEscritorRol,
  getConcursosParticipante
);

router.get(
  "/organizador/:userId/idconcursos",
  checkAccountSession,
  checkOrganizadorRol,
  getConcursosOrganizador
);

module.exports = router;
