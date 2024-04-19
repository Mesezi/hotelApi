const mongoose = require('mongoose')

const RoomSchema = mongoose.Schema(
  {
    room_type: {
      type: String,
      required: [true, "Please enter room type"],
    },
    adults: {
      type: Number,
      required: [true, "Please enter max number of adults in a room"],
    },
    children: {
      type: Number,
      required: [true, "Please enter max number of children in a room"],
    },
    room_size: {
      type: Number,
      required: [true, "Please enter room size"],
    },
    room_price: {
      type: Number,
      required: [true, "Please enter room price"],
    },
    main_image: {
      type: String,
      required: [true, "Please enter main image url"],
    },
    other_images: {
      type: Array,
    },
  },

  {
    timestamps: true,
  }
);

const Room = mongoose.model("Room", RoomSchema)
module.exports = Room
