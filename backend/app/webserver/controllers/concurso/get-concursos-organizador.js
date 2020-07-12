"use strict";

const Joi = require("@hapi/joi");
const mysqlPool = require("../../../database/mysql-pool");

async function validate(payload) {
  const schema = Joi.object({
    userId: Joi.string(),
  });

  Joi.assert(payload, schema);
}

const getConcursosActivos = async (userId) => {
  let connection;

  const todayDate = new Date().toISOString().substring(0, 19).replace("T", " ");

  connection = await mysqlPool.getConnection();

  const sqlQuery = `Select concursos.* ,
  (select count(*) from users_has_concursos where users_has_concursos.concursos_idconcursos = concursos.idconcursos) as participantes
  from concursos 
  where concursos.users_idusers = ? 
  and concursos.fechaVencimiento > ?
  `;

  const [rows] = await connection.execute(sqlQuery, [userId, todayDate]);
  connection.release();

  return rows;
};

const getConcursosFinalizados = async (userId) => {
  let connection;

  const todayDate = new Date().toISOString().substring(0, 19).replace("T", " ");

  connection = await mysqlPool.getConnection();
  const sqlQuery = `Select concursos.* ,
  (select count(*) from users_has_concursos where users_has_concursos.concursos_idconcursos = concursos.idconcursos) as participantes,
  (SELECT AVG(ratingParticipante) FROM users_has_concursos where deleted_at is null and users_has_concursos.concursos_idconcursos = concursos.idconcursos) as avgRatingConcurso
  from concursos 
  where concursos.users_idusers = ? 
  and concursos.fechaPremiados < ?
  `;
  const [rows] = await connection.execute(sqlQuery, [userId, todayDate]);
  connection.release();

  return rows;
};

async function getConcursosOrganizador(req, res, next) {
  const { userId } = req.claims;

  try {
    const activos = await getConcursosActivos(userId);

    const finalizados = await getConcursosFinalizados(userId);

    const data = {
      activos,
      finalizados,
    };

    return res.send(data);
  } catch (e) {
    if (connection) {
      connection.release();
    }

    console.error(e);
    return res.status(500).send();
  }
}

module.exports = getConcursosOrganizador;
