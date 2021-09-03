import express from 'express';
import bodyParser from 'body-parser';
const app = express();
const router = express.Router();

app.get('/I/want/title/', function(req, res) {
    const { address } = req.query;
    //console.log("address is "+ address);
    let previousText="<html>\n<head><\/head>\n<body>\n<h1> Following are the titles of given websites: <\/h1><ul>";
	let text="";
	let arrayOfString = address.toString().split(",");

    for (let i = 0; i < arrayOfString.length; i++)
    {
        text = text + "<li>"+ arrayOfString[i] + "<\/li>\n";
    }
		
text=previousText+text;
let lastText="<\/ul>\n<\/body>\n<\/html>";
text=text+lastText;

res.send(text);

});

app.listen(3000);

//res.end("<h2>Test"+"bau rami raja ji, bau rami" +"String</h2>");
//res.send(SAME_AS_ABOVE); above as => String below as => html render