"use strict";

const Joi = require("@hapi/joi");
const mysqlPool = require("../../../database/mysql-pool");

async function validate(payload) {
  const schema = Joi.object({
    idconcursos: Joi.string()
      .guid({ version: ["uuidv4"] })
      .required(),
  });

  Joi.assert(payload, schema);
}

async function getConcurso(idconcursos) {
  const connection = await mysqlPool.getConnection();
  const getConcursoQuery = `SELECT idconcursos, users_idusers,
  nombreConcurso, bases, fechaVencimiento,
  primerPremio, segundoPremio, tercerPremio, fechaPremiados,
  cartel, bases_pdf, categoria,
  created_At, updated_At, deleted_At 
  FROM concursos
    WHERE idconcursos = ?
      AND deleted_at IS NULL`;
  const [concursoData] = await connection.execute(getConcursoQuery, [
    idconcursos,
  ]);
  connection.release();

  if (concursoData.length < 1) {
    return null;
  }

  return concursoData[0];
}

async function addParticipanteToConcurso(req, res, next) {
  const { idconcursos } = req.params;
  const { userId } = req.claims;

  console.log(idconcursos, "concurso", userId);
  const payload = {
    idconcursos,
  };

  try {
    await validate(payload);
  } catch (e) {
    console.error(e);
    return res.status(400).send(e);
  }

  try {
    const concurso = await getConcurso(idconcursos);

    if (!concurso) {
      return res.status(404).send();
    }

    try {
      const connection = await mysqlPool.getConnection();
      const getWorkerQuery = `SELECT users_idusers
        FROM users_has_concursos 
        WHERE concursos_idconcursos = ?
        AND users_idusers = ?
        AND deleted_at IS NULL`;
      const [results] = await connection.execute(getWorkerQuery, [
        idconcursos,
        userId,
      ]);
      connection.release();

      console.log(results);

      if (results.length !== 0) {
        return res.status(403).send({ success: false });
      }
    } catch (e) {
      console.error(e);
      res.status(500).send({
        message: e.message,
      });
    }

    const sqlAddParticipanteToConcurso = `INSERT INTO users_has_concursos SET ?`;

    console.log(userId);

    const userRow = {
      concursos_idconcursos: idconcursos,
      users_idusers: userId,
      created_at: new Date().toISOString().replace("T", " ").substring(0, 19),
    };

    const connection = await mysqlPool.getConnection();
    try {
      await connection.query(sqlAddParticipanteToConcurso, userRow);
      connection.release();
    } catch (e) {
      console.error(e);
      connection.release();
      return res.status(500).send({
        message: e.message,
      });
    }

    console.log({ yes: true });

    return res.status(204).send({ success: true });
  } catch (e) {
    console.error(e);

    return res.status(500).send({
      message: e.message,
    });
  }
}

module.exports = addParticipanteToConcurso;
