Express basically runs on top of nodejs http module.


//go to node docs to know about more about a specific method, or anything extra you may need
//go to courses-api.com slides to understand web servers and http request & response messages.


Express.js
//in most cases you will use one of the following options.

API VS SSR

api - json      ssr - template
send data       send template
res.json        res.render()

api: can mean different things.
in express or http, api mean setting up http interface to interact with our data, 
json: data sent using json (javascript object notation)
res.json: send back our response //doing the heavy stuff like content types, stringify data....

ssr (server-side rendering): we will setup templates and send back entire html, css, js ourselves
res.render(): setup the templates 

//complex express topics are covered by using these flavours.

//api focuses on express itself

//main idea api: our server provides data, any front-end app wants to access it and use it, can simply perform an http request, and using our data setup the api and functionality will allow to send back the right data

//we are not responsible to do something with the data, thats the frontend job (javascript for example, react, whatever thing that allow you to fetch data), we just setup responses with requests, we are sending back the data

//we just share the data, for other front-end scripts to take and do something with it

//==============================================================================================================
POSTMAN: tool to test requests without building whole front-end and type out everything to test out requests.

//just hit + sign in postman & choose the method you want:
//GET (get data): just provide the url, ex: localhost:5000/api/people
//POST (insert data): provide url, and in body: choose raw, and JSON, then type out the values you want, (like an object with the name property and value of john) (bcz if we made front-end our website sends a name as well)
//PUT (update data): add the id to the thing you want to change in the url params (use route params), add the values to update in the body as always, then you have access to them in app.put (req.params, req.body)
//DELETE (delete data): same as put but you work with route params (ex: id) and then delete whatever with the same id. (no body needed)

//after hitting send in postman: output must be what you sending in app.theMethod, ex: json object,

//postman is very effective bcz its faster to test routes


//a note: whole idea of setting up api, is that someone is going to be using that data.