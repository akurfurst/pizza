//import the express module
import express from 'express';
import mysql2 from 'mysql2';
import dotenv from 'dotenv';

//load environment variables from .env
dotenv.config();
console.log(process.env.DB_HOST);

//create an express application
const app = express();

//set EJS as the view engine
app.set('view engine', 'ejs');

//Middleware that allows express to read form data and store it in req.body
app.use(express.urlencoded({ extended: true }));

//define a port number where server will listen
const PORT = 3000;

//enable static file serving
app.use(express.static('public'));

//Create a pool (bucket) of database connections
const pool = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
}).promise();

//database test route
app.get('/db-test', async(req, res) => {
    try{
        const pizza_orders = await pool.query('SELECT * FROM orders');
        res.send(pizza_orders[0]);
    } catch(err) {
        console.error("Database error: ", err);
    }
});

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

app.post('/submit-order', async(req, res) => {

    const order = req.body;

    //crate a array object to store the order data
    const params = [
        req.body.fname,
        req.body.lname,
        req.body.email,
        req.body.size,
        req.body.method,
        
        
    ];

    //insert a new order into the database
    const sql = `INSERT INTO orders (fname, lname, email, size, method, toppings) VALUES (?, ?, ?, ?, ?, ?)`
    const result = await pool.execute(sql, params);

    //res.send(orders)
    res.render('confirmation', {order});
});

app.get('/admin', async(req, res) => {
    //read all order sfrom the dtabase
    //newest first
    const orders = await pool.query('SELECT * FROM orders ORDER BY timestamp DESC');
    //console.log(orders);

    res.render('admin', {orders:orders[0]});
});


//start server and listen on designated port
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
