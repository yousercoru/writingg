const cloudinary = require("cloudinary").v2;

const uuidV4 = require("uuid/v4");

const updloadFile = async (fileData, format) => {
  const id = uuidV4();

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "auto",
          public_id: id,
        },
        async (err, result) => {
          if (err) {
            console.error(err);
            return res.status(400).send(err);
          }

          resolve(result);
        }
      )
      .end(fileData[0].buffer);
  });
};

module.exports = updloadFile;
