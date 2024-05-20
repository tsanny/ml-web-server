const Hapi = require("@hapi/hapi");
const { v4: uuid } = require("uuid");
const { loadModel, predict } = require("./ml");

(async () => {
  // load and get machine learning model
  const model = await loadModel();
  console.log("model loaded!");

  // initializing HTTP server
  const server = Hapi.server({
    host: process.env.NODE_ENV !== "production" ? "localhost" : "0.0.0.0",
    port: 3002,
  });

  server.route({
    method: "POST",
    path: "/predict",
    handler: async (request, h) => {
      // get image that uploaded by user
      const { image } = request.payload;

      try {
        // do and get prediction result by giving model and image
        const predictions = await predict(model, image);
        // get prediction result
        const cancer = predictions;
        const id = uuid();
        const createdAt = new Date().toISOString();
        let result, suggestion;

        if (cancer === 1) {
          result = "Cancer";
          suggestion = "You boutta DIE!!";
        } else {
          result = "Not cancer";
          suggestion = "You good";
        }

        return {
          status: "success",
          message: "Model is predicted successfully",
          data: {
            id: id,
            result: result,
            suggestion: suggestion,
            createdAt: createdAt,
          },
        };
      } catch (error) {
        console.error(error);
        return h
          .response({
            status: "fail",
            message: "Terjadi kesalahan dalam melakukan prediksi",
          })
          .code(400);
      }
    },
    // make request payload as `multipart/form-data` to accept file upload
    options: {
      payload: {
        allow: "multipart/form-data",
        multipart: true,
        maxBytes: 1000000,
      },
    },
  });

  // running server
  await server.start();

  console.log(`Server start at: ${server.info.uri}`);
})();
