const http = require('http'); 
const fs = require('fs'); 
http
.createServer((req, res) => 
{
    const url = req.url; 
    fs.readFile("./public/index.html", (err, data) => 
    {
        if(err)
        {
            res.writeHead(404); 
            res.write("Error: file not found"); 
        }
        else
        {
            res.write(data); 
        }
        res.end(); 
    });
    // res.write("Hello World!"); 
    // res.end(); 
})
.listen(3000, () => {
    console.log("server is listening on port 3000"); 
})

module.exports.http = http; 