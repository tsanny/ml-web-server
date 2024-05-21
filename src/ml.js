const tfjs = require("@tensorflow/tfjs-node");

function loadModel() {
  return tfjs.loadGraphModel(
    "https://storage.googleapis.com/submissionmlgc-sulthan.appspot.com/model/model.json",
  );
}

function predict(model, imageBuffer) {
  const tensor = tfjs.node
    .decodePng(imageBuffer)
    .resizeNearestNeighbor([224, 224])
    .expandDims()
    .toFloat();

  try {
    return model.predict(tensor).data();
  } catch (error) {
    console.error(error);
  }
}

module.exports = { loadModel, predict };
