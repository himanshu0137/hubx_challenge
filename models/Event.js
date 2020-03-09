const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  place: {
    type: String,
    required: true
  },
  startTime: {
    type: String,
  },
  createdBy: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
  },
  isAllDay: {
      type: Boolean
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  }
});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;
