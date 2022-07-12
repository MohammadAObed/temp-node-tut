//check username, password in post(login) request
// if exist create new JWT
// send back to front-end

//setup authentication so only a request with JWT can access the dashboard

const jwt = require('jsonwebtoken')
const CustomAPIError = require('../errors/custom-error')

const login = async (req,res) => {
    const {username,password} = req.body
    //for empty strings provided or maybe some errs, three approaches:
    //- mongoose validation (recommended), 
    //- Joi, 
    //- check in the controller  //you can use (combine) all of them

    if(!username || !password) {
        throw new CustomAPIError('Please provide email and password',400) //we are throwing bcz of the package of express-async-errors (it says in the docs to throw errors), if we don't use the package, we would create the async wrapper middleware and use next here instead of throw.
    }


    //just for demo, normally provided by DB!!!!!!
    const id = new Date().getDate()

    //(payload,jwt secret,options)
    //1-(payload) no confidential info in it (ex: password), try to keep payload small, better for (ux)!!!. If we creating a user then the id is useful to pass in payload, or a user checking his resources that belongs to them (so also id of user)

    //2-(,jwt secret) in .env file, but its just for demo, in production use long, complex and unguessable string value!!! (this is the secret that will sign our token)(so keep it on the server, keep it complex like your 256 bit secret)

    //3-(,,options)

    const token = jwt.sign({id, username},process.env.JWT_SECRET,{expiresIn:'30d'})

    res.status(200).json({msg:'user created',token}) //now encoded token (signed token) (https://jwt.io/#debugger-io, paste the encoded jwt in the link page) is sent on the post/login route to the front end,

    //there is jwt storage on front end, this course wont emphasize on it,by we are interested on the backend and how the request will look like

    //current goal is to secure resourse access on the server, to implement the correct functionality
    //steps: common apprach on the frontend is to setup authorization header in the request, so its going to be a get request and then add the bearer schema (look in jwt intro in browser (Authorization: Bearer <token>))

    //will show us how it will look like on the front end and the front end code
    //go to public folder and inside browser-app.js 
}

//any restricted route will check for the token and auth header, like the route below
//when testing with postman (ex: dashboard route below): just add an authorization header in headers & value of Bearer <paste the token>
//how in realtime we get the auth header? remember when making a login post, when getting back the token we store it in local storage, then when accessing the dashboard route, we put in the header an authorization key and bearer <token> (look in browser-app.js)
const dashboard = async (req,res) => {

    console.log(req.user)

    const luckyNumber = Math.floor(Math.random()*100)  //0...99
    res.status(200).json({msg:`Hello, ${req.user.username}`,secret:`Here is your authorized data, your lucky number is ${luckyNumber}`})

}

//so last time the steps are in postman: 1- login route, provide username & password in body
// 2- in dashboard route, add in Headers:  Authorization: Bearer <paste token from the response of login route>

//FULL STEPS OF WHAT IS HAPENNING
//1-front end post login with body of username & password
//2-api post login route creating a jwt token with info about user (in payload) then responding to frontend with the token
//3-same route of login (we are not done yet), the front end gets the token and store it in local storage 

//a-front end requesting the dashboard route, reqeust header contains the token, and token is got from the local storage
//b-get dashboard route will verify that the token is valid then sends back desired functionality & info
//c- front end uses whatever in respose. 

//multiple routes will be using the token verification functionality

module.exports = {
    login,dashboard
}


//JWT
//restrict access
//use jwt, basically they are a long string.

//route for login, route for dashboard
//dashboard is protected, clicking its link all day long won't open it (get data)
//only if i login i will have the token, and once i have the token, i can access the dashboard, the secret info, etc...
//ex: logging in without username or password, wont work whatever, but putting the right info, then logging in, you will have a token that allow you to access the dashboard, do any kind of requests that requires the token

//Summary: if a valid token is present in the request, the user can access specific info, only that belongs to the user, but if we have a restricted route, (each time we request, the token must be present!) 
//so restrict access to certain routes and resources

//after handling empty and error stuff: 
//now create jwt & send it back,
//the previous porjects flow: user make a request to server (handled by a route), server responds back

//but now we will have two routes
//public routes: accessible by anyone
//restricted routes: accessible by a request with signed JWT 
//how do we have the signed jwt? its created when a login request is created, when login is valid a jwt is created (signed jwt), now when any restricted request is made we will look for the signed jwt (created jwt) with the request then we resopnd back...

//jwt: is just a way to exchange data between two parties, ex: front-end app and api
//jwt: has a security feature, if a reqeust with jwt is made and passes the validation, we will know for sure its the same token we sent back before, and data wasn't tampored

//http feature: its statelss, means that the server does not know or remember any prev requests sent by the same client, even after 100 successful reqs, frontend will still need to provide the valid signed token in the 101 req

// https://jwt.io/introduction open it while reading stuff below

//This information can be verified and trusted because it is digitally signed.
//jwt: header,payload,signature

//Header: type of token / alg: encoded by base64url

//Payload: place the info: like the id of user that just logged on or registered (request): then we send back the enitre token with that payload back to the front end, then the frontend sends it back to us, and then when we decode we get that id

//this means if the user has some kind of resource, then we will access the resoure that only belongs to that user.

//Signature: alg that is in header is used, then we add here the secret to sign our token
//secret is kept on the server

//basically: we have the algorithm, we have the encoded header, and payload, then we take the secret string value that is always only on the server and then we sign this one, and once we sign, the result is (the string in colors in the docs)

//how we can send back token from the frontend

// in doc in Debugger section: 

//encoded                                      //decoded
//this is the signed token (encoded one)       //payload: is what we sending back to the front end, (what will recieve) (info about user) (ex: the id which we will use later to access the database)
