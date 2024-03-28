const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const LoggerSchema = new Schema({
  IMEI: {
    type: String,
    required: true
  },
  Model: {
    type: String,
    required: true
  },
  distance: {
    type: String,
    default: Date.now
  },
  battery: {
    type: String,
    default: Date.now
  },
  signal: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
});

const Logger = mongoose.model('Logger', LoggerSchema, '866207058378443');
module.exports = Logger; 