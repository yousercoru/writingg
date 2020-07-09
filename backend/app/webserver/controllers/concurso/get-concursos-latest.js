"use strict";

const mysqlPool = require("../../../database/mysql-pool");

const getLatestConcursosQuery = async (limit, categoria = null) => {
  const connection = await mysqlPool.getConnection();

  connection.config.namedPlaceholders = true;

  const sqlQuery = `SELECT * FROM concursos ${
    categoria ? "where categoria = :categoria" : ""
  } ORDER BY created_at DESC  limit 0,:limit`;

  const [rows] = await connection.execute(sqlQuery, {
    limit,
    categoria,
  });

  connection.config.namedPlaceholders = false;

  connection.release();

  return rows;
};

const getConcursosLatest = async (req, res, next) => {
  try {
    const rows = await getLatestConcursosQuery(5);

    return res.status(200).send(rows);
  } catch (e) {
    console.error(e);
    return res.status(500).send();
  }
};

module.exports = { getConcursosLatest, getLatestConcursosQuery };
