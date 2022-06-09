const express = require ("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

/*app.get("/result", function(req, res) {
    res.sendFile(__dirname + "/result.html");
});*/


 
app.post("/", function(req, res){

    var data_c = req.body.crypto;
    var data_f = req.body.fiat;
    var amount = req.body.amount;

    if (data_f=="XAF") {
        var data_fi = "XAF"
        data_f = "USD";
        var option = {
            url: "https://pro-api.coinmarketcap.com/v2/tools/price-conversion",
            methode: "GET",
            headers: {
                'X-CMC_PRO_API_KEY': "057bf22c-22b5-4137-8851-bd4a74dfbc2c"
            },
            qs : {
                amount: amount,
                symbol: data_c,
                convert: data_f
            }
        }

        //console.log(data_f);

        request(option , function(error, response, body) {
            var donees = JSON.parse(body);
            //var date  = donees.status.timestamp;
            var quoteObject = donees.data[0].quote;
            var quoteTable = Object.values(quoteObject);
            var fiatTable = quoteTable[0];
            var price = fiatTable.price;
            var rprice = price * 620.5;
            var lastUpdate = fiatTable.last_updated;
            /*res.write("<p>The current date is " + date + "</p>");

            res.write("<h1>" + amount +" "+ data_c + " is currently worth " + price + " FCFA.</h1>");

            res.write("Last update currency : " +lastUpdate);*/
            //document.querySelector("span").textContent = String(price);
            res.send('<head>\
        <meta name="viewport" content="width=device-width, initial-scale=1.0">\
        <title>Bitcoin Ticker</title>\
        <!-- CSS only -->\
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">\
        <link rel="stylesheet" href="css/style.css">\
        </head>\
        <body> \
        <div class = "div">\
        <h6>last update '+ lastUpdate + ' </h6>\
            <form class = "formulaire" action="/result" method="post">\
             <h1>Results</h1> <br>\
             <span class="q">'+ rprice + " " + data_fi + '</span> <br>\
             <button class = "in" type="submit" name="button"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-circle" viewBox="0 0 16 16">\
                 <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>\
               </svg> Home</button>\
         </form>\
         <p class="basPage">&copy; Concepteur JS</p>\
        </div>\
         <script src="pric.js"></script>\
     </body>');
    });
    }

    // option est un objet
    var option = {
        url: "https://pro-api.coinmarketcap.com/v2/tools/price-conversion",

        methode: "GET",

        headers: {
            'X-CMC_PRO_API_KEY': "057bf22c-22b5-4137-8851-bd4a74dfbc2c" //API KEY took on pro-api.coinmarket.cap.com
        },

        qs : {
            amount: amount,
            //id: id.data_c,
            symbol: data_c,
            convert: data_f 

        }
    }
    
    // requette addresse au serveur ayant pour url finalUrl
    //JSON.parse(body) permet de reorganiser les données recupérées en Json
    request(option , function(error, response, body) {
        var donees = JSON.parse(body);
        var date  = donees.status.timestamp;

        // onr écupère le code fiat (usd, eur, gbp)
        // donees.data[0] récupère l'objet {id, symbol, name, amount, quote{objet}}
        // donees.data[0].quote récupère l'objet quote{USD{}}
        // quote est un objet qui contient un autre objet par e.g USD{ price, last_update} 
        var quoteObject = donees.data[0].quote;
        var quoteTable = Object.values(quoteObject);
        var fiatTable = quoteTable[0];
        var price = fiatTable.price;
        var lastUpdate = fiatTable.last_updated;

        /*console.log(date);
        console.log(price);
        console.log(lastUpdate);*/
        

        //res.write("<p>The current date is " + date + "</p>");

        //res.write("<h1>" + amount +" "+ data_c + " is currently worth " + price +" "+ data_f + "</h1>");

        //res.write("Last update currency : " +lastUpdate);
        
        
        res.send('<head>\
        <meta name="viewport" content="width=device-width, initial-scale=1.0">\
        <title>Bitcoin Ticker</title>\
        <!-- CSS only -->\
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">\
        <link rel="stylesheet" href="css/style.css">\
        </head>\
        <body> \
        <div class = "div">\
        <h6>last update '+ lastUpdate + ' </h6>\
            <form class = "formulaire" action="/result" method="post">\
             <h1>Results</h1> <br>\
             <span class="q">'+ price + " " + data_f + '</span> <br>\
             <button class = "in" type="submit" name="button"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-circle" viewBox="0 0 16 16">\
                 <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>\
               </svg> Home</button>\
         </form>\
         <p class="basPage">&copy; Concepteur JS</p>\
        </div>\
         <script src="pric.js"></script>\
     </body>');
    });


});

app.post('/result', function(req, res) {
    res.redirect("/");
})

// localhost:3000 = "/"
app.listen(process.env.PORT
||4000, function() {
    console.log("server is being running on port 4000.")
});
