const mongoose = require('mongoose');

mongoose.connect('mongodb://aida:hitallo18@ds121455.mlab.com:21455/aidabot', {});
mongoose.Promise = global.Promise;
module.exports = mongoose;