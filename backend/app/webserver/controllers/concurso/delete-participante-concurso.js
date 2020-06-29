"use strict";

const Joi = require("@hapi/joi");
const mysqlPool = require("../../../database/mysql-pool");

async function validate(payload) {
  const schema = Joi.object({
    idconcursos: Joi.string().required(),
  });

  Joi.assert(payload, schema);
}

async function deleteParticipanteToConcurso(req, res, next) {
  const { idconcursos } = req.params;
  const { userId } = req.claims;

  try {
    await validate({ idconcursos });
  } catch (e) {
    return res.status(400).send(e);
  }
  const concursos_idconcursos = idconcursos;
  const users_idusers = userId;

  console.log(concursos_idconcursos, userId);

  let connection;
  try {
    connection = await mysqlPool.getConnection();
    const sqlQuery = `UPDATE users_has_concursos
      SET deleted_at = ?
      WHERE concursos_idconcursos = ?
      AND users_idusers = ?
      AND deleted_at IS NULL`;

    const deleted_at = new Date()
      .toISOString()
      .substring(0, 19)
      .replace("T", " ");
    const [deletedStatus] = await connection.execute(sqlQuery, [
      deleted_at,
      concursos_idconcursos,
      users_idusers,
    ]);
    connection.release();

    console.log(deletedStatus);

    if (deletedStatus.changedRows === 0) {
      return res.status(404).send({ success: false });
    }

    return res.status(204).send();
  } catch (e) {
    if (connection) {
      connection.release();
    }

    return res.status(500).send(e.message);
  }
}

module.exports = deleteParticipanteToConcurso;
