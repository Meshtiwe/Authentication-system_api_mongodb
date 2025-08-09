//لماذا سميت ب UsersController>لان عملية signup , login من اختصاص users

const user =require('..//model/UserModel.js')

exports.login=async (req,res)=>{

//نعرف الحقول متع الجدول
const username = req.body.username;
const password = req.body.password;

//التحقق من البيانات الفارغة
if (!username||!password){
    return res.json({
        msg:"username or password incorrect",
        state:0,
        data:[]
    })
}
 
//ابحث عن >username
//اذا كان username التي ادخلته غير موجود في جدول user  >user not found
const User = await user.findOne({

    username:username,
    
});
  
if (!User){
    return res.json({
        msg:"user not found",
        state:0,
        data:[]
    })
}

//اذا كان password التي ادخلته يتطابق من password اللي في جدول user >auth succesfuly

if (password === User.password){
    return res.json({

        msg:"auth succesfuly 👍",
        state:1,
        data:User

    })
}else{
    return res.json({
        msg:"password incorrect",
        state:0,
        data:[]
    })
}

}



exports.signup=async (req,res)=>{

//نعرف الحقول متع الجدول 
const username = req.body.username;
const password = req.body.password;
const email = req.body.email;
const phone = req.body.phone;

//التحقق من البيانات الفارغة

if (!username||!password||!email||!phone){
    return res.json({
        msg:"username or password incorrect",
        state:0,
        data:[]
    })
}
//التحقق من عدم تكرار عملية ادخال مستخدم قمت بادخاله سابقا 
//ابحث عن >username , email 
const User = await user.findOne({
    $or:[
        {username:username},
        {email:email}
    
    ]
})

// اذا ادخلت نفس username ,email >لايمكن ان تدخلهم مرة اخرى 
//لايمكن ان تدخل نفس البيانات مرة اخرى
if (User){
    return res.json({
        msg:"username or email is already exist in our system",
        state:0,
        data:[]
    })
}

await user.create({

    username:username,
    password:password,
    email:email,
    phone:phone,
}).then((data)=>{       //في حالة تمت العملية بنجاح
    return res.json({
        msg:"accont created succusfuly",
        state:1,
        data:data,
    })
}).catch((err)=>{

    console.log(err);

    return res.json({
        msg:"internal server error contact with support",
        state:0,
        data:[],
    })

})

    
}

