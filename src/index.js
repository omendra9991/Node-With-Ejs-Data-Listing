const express = require("express");
const app = express();

const data = require('./data');


/** Parse the body of the request */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


/** Rules of our API */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }

  next();
});


app.set('view engine', 'ejs');
app.use( express.static( "public" ) );

app.get('/', function(req, res) {
    res.render('pages/index', {data});
});

/** Error handling */
app.use((req, res, next) => {
  const error = new Error("Not found");
  res.status(404).json({
    message: error.message,
  });
});

app.listen(3000,()=>{
    console.log('http port is listening on 3000')
})


