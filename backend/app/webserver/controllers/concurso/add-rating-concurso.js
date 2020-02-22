"use strict";

const Joi = require("@hapi/joi");
const mysqlPool = require("../../../database/mysql-pool");

async function validate(payload) {
  const schema = Joi.object({
    idconcursos: Joi.string(),
    rating: Joi.number()
      .integer()
      .min(0)
      .max(5)
  });

  Joi.assert(payload, schema);
}

async function addRatingToConcurso(req, res, next) {
  const concursoData = { ...req.body };
  const { idconcursos } = req.params;
  const { userId } = req.claims;

  try {
    await validate(concursoData);
  } catch (e) {
    return res.status(400).send(e);
  }
  const concursos_idconcursos = idconcursos;
  const users_idusers = userId;
  console.log(concursos_idconcursos);
  const { rating } = concursoData;

  let connection;
  try {
    connection = await mysqlPool.getConnection();
    const sqlQuery = `UPDATE users_has_concursos
      SET ratingParticipante = ?
      WHERE concursos_idconcursos = ?
        AND users_idusers = ?
        AND deleted_at IS NULL`;

    const [deletedStatus] = await connection.execute(sqlQuery, [
      rating,
      concursos_idconcursos,
      users_idusers
    ]);
    connection.release();

    if (deletedStatus.changedRows === 0) {
      return res.status(404).send();
    }

    return res.status(204).send();
  } catch (e) {
    if (connection) {
      connection.release();
    }

    return res.status(500).send(e.message);
  }
}

module.exports = addRatingToConcurso;
