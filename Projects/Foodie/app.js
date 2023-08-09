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
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));

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
    database: 'SizzleAndSpice',
    password: 'root',
    port: 5432,
});

// Middleware setup
app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    pattern = /sns\.com$/;
    if (req.session && pattern.test(req.session.email)) {
        res.render('home', { loggedIn: true, admin: true });
    } else if (req.session && req.session.username) {
        const username = req.session.username;
        res.render('home', { loggedIn: true, username });
    } else {
        res.render('home', { loggedIn: false });
    }
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/logout', (req, res) => {
    pattern = /sns\.com$/;
    if (req.session && pattern.test(req.session.email)) {
        console.log('Admin logged out.');
    } else {
        console.log(`${req.session.email} logged out!`);
    }
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
        const query = 'SELECT * FROM users.customer WHERE email = $1';
        const values = [email];
        pool.query(query, values, async (err, result) => {
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

app.post('/validate-signup-email', async (req, res) => {
    const { email } = req.body;
    try {
        const query = `SELECT * FROM users.customer WHERE email = $1`;
        const result = await pool.query(query, [email]);
        if (result.rows.length > 0) {
            res.json({ status: 'error', message: 'Account with this email already exists.' });
        }
    } catch (error) {
        console.error('Internal server error:', error);
        res.status(500).json({ status: 'error', message: 'Internal server error.' });
    }
});

app.post('/validate-login-email', async (req, res) => {
    const { email } = req.body;
    try {
        const query = `SELECT * FROM users.admin WHERE email = $1 union SELECT * FROM users.customer WHERE email = $1`;
        const result = await pool.query(query, [email]);
        if (result.rows.length == 0) {
            res.json({ status: 'error', message: 'No account found with this email.' });
        }
    } catch (error) {
        console.error('Internal server error:', error);
        res.status(500).json({ status: 'error', message: 'Internal server error.' });
    }
});

app.post('/validate-login-password', async (req, res) => {
    const { email, password } = req.body;

    try {
        const query = `SELECT * FROM users.admin WHERE email = $1 union SELECT * FROM users.customer WHERE email = $1`;
        const result = await pool.query(query, [email]);
        const storedHashedPassword = result.rows[0].password;
        const passwordMatch = await bcrypt.compare(password, storedHashedPassword);
        if (!passwordMatch) {
            res.json({ status: 'error', message: 'Incorrect password!' });
        }
    } catch (error) {
        console.error('Internal server error:', error);
        res.status(500).json({ status: 'error', message: 'Internal server error.' });
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
            'INSERT INTO users.customer (first_name, last_name, mobile, email, password) VALUES ($1, $2, $3, $4, $5)';
        const values = [fname, lname, mob, email, hashedPassword];

        pool.query(query, values, (err, result) => {
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
    const query = 'SELECT * FROM users.customer WHERE email = $1 union SELECT * FROM users.admin WHERE email = $1';
    const values = [email];

    pool.query(query, values, async (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).send('Error executing query');
        }

        const user = result.rows[0];

        req.session.username = user.first_name;
        req.session.email = user.email;
        pattern = /sns\.com$/;
        if (pattern.test(req.session.email)) {
            console.log('Admin logged in.');
        } else {
            console.log(`${user.first_name} ${user.last_name} (${user.email}) logged in!`);
        }
        res.redirect('/');
    });
});

// Function to insert a new food item into the database
const insertFood = async (foodData) => {
    const { name, description, price } = foodData;
    try {
        const query = 'INSERT INTO item.menu (name, description, price) VALUES ($1, $2, $3) RETURNING *';
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
    const section = req.query.section;
    const category = req.query.category;
    var query;
    if (section == 'All') {
        if (category) {
            query = `SELECT * FROM item.menu where category = '${category}' or category is null order by id`;
        } else {
            query = `SELECT * FROM item.menu order by id`;
        }
    } else if (['Main Course', 'Appetizers'].includes(section) && category) {
        query = `SELECT * FROM item.menu where section = '${section}' and category = '${category}'`;
    } else {
        query = `SELECT * FROM item.menu where section = '${section}'`;
    }
    try {
        const result = await pool.query(query);
        const items = result.rows;
        if (req.session && req.session.username) {
            const username = req.session.username;
            res.render('menu', { loggedIn: true, username, items });
        } else {
            res.render('menu', { items });
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
            // res.status(200).send(`Food item with ID ${ id } has been deleted.`);
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