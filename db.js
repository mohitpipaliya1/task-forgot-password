const db = require('mongoose')

db.connect('mongodb://localhost:27017/task-1',{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true},
()=>{
         console.log("connection establish")
})