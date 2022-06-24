//got to mdn to know about: http status codes, mime types

const http = require('http')

//http.createServer invoked each time the user hits or requests the server, it returns an object that we store in const server
const server = http.createServer((req, res) => {
  // console.log(req.method)
  const url = req.url
  // home page
  if (url === '/') {
    res.writeHead(200, { 'content-type': 'text/html' }) //(status code, header {}) the right status code is important, header contains key value pairs, content type matters!
    res.write('<h1>home page</h1>')
    res.end()
  }
  // about page
  else if (url === '/about') {
    res.writeHead(200, { 'content-type': 'text/html' })
    res.write('<h1>about page</h1>')
    res.end() //signals to ther server that all of response headers and body have been sent, that server should consider this message complete, MUST BE CALLED ON EACH RESPONSE
  }
  // 404
  else {
    res.writeHead(404, { 'content-type': 'text/html' })
    res.write('<h1>page not found</h1>')
    res.end()
  }
})

server.listen(5000)

//so port is like choosing a service in a bank on phone, before they get you to a persom they prompt you to type a number maybe from 1 to 8, maybe you want deposit money, maybe loans information, then you will press a number (ex:5) then the auto call will redirect you to the best person that can help you.

//ports are like this (they are communication endpoint), ex: port 80 for http, port 22 for ssh, port 443 for https, each port serve different specific thing.

//locally in porduction we listen to whatever unused port you want, it doesn't matter.

//in deployment we will have specific ports for that (that any user when accessing our website will have his port for ex 443 used by our website. (specifically for ex:(server-ip-address:443))) look remote address in inspect element -> network -> click www.website.com -> Headers -> remote address