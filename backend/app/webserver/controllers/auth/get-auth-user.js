"use strict";

const mysqlPool = require("../../../database/mysql-pool");

async function getAuthUser(req, res, next) {
  console.log(req.claims);

  try {
    const connection = await mysqlPool.getConnection();
    const query = `SELECT * FROM users WHERE idusers = ?`;
    const [results] = await connection.execute(query, [req.claims.userId]);
    connection.release();
    console.log([results]);
    if (results.length < 1) {
      return res.status(404).send();
    }

    const [user] = results;

    return res.send({
      data: user,
    });
  } catch (e) {
    console.error(e);
    res.status(500).send({
      message: e.message,
    });
  }
}

module.exports = getAuthUser;
