const mongoose = require('mongoose')

const Schema = mongoose.Schema

const fooSchema = new Schema({ name: String, email: String })

// The alternative to the export model pattern is the export schema pattern.
module.exports = fooSchema

// Because if you export a model as shown below, the model will be scoped
// to Mongoose's default connection.
// module.exports = mongoose.model('User', userSchema);
