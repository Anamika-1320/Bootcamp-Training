const express = require('express');
const { Pool } = require('pg');
const { engine } = require('express-handlebars');
const bcrypt = require('bcrypt');
const session = require('express-session');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const app = express();
app.use(express.static('static'));
app.use(bodyParser.urlencoded({ extended: true }));

// Generate a random session secret key
const sessionSecret = crypto.randomBytes(64).toString('hex');

// Middleware to initialize session
app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true
}));

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'foodies',
    schema: 'menu',
    password: 'root',
    port: 5432, // Default PostgreSQL port
});

const userpool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'foodies',
    password: 'root',
    port: 5432, // Default PostgreSQL port
});

// Middleware setup
app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    if (req.session && req.session.username) {
        const username = req.session.username;
        res.render('foodies', { loggedIn: true, username });
    } else {
        res.render('foodies', { loggedIn: false });
    }
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/admin', (req, res) => {
    res.render('admin');
});

app.get('/logout', (req, res) => {
    console.log(`${req.session.email} logged out!`);
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).send('Error logging out!');
        }
        res.redirect('/');
    });
});

app.get('/profile', (req, res) => {
    if (req.session && req.session.username) {
        const username = req.session.username;
        const email = req.session.email;
        const query = 'SELECT * FROM users WHERE email = $1';
        const values = [email];
        userpool.query(query, values, async (err, result) => {
            if (err) {
                console.error('Error executing query:', err);
                return res.status(500).send('Error executing query');
            }
            const user = result.rows[0];
            res.render('profile', { loggedIn: true, username, user });
        });
    } else {
        res.render('profile', { loggedIn: false });
    }
});

// Handle form submission
app.post('/signup', (req, res) => {
    const { fname, lname, mob, email, pass } = req.body;

    // Hash the password asynchronously using bcrypt
    bcrypt.hash(pass, 10, (err, hashedPassword) => {
        if (err) {
            console.error('Error hashing password:', err);
            return res.status(500).send('Error hashing password');
        }

        // Insert the data into the PostgreSQL table
        const query =
            'INSERT INTO users (first_name, last_name, mobile, email, password) VALUES ($1, $2, $3, $4, $5)';
        const values = [fname, lname, mob, email, hashedPassword];

        userpool.query(query, values, (err, result) => {
            if (err) {
                console.error('Error executing query:', err);
                return res.status(500).send('Error executing query');
            }
            console.log('User created successfully!');
            res.redirect('/login');
        });
    });
});

// Handle login form submission
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM users WHERE email = $1';
    const values = [email];

    userpool.query(query, values, async (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).send('Error executing query');
        }

        const user = result.rows[0];
        if (!user) {
            return res.status(401).send('Invalid credentials');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).send('Invalid credentials');
        }
        req.session.username = user.first_name;
        req.session.email = user.email;
        if (user.email == 'admin@foodies.com') {
            res.redirect('/admin');
            console.log(`${user.first_name} logged in!`);
        }
        else {
            res.redirect('/');
            console.log(`${user.first_name} ${user.last_name} (${user.email}) logged in!`);
        }
    });
});

// Function to insert a new food item into the database
const insertFood = async (foodData) => {
    const { name, description, price } = foodData;
    try {
        const query = 'INSERT INTO menu.food (name, description, price) VALUES ($1, $2, $3) RETURNING *';
        const values = [name, description, price];
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Error inserting food item', error);
        throw error;
    }
};

// Route to display a form for adding a new food item
app.get('/add-food', (req, res) => {
    res.render('add_food');
});

// Route to handle form submission for adding a new food item
app.post('/add-food', async (req, res) => {
    try {
        const foodData = req.body;
        const newFood = await insertFood(foodData);
        res.redirect('/menu');
    } catch (error) {
        res.status(500).send('Error adding food item');
    }
});

// Route to display the menu
app.get('/menu', async (req, res) => {
    try {
        const fquery = 'SELECT * FROM menu.food';
        const fresult = await pool.query(fquery);
        const foodItems = fresult.rows;
        const dquery = 'SELECT * FROM menu.deserts';
        const dresult = await pool.query(dquery);
        const desertItems = dresult.rows;
        const drquery = 'SELECT * FROM menu.drinks';
        const drresult = await pool.query(drquery);
        const drinkItems = drresult.rows;
        if (req.session && req.session.username) {
            const username = req.session.username;
            res.render('menu', { loggedIn: true, username, foodItems, desertItems, drinkItems });
        } else {
            res.render('menu', { foodItems, desertItems, drinkItems });
        }
    } catch (error) {
        res.status(500).send('Error fetching food items');
    }
});

const deleteFoodItem = async (id) => {
    try {
        const query = 'DELETE FROM menu.food WHERE id = $1 RETURNING *';
        const values = [id];
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Error deleting food item from the menu', error);
        throw error;
    }
};

// Route to delete a food item (HTTP DELETE)
app.get('/del-food/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const deletedItem = await deleteFoodItem(id);
        if (!deletedItem) {
            res.status(404).send('Food item not found.');
        } else {
            res.redirect('/menu');
            console.log(`Food item with ID ${id} has been deleted.`);
            // res.status(200).send(`Food item with ID ${id} has been deleted.`);
        }
    } catch (error) {
        res.status(500).send('Error deleting food item');
    }
});


// app.put('/employees/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { name, department, position } = req.body;
//         const query = 'UPDATE employees SET name = $1, department = $2, position = $3 WHERE id = $4 RETURNING *';
//         const values = [name, department, position, id];
//         const result = await pool.query(query, values);
//         const updatedEmployee = result.rows[0];
//         res.send(updatedEmployee);
//     } catch (error) {
//         res.status(500).send('Error updating employee');
//     }
// });

// Route to display the form for updating an employee (HTTP GET)
// app.get('/employees/:id/edit', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const query = 'SELECT * FROM employees WHERE id = $1';
//         const values = [id];
//         const result = await pool.query(query, values);
//         const employee = result.rows[0];
//         res.render('edit_employee', { employee });
//     } catch (error) {
//         res.status(500).send('Error retrieving employee for edit');
//     }
// });


// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});