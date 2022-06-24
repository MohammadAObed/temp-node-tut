//events are core building blocks in node
//in browser app the events (like button click or hover (gui, user interface)) are external, 
//ths style of programming is called event-driven programming

//what about server-side, node js uses event-driven heavily
//its about executing functions when events happen

//the code below is silly and basic, but dont let this fool you!, alot of modules use events

const EventEmitter = require('events'); //its a class

const customEmitter = new EventEmitter();

//on - listen for an event
//emit - emit an event (produce and discharge an event, (ابعث))

customEmitter.on('response', (name,id)=>{
    console.log(`data recieved user ${name} with id ${id}`); //execute code when event happens
})

customEmitter.on('response', ()=>{
    console.log(`some other logic here`); //execute code when event happens
})

customEmitter.emit('response','john',34); //match the on

//Notes: 1- we can have as many (on) methods as we want, 
// 2- order matters, on should be before emit, you setup the (listen to an event) then you emit it
//3- we can pass args in emit, then use them in callback in on method
