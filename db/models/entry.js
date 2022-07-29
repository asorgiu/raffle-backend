const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const entryMethods = ['YouTube', 'Instagram', 'FaceBook'];
const entriesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    method: {
      type: String,
      required: true,
      enum: [...entryMethods],
    },
  },
  { timestamps: true }
);

// Mongoose will automatically pluralize the model name
const Entry = mongoose.model('Entry', entriesSchema);

module.exports = Entry;
