//import the express module
import express from 'express';

//create an express application
const app = express();

//set EJS as the view engine
app.set('view engine', 'ejs');

//Middleware that allows express to read form data and store it in req.body
app.use(express.urlencoded({ extended: true }));

//create a temp array to store orders
const orders = [];

//define a port number where server will listen
const PORT = 3000;

//enable static file serving
app.use(express.static('public'));

//define our main route ('/')
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/contact-us', (req, res) => {
    res.render('contact');
});

app.get('/thank-you', (req, res) => {
    res.render('confirmation');
});

app.post('/submit-order', (req, res) => {

    //crate a JSON object to store the order data
    const order = {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        toppings: req.body.toppings ? req.body.toppings : "none",
        method: req.body.method,
        size: req.body.size,
        comment: req.body.comment,
        timestamp: new Date()
    };

    //Add order object to orders
    orders.push(order)

    //res.send(orders)
    res.render('confirmation', {order});
});

app.get('/admin', (req, res) => {
    res.render('admin', {orders});
});


//start server and listen on designated port
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});