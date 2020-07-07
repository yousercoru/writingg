"use strict";

const express = require("express");
const multer = require("multer");
const router = express.Router();
const upload = multer();

const checkAccountSession = require("../controllers/account/check-account-session");
const checkEscritorRol = require("../controllers/account/check-escritor-rol");
const checkOrganizadorRol = require("../controllers/account/check-organizador-rol");

const addGanadoresToConcurso = require("../controllers/concurso/add-ganadores-concurso");
const addParticipanteToConcurso = require("../controllers/concurso/add-participante-concurso");
const addRatingToConcurso = require("../controllers/concurso/add-rating-concurso");
const createConcurso = require("../controllers/concurso/create-concurso");
const deleteConcurso = require("../controllers/concurso/delete-concurso");
const deleteParticipanteToConcurso = require("../controllers/concurso/delete-participante-concurso");
const getParticipantesConcurso = require("../controllers/concurso/get-participantes-concurso");
const getConcurso = require("../controllers/concurso/get-concurso");
const getConcursos = require("../controllers/concurso/get-concursos");
const getConcursosByCategoria = require("../controllers/concurso/get-concursos-by-categoria");
const getConcursosParticipante = require("../controllers/concurso/get-concursos-participante");
const getConcursosOrganizador = require("../controllers/concurso/get-concursos-organizador");
const getConcursosOrganizadorVencidos = require("../controllers/concurso/get-concursosVencidos-organizador");
const searchConcursos = require("../controllers/concurso/search-controller");
const uploadDoc = require("../controllers/concurso/upload-doc");
const editConcurso = require("../controllers/concurso/edit-concurso");
const setRatingConcurso = require("../controllers/concurso/set-rating-concurso");
const setRatingObra = require("../controllers/concurso/set-rating-obra");

const files = upload.fields([{ name: "cartel" }, { name: "bases_pdf" }]);

//Open Enpoints
router.get("/concursos/search", searchConcursos);
router.get("/concurso/:slugNombreConcurso", getConcurso);
router.get("/concursos", getConcursos);
router.get("/concursos/:categoria", getConcursosByCategoria);

// Mostra con
router.get(
  "/concursos-participante",
  checkAccountSession,
  checkEscritorRol,
  getConcursosParticipante
);

router.put(
  "/concursos/rating/:idconcursos",
  checkAccountSession,
  checkEscritorRol,
  addRatingToConcurso
);
router.put(
  "/concursos/ganador/:idconcursos",
  checkAccountSession,
  checkOrganizadorRol,
  addGanadoresToConcurso
);

router.post(
  "/concursos",
  checkAccountSession,
  checkOrganizadorRol,
  files,
  createConcurso
);

router.put(
  "/concursos/:idconcursos",
  checkAccountSession,
  checkOrganizadorRol,
  files,
  editConcurso
);

// router.get("/concursos/:idconcursos", getConcurso);
router.delete(
  "/concursos/:idconcursos",
  checkAccountSession,
  checkOrganizadorRol,
  deleteConcurso
);

router.get(
  "/concursos-organizador",
  checkAccountSession,
  checkOrganizadorRol,
  getConcursosOrganizador
);

router.get(
  "/concursos/organizadorVencidos",
  checkAccountSession,
  checkOrganizadorRol,
  getConcursosOrganizadorVencidos
);

router.post(
  "/concurso-participante/:idconcursos",
  checkAccountSession,
  checkEscritorRol,
  addParticipanteToConcurso
);

router.delete(
  "/concurso-participante/:idconcursos",
  checkAccountSession,
  checkEscritorRol,
  deleteParticipanteToConcurso
);

router.put(
  "/concursos/:idconcursos",
  checkAccountSession,
  checkEscritorRol,
  deleteParticipanteToConcurso
);

router.get(
  "/concursos/:idconcursos/participantes-concurso",
  checkAccountSession,
  checkOrganizadorRol,
  getParticipantesConcurso
);

router.post(
  "/concursos/:idconcursos/obra",
  checkAccountSession,
  checkEscritorRol,
  upload.single("document"),
  uploadDoc
);

router.put(
  "/concurso/:idconcursos/rating-concurso",
  checkAccountSession,
  checkEscritorRol,
  setRatingConcurso
);

router.put(
  "/concurso/:idconcursos/:users_idusers/rating-obra",
  checkAccountSession,
  checkOrganizadorRol,
  setRatingObra
);

module.exports = router;
