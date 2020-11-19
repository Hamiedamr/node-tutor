var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var multer = require("multer");

var con = require("./db_connection");
var app = express();
var urlParser = bodyParser.urlencoded({extended:false});
app.use(express.static('pages'));
app.use(express.static('public'));

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/');
    },
    filename:(req,file,cb) =>{
        cb(null,Date.now() + path.extname(file.originalname))
    }
})

const imgFilter = (req,file,cb) => {
    if(file.mimetype == "image/jpeg" || file.mimetype == "image/png"){
        cb(null,true);
    } else {
        cb(null,false);
    }
}
const uploader = multer({storage:storage,fileFilter:imgFilter}) 
/**
 * Routes
 * get standard http v1.0
 * post standard http v1.0
 * put standard http v1.x
 * delet standard http v1.x
 */

 app.get("/",(req,res)=>{
    res.sendFile("index.html");
 });

app.post("/process_data",uploader.single("image"),(req,res)=>{
    var response = {
        first_name: req.body.first,
        last_name :req.body.last,
        message: "uploaded successfully"
    }
    try{
            if(response.first_name == "" || response.last_name == ""){
                throw err;
            }
        con.connect((err)=> {
            if (err) throw err;
            console.log("Connected!");
            var sql = "INSERT INTO users (firstname,lastname) VALUES (?)";
            con.query(sql,[[response.first_name,response.last_name]],(err, result)=>{
            if (err) throw err;
            console.log("User Inserted");
            });
        });
            return res.status(201).send(response)
    }catch(err){
        console.log("Error!");
    }
   
    res.send(JSON.stringify(response));
});


 var server = app.listen(5000,()=>{
     var host = server.address().address;
     var port = server.address().port;

     console.log('I am listening to %s %s',host,port);
 })