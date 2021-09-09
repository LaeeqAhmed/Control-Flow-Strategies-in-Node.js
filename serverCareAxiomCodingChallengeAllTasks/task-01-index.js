import express from 'express';
import fetch from 'node-fetch';
import cheerio  from 'cheerio';
import RSVP from 'rsvp';
import Step from 'step';
const app = express();
const router = express.Router();

//Callback passing function as a second parameter;
app.get('/I/want/title/', function(req, res) {
    const { address } = req.query;

    //console.log("address is "+ address);
    var previousText="<html>\n<head><\/head>\n<body>\n<h1> Following are the titles of given websites: <\/h1><ul>";
	res.write(previousText);
    var text_li="";
	var text="";
    var title="";
	var arrayOfString = address.toString().split(",");
     
    console.log(arrayOfString);
    function validateUrl(value)
    {
        console.log("value"+value);
        var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi
        var regexp = new RegExp(expression);
        return regexp.test(value);
    } 
    for (var i = 0; i < arrayOfString.length; i++)
    {
        console.log("expression output:"+validateUrl(arrayOfString[i]));
        console.log(arrayOfString[i]);
		text_li="";
        //callback using fetch & .then
        if(validateUrl(arrayOfString[i])){
            fetch("https://"+arrayOfString[i])
            .then(res => res.text())
            .then((text) => {
                var $ = cheerio.load(text);
                title = $("title").text();
                text_li= "<li>"+ arrayOfString[i]+" - "+ title +"<\/li>\n";
                res.write(text_li);
                console.log(arrayOfString[i]);
                console.log("title:"+title);
                return title;
            });
    }else{
        res.write(arrayOfString[i]+" - NO RESPONSE");
    }
    }

var lastText="<\/ul>\n<\/body>\n<\/html>";
res.write(lastText);
res.end();

});

//error 404
app.get('*', function (req, res) {

    res.status(404).json({ Message: 'Not Found' });
    
})

app.listen(3000);

