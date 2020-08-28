let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let GenreSchema = new Schema(
    {
        name: {type: String, minlength: 3, maxlength: 100, required: true}
    }
);

GenreSchema.virtual('url').get(function () {
    return '/catalog/bookinstance/' + this._id;
});

module.exports = mongoose.model('Genre', GenreSchema);