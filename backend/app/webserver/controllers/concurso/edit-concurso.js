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

async function editConcurso(req, res, next) {
  const concursoData = { ...req.body };

  const { idconcursos } = req.params;

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
    ganador,
    segundo,
    tercero,
  } = concursoData;

  let bases_pdf;
  if (req.files.bases_pdf) {
    bases_pdf = await updloadFile(req.files.bases_pdf);
  }
  let cartel;
  if (req.files.cartel) {
    cartel = await updloadFile(req.files.cartel);
  }

  const concurso = {
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
    ganador,
    segundo,
    tercero,
  };

  if (!cartel) {
    delete concurso.cartel;
  }

  if (!bases_pdf) {
    delete concurso.bases_pdf;
  }

  const connection = await mysqlPool.getConnection();
  try {
    const sqlCreateConcurso = "UPDATE concursos SET ? where idconcursos = ?";

    console.log(connection.format(sqlCreateConcurso, [concurso, idconcursos]));

    const [result] = await connection.query(sqlCreateConcurso, [
      concurso,
      idconcursos,
    ]);

    console.log(result);

    connection.release();

    return res.status(201).send({ sucess: true, result });
  } catch (e) {
    connection.release();
    throw e;
  }
}

module.exports = editConcurso;
