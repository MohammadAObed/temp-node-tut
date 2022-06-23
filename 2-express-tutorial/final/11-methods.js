//go to methods-public folder and see html comments in the html files
//we will not persist this data, no databases is used, so all explanations are demonstrations, 

//http methods: 
//https://course-api.com/slides/
//https://res.cloudinary.com/diqqf3eq2/image/upload/v1614201237/course%20slides/http-methods_w5lppa.png
//https://expressjs.com/en/api.html#express.urlencoded
//https://expressjs.com/en/api.html#express.json

//for post: two flavors, 1st: html, 2nd: javscript, (sending values using: 1- using forms, 2- using pure frontend javascript)

const express = require('express')
const app = express()

let {people} = require('./data');

//app.use: apply middlware to all routes
//static assets
app.use(express.static('./methods-public'));

//Remember!: app.use: apply middlware to all routes. so app.use(express.anyMethod) will be given to every route

//parse form data by using a middleware (!get the form values!)
app.use(express.urlencoded({extended: false})); //because the request type is application/x-www-form-urlencoded 

//parse json 
app.use(express.json()); //because the request content type is application/json, it gives the req.body the info inside payload.

//using one of the two approaches above (html or javascript) now we have access to form values (such as input value, etc...)
//How? keyword: payload, we use this because the html form tag or javascript axios sends the form values in payloads, and express.urlencoded & express.json deals with payloads (bcs request content type are the same as those)...  (go to app.post)

//must match the axios 
app.get('/api/people',(req,res)=>{
    res.status(200).json({success: true, data:people});
})

//if we sending a post request, having a body insn't optional, its crucial

//javascript approach
//add the post method, the route will be same as in axios.post() in javascript file.
app.post('/api/people',(req,res)=>{
    const {name} = req.body;
    if(!name){
        return res.status(400).json({success:false,msg:'please provide name value'})
    }
    res.status(201).json({success:true,person:name}); //send this json object to the const data in front-end javascript 
});

app.post('/api/postman/people',(req,res)=>{
    const {name} = req.body;
    if(!name){
        return res.status(400).json({status:false,msg:'Please provide name value'});
    }
    res.status(201).json({success:true, data:[...people,name]});
})

// app.use(express.json())

//form approach
//add the post method, the route will be same as in form action attr.
app.post('/login',(req,res)=>{
    const {name} = req.body; //what we get from express.urlencoded. now we have acces to our form values
    if(name){
        return res.status(200).send(`Welcome ${name}`);
    }
    res.status(401).send('Please Provide Credentials');
})

//just remember: req.body has values bcz of (it needs) the app.use(express.json()) that you typed above

//use route params for put methods
app.put('/api/people/:id',(req,res)=>{
    const {id} = req.params; //to know which person to update (yes by using id)
    const {name} = req.body; //the value to update (replace)

    const person = people.find(person => person.id === Number(id));

    if(!person) {
        return res.status(404).json({status:false,msg:`no person with id ${id}`});
    }
    
    const newPeople  = people.map(person=>{
        if(person.id===Number(id)){
            person.name = name;
        }
        return person;
    })

    res.status(200).json({success:true,data:newPeople});
})


//its fine if the url is same as app.post, (thats what its supposed to be anyway)
app.delete('/api/people/:id',(req,res)=>{
    const {id} = req.params;
    const person = people.find(person=>person.id === Number(id));
    if(!person) {
        return res.status(404).json({status:false,msg:`no person with id ${id}`});
    }
    const newPeople = people.filter((person)=> person.id !== Number(id));

    res.status(200).json({success:true,data:newPeople})
})

app.listen(5000,()=>{
    console.log("Server is listening on port 5000...");
})

//note: if you have same route, different methods, then its fine, bcz each method will not contradict if you have same route
