const express = require('express')
const mongoose = require('mongoose')
const app = express()
// const port = 3000
const Expense = require('./expense')
mongoose.connect('mongodb+srv://prassha:prassha09@cluster0.70epywk.mongodb.net/newDb?retryWrites=true&w=majority',{
    useUnifiedTopology:true
});



app.use(express.json());

app.get('/expenses/:id',async(req,res) => {
    const id = req.params.id;
    const expenses = await Expense.findById(id);
    res.send(expenses);
})

app.get('/expenses',async(req,res) => {
  const expense = await Expense.find();
  res.send(expense);  
})


app.delete('/expenses/:id',async (req,res) => {
    try{
        const id = req.params.id;
        const result = await Expense.findByIdAndDelete(id);
        if(result)
            res.send(result);
        else
            res.send("no Expense with that id");
    }catch(err) {
        res.send(err);
    }
});


app.post('/expenses',async(req,res) => {
    console.log(req.body);
    const newExpense = req.body;
    await Expense.create(newExpense);
    res.send('created!!');
    // res.send('prassha');
})


app.put('/expenses/:id',async(req,res) => {
    
        const id = req.params.id;
        const updateObject = req.body;
        const updatedObject = await Expense.findByIdAndUpdate(id ,{$set :updateObject},{
            new:true
          })
          res.send(updatedObject);
});


const port = process.env.PORT || 8000
app.listen(port,() => {
    console.log(`listening to port... ${port}`)
})


