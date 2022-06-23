//below is only for demonstration

const authorize = (req,res,next) => {
    const {user} = req.query;
    if(user === 'john'){
        req.user = {name:'john',id:3} //adds the property (user) to req object, and all req objs in app.methods will have access to that user. 
        next()//have to be included
    }
    else {
        res.status(401).send('Unauthorized') //remember: authorize middlware will give this functionality to all app.methods
    }
}

module.exports = authorize;