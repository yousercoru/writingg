"use strict";

const Joi = require("@hapi/joi");
const uuidV4 = require("uuid/v4");
const mysqlPool = require("../../../database/mysql-pool");
const updloadFile = require("../helpers/updloadFile");
const slugify = require("../helpers/slugify");

const httpServerDomain = process.env.HTTP_SERVER_DOMAIN;

async function validate(payload) {
  const schema = Joi.object({
    nombreConcurso: Joi.string().trim().min(1).max(255).required(),
    bases: Joi.string().trim().min(1).max(10000).required(),
    fechaVencimiento: Joi.string().trim().min(1).max(45).required(),
    primerPremio: Joi.string().trim().min(1).max(45).required(),
    fechaPremiados: Joi.string().trim().min(1).max(45).required(),
    categoria: Joi.string().trim().min(1).max(45).required(),
  });

  Joi.assert(payload, schema);
}

async function createConcurso(req, res, next) {
  const concursoData = { ...req.body };

  console.log(concursoData);

  const { userId } = req.claims;

  console.log(req.files.cartel);

  console.log(userId);

  const created_At = new Date()
    .toISOString()
    .substring(0, 19)
    .replace("T", " ");
  const {
    nombreConcurso,
    categoria,
    bases,
    fechaVencimiento,
    primerPremio,
    segundoPremio,
    tercerPremio,
    fechaPremiados,
  } = concursoData;

  let bases_pdf;
  let cartel;
  if (req.files.bases_pdf) {
    bases_pdf = await updloadFile(req.files.bases_pdf);
  }

  if (req.files.cartel) {
    cartel = await updloadFile(req.files.cartel);
  }

  const idconcursos = uuidV4();
  const concurso = {
    idconcursos,
    users_idusers: userId,
    created_At,
    nombreConcurso,
    bases,
    fechaVencimiento,
    primerPremio,
    segundoPremio,
    tercerPremio,
    fechaPremiados,
    cartel: cartel ? cartel.url : null,
    bases_pdf: bases_pdf ? bases_pdf.url : null,
    categoria,
    slugNombreConcurso: slugify(nombreConcurso),
  };

  const connection = await mysqlPool.getConnection();
  try {
    const sqlCreateConcurso = "INSERT INTO concursos SET ?";

    console.log(concurso);

    console.log(connection.format(sqlCreateConcurso, concurso));

    const [result] = await connection.query(sqlCreateConcurso, concurso);

    console.log(result);

    connection.release();

    return res.status(201).send({ sucess: true, result });
  } catch (e) {
    connection.release();
    throw e;
  }
}

module.exports = createConcurso;
