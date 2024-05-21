const { Firestore } = require("@google-cloud/firestore");
const db = new Firestore();

async function store_data(id, data) {
  // Membuat Collection root-level
  const predictionsCollections = db.collection("predictions");
  console.log("Collections 'predictions' berhasil dibuat.");

  // Membuat dokumen: Dokter Eros
  const erosDoc = await doctorsCollections.doc("Dokter Eros");
  console.log("Dokumen atas nama Dokter Eros berhasil dibuat.");
}
