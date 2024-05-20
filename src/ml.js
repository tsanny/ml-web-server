const tfjs = require("@tensorflow/tfjs-node");

function loadModel() {
  const modelUrl = "file://models/model-tfjs/model.json";
  return tfjs.loadGraphModel(modelUrl);
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
