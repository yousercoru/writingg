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

  // COMPROBAR QUE LLEGAN LOS DATOS
  console.log(concursoData);

  const { userId } = req.claims;
  console.log(userId);

  try {
    await validate(concursoData);
  } catch (e) {
    return res.status(400).send(e);
  }

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
    fechaPremiados,
    bases_pdf,
    cartel,
  } = concursoData;
  //   const { nombreConcurso, categoria, bases, fechaVencimiento, primerPremio, fechaPremiados} = concursoData;

  /**
   * TODO
   *
   * guardar el pdf en cloudinary
   * guardar la imagen cartel cloudinary
   */

  const bases_pdf_link = await updloadFile(bases_pdf, uuidV4());
  const cartel_link = await updloadFile(cartel, uuidV4());

  const idconcursos = uuidV4();
  const concurso = {
    idconcursos,
    users_idusers: userId,
    nombreConcurso,
    categoria,
    bases,
    fechaVencimiento,
    primerPremio,
    fechaPremiados,
    created_At,
    slugNombreConcurso: slugify(nombreConcurso),
    //cartel: cartel_link,
    //åbases_pdf: bases_pdf_link,
  };

  try {
    const connection = await mysqlPool.getConnection();
    try {
      const sqlCreateConcurso = "INSERT INTO concursos SET ?";

      console.log(concurso);

      console.log(connection.format(sqlCreateConcurso, concurso));

      await connection.query(sqlCreateConcurso, concurso);

      connection.release();

      res.header(
        "Location",
        `${httpServerDomain}/api/concursos/${idconcursos}`
      );
      return res.status(201).send();
    } catch (e) {
      connection.release();
      throw e;
    }
  } catch (e) {
    console.error(e);

    if (e.code === "ER_DUP_ENTRY") {
      return res.status(409).send();
    }

    return res.status(500).send();
  }
}

module.exports = createConcurso;
