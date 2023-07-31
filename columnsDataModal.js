const mongoose = require('mongoose');

const ColumnsData = new mongoose.Schema({
  id: { type: Number },
  type: { type: String },
  value: { type: String },
  column: { type: Number },
  bgColor : {type : String}
})

module.exports = mongoose.model('ColData', ColumnsData)