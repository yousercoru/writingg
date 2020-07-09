"use strict";

const Joi = require("@hapi/joi");
const mysqlPool = require("../../../database/mysql-pool");
const { getUser } = require("../auth/get-auth-user");
const { getLatestConcursosQuery } = require("./get-concursos-latest");

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
    const getConcursoQuery = `SELECT concursos.*,
    (select count(*) from users_has_concursos
    WHERE users_has_concursos.concursos_idconcursos = concursos.idconcursos)
    AS participantes
    FROM concursos WHERE slugNombreConcurso = ?`;
    const [results] = await connection.execute(getConcursoQuery, [
      slugNombreConcurso,
    ]);

    connection.release();
    console.log([results]);
    if (results.length < 1) {
      return res.status(404).send();
    }

    const [concursoData] = results;

    const organizador = await getUser(concursoData.users_idusers);

    const nextConcursos = await getLatestConcursosQuery(
      5,
      concursoData.categoria
    );

    return res.send({
      data: { ...concursoData, nextConcursos, organizador },
    });
  } catch (e) {
    console.error(e);
    res.status(500).send({
      message: e.message,
    });
  }
}

module.exports = getConcurso;
