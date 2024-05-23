// lib/googleCloudStorage.js
const { Storage } = require('@google-cloud/storage');
const path = require('path');

const storage = new Storage({
  keyFilename: path.join(process.cwd(), process.env.GOOGLE_APPLICATION_CREDENTIALS),
  projectId: process.env.GCP_PROJECT_ID,
});

const bucket = storage.bucket(process.env.GCS_BUCKET_NAME);

module.exports = bucket;