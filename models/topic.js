const mongoose = require('mongoose');
let Schema = mongoose.Schema;
const topicSchema = new Schema({
  headline: { //guestSignature
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  description: { //message
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
})
const Topic = mongoose.model('Topic', topicSchema);

module.exports = Topic;