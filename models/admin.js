const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema({
  leader: {
    type: Boolean,
    default: true,
  },
  Start: {
    type: Boolean,
    default: true,
  },
  Score: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Admin", adminSchema);
