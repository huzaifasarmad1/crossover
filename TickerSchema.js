var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var TickerSchema = new Schema({
    date: Date,
    ticker: String,
    average: String,
    closed_price: String,
    
});
module.exports = mongoose.model('ticker', TickerSchema);
