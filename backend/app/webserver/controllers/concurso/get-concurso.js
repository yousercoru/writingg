"use strict";

const Joi = require("@hapi/joi");
const mysqlPool = require("../../../database/mysql-pool");

async function validate(payload) {
  const schema = Joi.object({
    slugNombreConcurso: Joi.string().required(),
    idusers: Joi.string().guid({
      version: ["uuidv4"],
    }),

    rol: Joi.string(),
  });

  Joi.assert(payload, schema);
}

async function getConcurso(req, res, next) {
  const { slugNombreConcurso } = req.params;
  //const { idusers } = req.claims;

  const payload = {
    slugNombreConcurso,
    //idusers
  };

  try {
    await validate(payload);
  } catch (e) {
    return res.status(400).send(e);
  }

  try {
    const connection = await mysqlPool.getConnection();
    const getConcursoQuery = `SELECT * FROM concursos WHERE idconcursos = ?`;
    const [results] = await connection.execute(getConcursoQuery, [
      slugNombreConcurso,
    ]);
    connection.release();
    console.log([results]);
    if (results.length < 1) {
      return res.status(404).send();
    }

    const [concursoData] = results;
    console.log(concursoData);
    console.log(results);

    const nextConcursos = [
      // datos simulados ("hardcodeados")
      { id: "", nombre: "Concurso 2" },
      { id: "", nombre: "Concurso 3" },
    ];

    return res.send({
      data: { ...concursoData, nextConcursos },
    });
  } catch (e) {
    console.error(e);
    res.status(500).send({
      message: e.message,
    });
  }
}

module.exports = getConcurso;
