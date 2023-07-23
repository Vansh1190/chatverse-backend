const mongoose = require('mongoose');

const { Schema } = mongoose;
const ImageSchema = new Schema({
  image: {
    data: Buffer,
    contentType: String,
  },
});
module.exports = mongoose.model('ChatVerseImageSchema', ImageSchema);
