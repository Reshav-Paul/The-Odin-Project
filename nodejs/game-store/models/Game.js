let mongoose = require('mongoose');
let { format } = require('date-fns');

let Schema = mongoose.Schema;

let GameSchema = new Schema(
    {
        name: {type: String, required: true},
        description: {type: String, required: true},
        releaseDate: Date,
        price: Number,
        imageUrl: {type: String, default: '/images/default.jpg'},
        category: [{type: [Schema.Types.ObjectId], required: true, ref: 'Category'}]
    }
);

GameSchema.virtual('url').get(function() {
    return '/game/' + this._id;
});

GameSchema.virtual('release_date_formatted').get(function() {
    return format(this.releaseDate, 'do MMMM, yyyy');
});

module.exports = mongoose.model('Game', GameSchema);