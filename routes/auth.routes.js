const express = require("express")
const { body, validationResult } = require("express-validator")
const router = express.Router()
const fs = require("fs/promises")
var bcrypt = require('bcryptjs')

const USER = []

router.post("/register",
// custom validator 
body("name").custom((name)=>{
    if(typeof name === "string" && name.length >= 2){
        return true
    }
    return false 
})
.withMessage("Name should be of minimum 2 characters."),
body("email").custom((email)=>{
    if(typeof email === "string"){
        return true
    }
    return false 
})  
.withMessage("Please provide a valid email")
.isEmail().withMessage("Enter a valid email"),
body("password").custom((password)=>{
    if(typeof password === "string" && password.length >= 8){
        return true
    }
    return false 
})
.withMessage("Password should be atleast 8 characters"),
(req, res)=>{

    const {name, email, password } = req.body;

    console.log("---post body---", name, email, password);

    // to show errors in the response object
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        console.log("---erors---", errors);
         return res.status(400).json({
            message: "Registration failed.",
            error: errors.array(),
            data: {}
         })
    }
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

    USER.push(
        {
            name,
            email,
            hash
        }
    )

    fs.writeFile("users.json", JSON.stringify(USER), (err) => {
        if(err){
            console.log(err);

            throw err;
        }
    })
    // 201 for resource creation
    return res.status(201).json({
        message: "Success ! User registered",
        data: {},
        errors: null
    })
})

router.post("/login", (req, res) => {
    const { email, password }= req.body
    console.log({'user array': USER})
    console.log("---post body---", email, password);
    const userInd = USER.findIndex((user) => user.email === email)
    const ok = bcrypt.compareSync(password, USER[userInd].password)
    console.log('result', ok);

    if(USER.length <= 0){
        return res.status(404).json({
            message: "User login failed.",
            error: "User does not exist",
            data: {}
        })
    }

    // this is not a very good approach due to nesting of lots of if conditions
    // else if (USER.find(user => user.email === email){
    //     if(password)
    // })

    const userIndex = USER.findIndex((user) => user.email === email)
    if(userIndex === -1){
        return res.status(404).json({
            message: "User login failed.",
            error: "The user does not exist",
            data: {}
        })
    }
    if(USER[userIndex].password != password){
    // if(bcrypt.compareSync(password, USER[userIndex].password)){
        return res.status(404).json({
            message: "User login failed.",
            error: "Password does not match",
            data: {}
        })
    }

    // create access token
    // use jwt token 
    // const token = JWT.sign( {email}, SECRET )

    // 200 for successfull check
    return res.status(200).json({
        message: "Success ! User logged in",
        // data: {
        //     access_token: token
        // },
        errors: null
    })
})

module.exports = router