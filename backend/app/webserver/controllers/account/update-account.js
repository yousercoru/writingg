"use strict";

const Joi = require("@hapi/joi");
const mysqlPool = require("../../../database/mysql-pool");
const bcrypt = require("bcrypt");

async function validateSchema(payload) {
  const schema = Joi.object({
    dni: Joi.string().trim().min(9).max(9).required(),
    email: Joi.string().email().required(),
    nombre: Joi.string().trim().min(1).max(255).required(),
    password: Joi.string()
      .allow("")
      .optional()
      .regex(/^[a-zA-Z0-9]{3,30}$/),
  });

  Joi.assert(payload, schema);
}

async function updateAccount(req, res, next) {
  const { userId } = req.claims;
  const userData = {
    ...req.body,
  };

  try {
    await validateSchema(userData);
  } catch (e) {
    console.error(e);
    return res.status(400).send(e);
  }

  const idusers = userId;

  let connection;
  try {
    connection = await mysqlPool.getConnection();

    const user = {
      dni: userData.dni,
      email: userData.email,
      nombre: userData.nombre,
    };

    if (userData.password) {
      const securePassword = await bcrypt.hash(userData.password, 10);
      user.password = securePassword;
    }

    const sqlUpdateUser = `UPDATE users
      SET ?
      WHERE idusers = ?`;

    await connection.query(sqlUpdateUser, [user, idusers]);
    connection.release();

    return res.status(204).send();
  } catch (e) {
    if (connection) {
      connection.release();
    }

    console.error(e);
    return res.status(500).send({
      message: e.message,
    });
  }
}

module.exports = updateAccount;
