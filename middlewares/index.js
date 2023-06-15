function logger(req, res, next){
    console.log("New request :", new Date().toLocaleString(), " , Method: ",req.method, " , URL: ", req.url);
    // can log many more things like param, query, body

    // attaching something to the alive request
    req.randomKey = "This is random key"
    
    // using next which is a function to tell the next middleware to execute
    // it works like return for the 
    // next tells the next lines of code to execute after it
    next();
}

function isAuthenticated(req, res, next){
    console.log("----------", req.headers.authorization);
    if(!req.headers.authorization || req.headers.authorization === "null"){
        // return res.redirect("auth/login")
        return res.status(200).json({
            redirect: true
        })
    }
    next()
}

module.exports = {
    logger, isAuthenticated
}