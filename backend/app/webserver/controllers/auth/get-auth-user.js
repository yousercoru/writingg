"use strict";

const mysqlPool = require("../../../database/mysql-pool");

const getUser = async (id) => {
  const connection = await mysqlPool.getConnection();
  const query = `SELECT * FROM users WHERE idusers = ?`;
  const [results] = await connection.execute(query, [id]);
  connection.release();

  const [user] = results;

  delete user.password;

  return user;
};

async function getAuthUser(req, res, next) {
  console.log(req.claims);

  try {
    const user = await getUser(req.claims.userId);

    if (!user) {
      return res.status(404).send();
    }

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

module.exports = { getAuthUser, getUser };
