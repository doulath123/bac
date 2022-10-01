const express=require('express')
const mongoose=require('mongoose')
const app=express()
app.use(express.json())
const connect=()=>{
  return mongoose.connect(
    "mongodb+srv://demo:demo_123@cluster0.nc6e1.mongodb.net/web14?retryWrites=true&w=majority"
  
  )
}


// app.use(logger)
// app.get('/basha', (req, res)=>{
  
//   return res.send(`${req.name}`)
// })

// function logger(req, res, next)
// {
//   req.name="basha"
//   console.log("middleware 1")
//   next()
// }



const userSchema=new mongoose.Schema({
  id:{type:Number, required:true},
  first_name:{type:String, required:true},
  last_name:{type:String, required:true},
  email:{type:String, required:true},
  gender:{type:String, required:false, default:"Male"},
  age:{type:Number, required:true},
  ip_address:{type:String, required:false}
})
const User=mongoose.model('user',userSchema)

app.post("/users", async (req, res)=>{
  try{
const user=await User.create(req.body);
return res.send(user)
  }
  catch(e){
    return res.send(e.message)
  }
})
app.get('/users', async (req, res)=>{
  const users=await User.find().lean().exec();
  return res.send(users)
  
})
app.get('/users/:dou', async (req, res)=>{
  console.log("douparam",req.params)
  const users=await User.find({"id":req.params.dou}).lean().exec();
  
  return res.send(users)
  
})
app.patch('/users/:dou', async (req, res)=>{
 
  const users=await User.findAndUpdate({"id":req.params.dou}, req.body, {new:true,}).lean().exec();
  
  return res.send(users)
  
})
app.delete("/users/:id", async (req, res)=>{
 
    const users=await User.deleteMany({age:30}).lean().exec();
    return res.send(users)
 
})
app.listen(2345, async function (){
  try{
    await connect()
    console.log("doulath")
  }
  catch(e){
    console.log("doulath.mesage",e.message)
  }
 
})