"use strict";

const cloudinary = require("cloudinary").v2;
const mysqlPool = require("../../../database/mysql-pool");
const uuidV4 = require("uuid/v4");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadDoc(req, res, next) {
  const { userId } = req.claims;
  const { idconcursos } = req.params;
  const { file } = req;

  if (!file || !file.buffer) {
    return res.status(400).send({
      message: "invalid document",
    });
  }

  const id = uuidV4();
  cloudinary.uploader
    .upload_stream(
      {
        resource_type: "auto",
        public_id: id,
        format: "pdf",
      },
      async (err, result) => {
        if (err) {
          console.error(err);
          return res.status(400).send(err);
        }

        const { secure_url: obra } = result;
        console.log(result);

        const upload = {
          users_idusers: userId,
          concursos_idconcursos: idconcursos,
          obra,
        };

        let connection;
        try {
          const connection = await mysqlPool.getConnection();
          const sqlUploadDocument = `UPDATE users_has_concursos
          SET obra = ?
          WHERE users_idusers = ?
          AND concursos_idconcursos = ?`;
          await connection.execute(sqlUploadDocument, [
            obra,
            userId,
            idconcursos,
          ]);

          connection.release();

          console.log(result.secure_url);
          res.header("Location", obra);
          return res.status(201).send({ success: true });
        } catch (e) {
          if (connection) {
            connection.release();
          }
          console.error(e);
          return res.status(500).send(e.message);
        }
      }
    )
    .end(file.buffer);
}

module.exports = uploadDoc;
