"use strict";

const express = require("express");
const multer = require("multer");
const router = express.Router();
const upload = multer();


const checkAccountSession = require("../controllers/account/check-account-session");
const checkEscritorRol = require("../controllers/account/check-escritor-rol");
const checkOrganizadorRol = require("../controllers/account/check-organizador-rol");


const addParticipanteToConcurso = require("../controllers/concurso/add-participante-concurso");
const createConcurso = require("../controllers/concurso/create-concurso");
const deleteConcurso = require("../controllers/concurso/delete-concurso");
const deleteParticipanteToConcurso = require("../controllers/concurso/delete-participante-concurso");
const getConcursantesConcurso = require("../controllers/concurso/get-concursantes-concurso");
const getConcurso = require("../controllers/concurso/get-concurso");
const getConcursos = require("../controllers/concurso/get-concursos");
const getConcursosByCategoria = require("../controllers/concurso/get-concursos-by-categoria");
const getConcursosOrganizador = require("../controllers/concurso/get-concursos-organizador");
const getConcursosParticipante = require("../controllers/concurso/get-concursos-participante");
const uploadDoc = require("../controllers/concurso/upload-doc");


router.post("/concursos", checkAccountSession, checkOrganizadorRol, createConcurso);
router.get("/concursos", getConcursos);
router.get("/:categoria", getConcursosByCategoria);
router.get("/concursos/:idconcursos", getConcurso);
// router.get("/:categoria/concursos", getConcursosByCategoria);
router.delete("/concursos/:idconcursos", checkAccountSession, checkOrganizadorRol, deleteConcurso);
router.get("/participante/concursos", checkAccountSession, checkEscritorRol, getConcursosParticipante);
router.get("/organizador/concursos", checkAccountSession, checkOrganizadorRol, getConcursosOrganizador);
router.post("/concursos/:idconcursos", checkAccountSession, checkEscritorRol, addParticipanteToConcurso);
router.put("/concursos/:idconcursos", checkAccountSession, checkEscritorRol, deleteParticipanteToConcurso);
router.get("/concursos/:idconcursos/concursantes", checkAccountSession, checkOrganizadorRol, getConcursantesConcurso);
router.post("/concursos/:idconcursos/obra", checkAccountSession, checkEscritorRol, upload.single("document"), uploadDoc);


module.exports = router;




