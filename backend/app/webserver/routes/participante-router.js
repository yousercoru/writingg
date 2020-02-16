"use strict";

const express = require("express");
const multer = require("multer");

const checkAccountSession = require("../controllers/account/check-account-session");
const checkEscritorRol = require("../controllers/account/check-escritor-rol");
const upload = multer();

const getConcursos = require("../controllers/concurso/get-concursos");
const getConcurso = require("../controllers/concurso/get-concurso");
const addParticipanteToConcurso = require("../controllers/participante/add-participante-concurso");
const deleteParticipanteToConcurso = require("../controllers/participante/delete-participante-concurso");
const uploadDoc = require("../controllers/participante/upload-doc");

const router = express.Router();

router.get("/concursos", getConcursos);
router.get("/concursos/:idconcursos", getConcurso);
router.post(
  "/concursos/:idconcursos",
  checkAccountSession,
  checkEscritorRol,
  addParticipanteToConcurso,
);
// router.post(
//   "/concursos/:idconcursos",
//   checkAccountSession,
//   checkEscritorRol,
//   upload.single("document"),
//   uploadDoc,
// );
router.put(
  "/concursos/:idconcursos",
  checkAccountSession,
  checkEscritorRol,
  deleteParticipanteToConcurso
);

module.exports = router;
