const fs = require('fs');

const requestHandler = (req,res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/'){
        res.write("<html>");
        res.write("<head><title>This is my title</title></head>")
        res.write("<body>")
        res.write("<h1> Hello Everyone </h1>")
        res.write('<body><form action="/message" method="POST"><input type="text" name="message" /><button>Send</button></form>')
        res.write("</body>")
        res.write("</html>")
        return res.end()
    }
    
    if (url === '/message' && method === "POST"){
        const body = [];
        // event listener
        req.on('data', (chunk) => {
            body.push(chunk);
        });
    
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split("=")[1];
            fs.writeFile('message.txt', message, (err)=>{
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    
    }
    // res.setHeader('Content-Type', 'text/html')
    // res.write("<html>");
    // res.write("<head><title>This is my title</title></head>")
    // res.write("<body>")
    // res.write("<h1> Hello Everyone </h1>")
    // res.write("</body>")
    // res.write("</html>")
    // res.end();
};

module.exports = requestHandler;

// module.exports = {
//     handler: requestHandler,
//     someText: 'Some hard coded text'
// }

// module.exports.handler = requestHandler
// module.exports.someText = 'Some Hard coded text'

