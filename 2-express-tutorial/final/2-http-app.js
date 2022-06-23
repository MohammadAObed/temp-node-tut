const http = require('http')
const { readFileSync } = require('fs')  //why sync? no major impact in our project

// get all files
const homePage = readFileSync('./navbar-app/index.html')
const homeStyles = readFileSync('./navbar-app/styles.css')
const homeImage = readFileSync('./navbar-app/logo.svg')
const homeLogic = readFileSync('./navbar-app/browser-app.js')

//THE ISSUE ABOVE is that we will need manually to read and request all files and resources that the home page uses, like css files (link tag), images (img src tag), which is a long long process, 

//inspect element and hover over the link tag that has href=style.css, and you will see 'localhost:5000/style.css' meaning we will need to put that file on the server as well
//meaning that the server also requests those files as well

const server = http.createServer((req, res) => {
  // console.log(req.method)
  const url = req.url
  console.log(url)
  // home page
  if (url === '/') {
    res.writeHead(200, { 'content-type': 'text/html' })
    res.write(homePage)
    res.end()
  }
  // about page
  else if (url === '/about') {
    res.writeHead(200, { 'content-type': 'text/html' })
    res.write('<h1>about page</h1>')
    res.end()
  }

  //we said that the server will request the files below bcz index.html needs them and they are typed inside it, so the server will request index.html (based on the first if statement '/') and the files aswell so it will invoke the createServer method multiple times (maybe?) and each time we are requesting a different file (style.css, logo.svg...)

  // styles
  else if (url === '/styles.css') {
    res.writeHead(200, { 'content-type': 'text/css' })
    res.write(homeStyles)
    res.end()
  }
  // image/logo
  else if (url === '/logo.svg') {
    res.writeHead(200, { 'content-type': 'image/svg+xml' })
    res.write(homeImage)
    res.end()
  }
  // logic
  else if (url === '/browser-app.js') {
    res.writeHead(200, { 'content-type': 'text/javascript' })
    res.write(homeLogic)
    res.end()
  }
  // 404
  else {
    res.writeHead(404, { 'content-type': 'text/html' })
    res.write('<h1>page not found</h1>')
    res.end()
  }
})

server.listen(5000)
