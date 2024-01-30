const mongoose = require('mongoose');
const expenseSchema = new mongoose.Schema({
    id : Number,
    text: String,
    amount : Number,
});
const Expense = mongoose.model('Newexpense',expenseSchema)
module.exports = Expense;