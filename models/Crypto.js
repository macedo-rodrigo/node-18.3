const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema creation
const cryptoSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    marketCap: {
      type: Number,
      required: false,
    },
    createdAt: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Crypto = mongoose.model("Crypto", cryptoSchema);
module.exports = { Crypto };
