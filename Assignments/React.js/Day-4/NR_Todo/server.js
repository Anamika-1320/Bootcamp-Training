const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'todo-list',
    password: 'root',
    port: 5432,
});

app.get('/todos', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM todos');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/todos', async (req, res) => {
    const text = req.body.text;
    try {
        const { rows } = await pool.query('INSERT INTO todos(text) VALUES($1) RETURNING *', [text]);
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.put('/todos/:id', async (req, res) => {
    const todoId = parseInt(req.params.id);
    const updatedText = req.body.text;
    try {
        const { rows } = await pool.query('UPDATE todos SET text = $1 WHERE id = $2 RETURNING *', [updatedText, todoId]);
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.delete('/todos/:id', async (req, res) => {
    const todoId = parseInt(req.params.id);
    try {
        await pool.query('DELETE FROM todos WHERE id = $1', [todoId]);
        res.json({ message: 'Todo deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
