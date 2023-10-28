const express=require('express');
const cors=require('cors');
const app=express();
const port=5000;
const mongoConnect=require('./db');
mongoConnect();

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
})
app.use(express.json());
app.use('/api',require('./routes/CreateUser'));
app.use('/api',require('./routes/DisplayData'));
app.use('/api',require('./routes/OrderData'));

app.get("/", (req, res) => {
  res.send("Hello");
});


app.listen(port,()=>{
    console.log(`Listening this on a port ${port}`)
});