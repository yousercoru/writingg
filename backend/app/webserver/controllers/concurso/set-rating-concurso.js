"use strict";

const mysqlPool = require("../../../database/mysql-pool");

async function setRatingConcurso(req, res, next) {
  const { idconcursos } = req.params;
  const { rating } = req.body;

  console.log(req.claims);

  const { userId } = req.claims;

  const ratingData = {
    ratingParticipante: rating,
  };

  const connection = await mysqlPool.getConnection();
  try {
    const sqlCreateConcurso =
      "UPDATE users_has_concursos SET ? where users_idusers = ? and concursos_idconcursos = ?";

    console.log(
      connection.format(sqlCreateConcurso, [ratingData, userId, idconcursos])
    );

    const [result] = await connection.query(sqlCreateConcurso, [
      ratingData,
      userId,
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

module.exports = setRatingConcurso;
