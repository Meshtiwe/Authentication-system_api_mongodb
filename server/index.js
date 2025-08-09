const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const router=require('./router/router.js')
const port = 3000



mongoose.connect('mongodb://localhost/authSystem',{        // اتصل بmongoDB وانشاء قاعدة بيانات
    usenewurlparser:true,
    useunifiedtopology:true
}).then(()=>{                                          
    console.log('mongodb connected 👍')                   //قاعدة البيانات كان اشتغلت اطبع mongodb connected//
}).catch((err)=>{
    console.log(err)
})


app.use(cors())
app.use(express.urlencoded({
    extended : true
}))

//router علي مستوي المشروع 
//router بنفراها ك>puplic middleware
app.use(router)

app.listen(port, () => console.log(`🚀app listening on port ${port}!`))

