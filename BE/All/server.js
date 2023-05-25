const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

// ===================================================================================================================================================================================================
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.log('Failed to connect to MySQL: ', err);
    } else {
        console.log('✅ Connected to MySQL');
    }
});
// ===================================================================================================================================================================================================
app.get('/', (req, res) => {
    return res.status(200).json({
        message: 'Author: Vũ Văn Nghĩa 20206205'
    })
});
// ===================================================================================================================================================================================================
// Lấy tất cả users
app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM users WHERE active = 1 ';

    db.query(sql, (err, result) => {
        if (err) {
            console.log('Failed to execute query: ', err);
            res.status(500).send('Failed to execute query');
        } else {
            res.send(result);
        }
    });
});
// Xem chi tiết user theo id
app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM users WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.log('Failed to execute query: ', err);
            res.status(500).send('Failed to execute query');
        } else if (result.length === 0) {
            res.status(404).send('User not found');
        } else {
            res.send(result[0]);
        }
    });
});
// Xóa user theo id
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'UPDATE users SET active = 0 WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.log('Failed to execute query: ', err);
            res.status(500).send('Failed to execute query');
        } else if (result.affectedRows === 0) {
            res.status(404).send('User not found');
        } else {
            res.send(`Deleted user by id = ${id} successfully`);
        }
    });
});
// Thêm user
app.post('/users', (req, res) => {
    const { role, username, password, full_name, date_of_birth, gender, phone_number, email, address } = req.body;
    const sql = 'INSERT INTO users (id, role, username, password, full_name, date_of_birth, gender, phone_number, email, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    db.query('SELECT MAX(id) AS maxId FROM users', (err, result) => {
        if (err) {
            console.log('Failed to execute query: ', err);
            res.status(500).send('Failed to execute query');
        } else {
            const maxId = result[0].maxId || 0;
            const newId = maxId + 1;
            const values = [newId, role, username, password, full_name, date_of_birth, gender, phone_number, email, address];

            db.query(sql, values, (err, result) => {
                if (err) {
                    console.log('Failed to execute query: ', err);
                    res.status(500).send('Failed to execute query');
                } else {
                    res.send(`Added user by id = ${newId} successfully`);
                }
            });
        }
    });
});
// Sửa user theo id
app.put('/users/:id', (req, res) => {
    const { role, username, password, full_name, date_of_birth, gender, phone_number, email, address } = req.body;
    const id = req.params.id;
    const sql = 'UPDATE users SET role=?, username=?, password=?, full_name=?, date_of_birth=?, gender=?, phone_number=?, email=?, address=? WHERE id=?';
    const values = [role, username, password, full_name, date_of_birth, gender, phone_number, email, address, id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.log('Failed to execute query: ', err);
            res.status(500).send('Failed to execute query');
        } else if (result.affectedRows === 0) {
            res.status(404).send(`User ${id} not found`);
        } else {
            res.send(`Updated user by id = ${id} successfully`);
        }
    });
});
// ===================================================================================================================================================================================================
// Lấy tất cả notifications
app.get('/notifications', (req, res) => {
    const sql = 'SELECT * FROM notifications';

    db.query(sql, (err, result) => {
        if (err) {
            console.log('Failed to execute query: ', err);
            res.status(500).send('Failed to execute query');
        } else {
            res.send(result);
        }
    });
});
// Xem chi tiết notification theo id
app.get('/notifications/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM notifications WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.log('Failed to execute query: ', err);
            res.status(500).send('Failed to execute query');
        } else if (result.length === 0) {
            res.status(404).send('User not found');
        } else {
            res.send(result[0]);
        }
    });
});
// Xóa notification theo id
app.delete('/notifications/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'UPDATE notifications SET active = 0 WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.log('Failed to execute query: ', err);
            res.status(500).send('Failed to execute query');
        } else if (result.affectedRows === 0) {
            res.status(404).send('notification not found');
        } else {
            res.send(`Deleted notification by id = ${id} successfully`);
        }
    });
});
// Thêm notification
app.post('/notifications', (req, res) => {
    const { title, content } = req.body;
    const sql = 'INSERT INTO notifications (id, title, content, time) VALUES ( ?, ?, ?, now() )';

    db.query('SELECT MAX(id) AS maxId FROM notifications', (err, result) => {
        if (err) {
            console.log('Failed to execute query: ', err);
            res.status(500).send('Failed to execute query');
        } else {
            const maxId = result[0].maxId || 0;
            const newId = maxId + 1;
            const values = [newId, title, content];

            db.query(sql, values, (err, result) => {
                if (err) {
                    console.log('Failed to execute query: ', err);
                    res.status(500).send('Failed to execute query');
                } else {
                    res.send(`Added notification by id = ${newId} successfully`);
                }
            });
        }
    });
});
// Sửa notification theo id
app.put('/notifications/:id', (req, res) => {
    const { title, content } = req.body;
    const id = req.params.id;
    const sql = 'UPDATE notifications SET title=?, content=? WHERE id=?';
    const values = [title, content, id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.log('Failed to execute query: ', err);
            res.status(500).send('Failed to execute query');
        } else if (result.affectedRows === 0) {
            res.status(404).send(`notification ${id} not found`);
        } else {
            res.send(`Updated notification by id = ${id} successfully`);
        }
    });
});
// ===================================================================================================================================================================================================
// Lấy tất cả authors
app.get('/authors', (req, res) => {
    const sql = 'SELECT * FROM authors WHERE active = 1 ';

    db.query(sql, (err, result) => {
        if (err) {
            console.log('Failed to execute query: ', err);
            res.status(500).send('Failed to execute query');
        } else {
            res.send(result);
        }
    });
});
// Xem chi tiết author theo id
app.get('/authors/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM authors WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.log('Failed to execute query: ', err);
            res.status(500).send('Failed to execute query');
        } else if (result.length === 0) {
            res.status(404).send('User not found');
        } else {
            res.send(result[0]);
        }
    });
});
// Xóa author theo id
app.delete('/authors/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'UPDATE authors SET active = 0 WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.log('Failed to execute query: ', err);
            res.status(500).send('Failed to execute query');
        } else if (result.affectedRows === 0) {
            res.status(404).send('author not found');
        } else {
            res.send(`Deleted author by id = ${id} successfully`);
        }
    });
});
// Thêm author
app.post('/authors', (req, res) => {
    const { full_name, date_of_birth, gender, phone_number, email, address } = req.body;
    const sql = 'INSERT INTO authors (id, full_name, date_of_birth, gender, phone_number, email, address) VALUES (?, ?, ?, ?, ?, ?, ?)';

    db.query('SELECT MAX(id) AS maxId FROM authors', (err, result) => {
        if (err) {
            console.log('Failed to execute query: ', err);
            res.status(500).send('Failed to execute query');
        } else {
            const maxId = result[0].maxId || 0;
            const newId = maxId + 1;
            const values = [newId, full_name, date_of_birth, gender, phone_number, email, address];

            db.query(sql, values, (err, result) => {
                if (err) {
                    console.log('Failed to execute query: ', err);
                    res.status(500).send('Failed to execute query');
                } else {
                    res.send(`Added author by id = ${newId} successfully`);
                }
            });
        }
    });
});
// Sửa author theo id
app.put('/authors/:id', (req, res) => {
    const { full_name, date_of_birth, gender, phone_number, email, address } = req.body;
    const id = req.params.id;
    const sql = 'UPDATE authors SET full_name=?, date_of_birth=?, gender=?, phone_number=?, email=?, address=? WHERE id=?';
    const values = [full_name, date_of_birth, gender, phone_number, email, address, id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.log('Failed to execute query: ', err);
            res.status(500).send('Failed to execute query');
        } else if (result.affectedRows === 0) {
            res.status(404).send(`author ${id} not found`);
        } else {
            res.send(`Updated author by id = ${id} successfully`);
        }
    });
});
// ===================================================================================================================================================================================================
// Lấy tất cả categorys
app.get('/categorys', (req, res) => {
    const sql = 'SELECT * FROM categorys WHERE active = 1 ';

    db.query(sql, (err, result) => {
        if (err) {
            console.log('Failed to execute query: ', err);
            res.status(500).send('Failed to execute query');
        } else {
            res.send(result);
        }
    });
});
// Xem chi tiết category theo id
app.get('/categorys/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM categorys WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.log('Failed to execute query: ', err);
            res.status(500).send('Failed to execute query');
        } else if (result.length === 0) {
            res.status(404).send('User not found');
        } else {
            res.send(result[0]);
        }
    });
});
// Xóa category theo id
app.delete('/categorys/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'UPDATE categorys SET active = 0 WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.log('Failed to execute query: ', err);
            res.status(500).send('Failed to execute query');
        } else if (result.affectedRows === 0) {
            res.status(404).send('category not found');
        } else {
            res.send(`Deleted category by id = ${id} successfully`);
        }
    });
});
// Thêm category
app.post('/categorys', (req, res) => {
    const { name } = req.body;
    const sql = 'INSERT INTO categorys (id, name, active) VALUES (?, ?,1)';

    db.query('SELECT MAX(id) AS maxId FROM categorys', (err, result) => {
        if (err) {
            console.log('Failed to execute query: ', err);
            res.status(500).send('Failed to execute query');
        } else {
            const maxId = result[0].maxId || 0;
            const newId = maxId + 1;
            const values = [newId, name];

            db.query(sql, values, (err, result) => {
                if (err) {
                    console.log('Failed to execute query: ', err);
                    res.status(500).send('Failed to execute query');
                } else {
                    res.send(`Added category by id = ${newId} successfully`);
                }
            });
        }
    });
});
// Sửa category theo id
app.put('/categorys/:id', (req, res) => {
    const { name } = req.body;
    const id = req.params.id;
    const sql = 'UPDATE categorys SET name=? WHERE id=?';
    const values = [name, id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.log('Failed to execute query: ', err);
            res.status(500).send('Failed to execute query');
        } else if (result.affectedRows === 0) {
            res.status(404).send(`category ${id} not found`);
        } else {
            res.send(`Updated category by id = ${id} successfully`);
        }
    });
});
// ===================================================================================================================================================================================================
// Lấy tất cả products
app.get('/products', (req, res) => {
    const sql = 'SELECT * FROM products WHERE active = 1 ';

    db.query(sql, (err, result) => {
        if (err) {
            console.log('Failed to execute query: ', err);
            res.status(500).send('Failed to execute query');
        } else {
            res.send(result);
        }
    });
});
// Xem chi tiết product theo id
app.get('/products/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM products WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.log('Failed to execute query: ', err);
            res.status(500).send('Failed to execute query');
        } else if (result.length === 0) {
            res.status(404).send('product not found');
        } else {
            res.send(result[0]);
        }
    });
});
// Xóa product theo id
app.delete('/products/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'UPDATE products SET active = 0 WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.log('Failed to execute query: ', err);
            res.status(500).send('Failed to execute query');
        } else if (result.affectedRows === 0) {
            res.status(404).send('product not found');
        } else {
            res.send(`Deleted product by id = ${id} successfully`);
        }
    });
});
// Thêm product
app.post('/products', (req, res) => {
    const { title, purchase_price, selling_price, size, description, category_id, author_id } = req.body;
    const sql = 'INSERT INTO products (id, title, purchase_price, selling_price, size, description, category_id, author_id, active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)';

    db.query('SELECT MAX(id) AS maxId FROM products', (err, result) => {
        if (err) {
            console.log('Failed to execute query: ', err);
            res.status(500).send('Failed to execute query');
        } else {
            const maxId = result[0].maxId || 0;
            const newId = maxId + 1;
            const values = [newId, title, purchase_price, selling_price, size, description, category_id, author_id];

            db.query(sql, values, (err, result) => {
                if (err) {
                    console.log('Failed to execute query: ', err);
                    res.status(500).send('Failed to execute query');
                } else {
                    res.send(`Added product by id = ${newId} successfully`);
                }
            });
        }
    });
});
// Sửa product theo id
app.put('/products/:id', (req, res) => {
    const { title, purchase_price, selling_price, size, description, category_id, author_id } = req.body;
    const id = req.params.id;
    const sql = 'UPDATE products SET title=?, purchase_price=?, selling_price=?, size=?, description=?, category_id=?, author_id=? WHERE id=?';
    const values = [title, purchase_price, selling_price, size, description, category_id, author_id, id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.log('Failed to execute query: ', err);
            res.status(500).send('Failed to execute query');
        } else if (result.affectedRows === 0) {
            res.status(404).send(`product ${id} not found`);
        } else {
            res.send(`Updated product by id = ${id} successfully`);
        }
    });
});
// ===================================================================================================================================================================================================
// Lấy tất cả chats
app.get('/chats', (req, res) => {
    const sql = 'SELECT * FROM chats';

    db.query(sql, (err, result) => {
        if (err) {
            console.log('Failed to execute query: ', err);
            res.status(500).send('Failed to execute query');
        } else {
            res.send(result);
        }
    });
});
// Xem chi tiết chat theo id
app.get('/chats/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM chats WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.log('Failed to execute query: ', err);
            res.status(500).send('Failed to execute query');
        } else if (result.length === 0) {
            res.status(404).send('User not found');
        } else {
            res.send(result[0]);
        }
    });
});
// Xóa chat theo id
app.delete('/chats/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'UPDATE chats SET active = 0 WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.log('Failed to execute query: ', err);
            res.status(500).send('Failed to execute query');
        } else if (result.affectedRows === 0) {
            res.status(404).send('chat not found');
        } else {
            res.send(`Deleted chat by id = ${id} successfully`);
        }
    });
});
// Thêm chat
app.post('/chats', (req, res) => {
    const { customer_id, content } = req.body;
    const sql = 'INSERT INTO chats (id, customer_id, content, time, active) VALUES (?, ?, ?, now(), 1) ';

    db.query('SELECT MAX(id) AS maxId FROM chats', (err, result) => {
        if (err) {
            console.log('Failed to execute query: ', err);
            res.status(500).send('Failed to execute query');
        } else {
            const maxId = result[0].maxId || 0;
            const newId = maxId + 1;
            const values = [newId, customer_id, content];

            db.query(sql, values, (err, result) => {
                if (err) {
                    console.log('Failed to execute query: ', err);
                    res.status(500).send('Failed to execute query');
                } else {
                    res.send(`Added chat by id = ${newId} successfully`);
                }
            });
        }
    });
});
// Sửa chat theo id
app.put('/chats/:id', (req, res) => {
    const { customer_id, content } = req.body;
    const id = req.params.id;
    const sql = 'UPDATE chats SET customer_id=?, content=? WHERE id=?';
    const values = [customer_id, content, id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.log('Failed to execute query: ', err);
            res.status(500).send('Failed to execute query');
        } else if (result.affectedRows === 0) {
            res.status(404).send(`chat ${id} not found`);
        } else {
            res.send(`Updated chat by id = ${id} successfully`);
        }
    });
});
// ===================================================================================================================================================================================================


// Lấy tất cả carts
app.get('/carts', (req, res) => {
    const sql = 'SELECT * FROM carts';

    db.query(sql, (err, result) => {
        if (err) {
            console.log('Failed to execute query: ', err);
            res.status(500).send('Failed to execute query');
        } else {
            res.send(result);
        }
    });
});
// Xem chi tiết cart theo id
app.get('/carts/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM carts WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.log('Failed to execute query: ', err);
            res.status(500).send('Failed to execute query');
        } else if (result.length === 0) {
            res.status(404).send('User not found');
        } else {
            res.send(result[0]);
        }
    });
});
// Xóa cart theo id
app.delete('/carts/:id', (req, res) => {
    const { id } = req.params;
    const sql = ' DELETE FROM carts WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.log('Failed to execute query: ', err);
            res.status(500).send('Failed to execute query');
        } else if (result.affectedRows === 0) {
            res.status(404).send('cart not found');
        } else {
            res.send(`Deleted cart by id = ${id} successfully`);
        }
    });
});
// Thêm cart
app.post('/carts', (req, res) => {
    const { customer_id, product_id, quantity } = req.body;
    const sql = 'INSERT INTO carts (id, customer_id, product_id, quantity) VALUES ( ?, ?, ?,? )';

    db.query('SELECT MAX(id) AS maxId FROM carts', (err, result) => {
        if (err) {
            console.log('Failed to execute query: ', err);
            res.status(500).send('Failed to execute query');
        } else {
            const maxId = result[0].maxId || 0;
            const newId = maxId + 1;
            const values = [newId, customer_id, product_id, quantity];

            db.query(sql, values, (err, result) => {
                if (err) {
                    console.log('Failed to execute query: ', err);
                    res.status(500).send('Failed to execute query');
                } else {
                    res.send(`Added cart by id = ${newId} successfully`);
                }
            });
        }
    });
});
// Sửa cart theo id
app.put('/carts/:id', (req, res) => {
    const { customer_id, product_id, quantity } = req.body;
    const id = req.params.id;
    const sql = 'UPDATE carts SET customer_id=?, product_id=?,quantity=? WHERE id=?';
    const values = [customer_id, product_id, quantity, id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.log('Failed to execute query: ', err);
            res.status(500).send('Failed to execute query');
        } else if (result.affectedRows === 0) {
            res.status(404).send(`cart ${id} not found`);
        } else {
            res.send(`Updated cart by id = ${id} successfully`);
        }
    });
});


// ===================================================================================================================================================================================================


// Lấy tất cả invoices
app.get('/invoices', (req, res) => {
    const sql = 'SELECT * FROM invoices';

    db.query(sql, (err, result) => {
        if (err) {
            console.log('Failed to execute query: ', err);
            res.status(500).send('Failed to execute query');
        } else {
            res.send(result);
        }
    });
});
// Xem chi tiết invoice theo id
app.get('/invoices/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM invoices WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.log('Failed to execute query: ', err);
            res.status(500).send('Failed to execute query');
        } else if (result.length === 0) {
            res.status(404).send('User not found');
        } else {
            res.send(result[0]);
        }
    });
});
// Xóa invoice theo id
app.delete('/invoices/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'UPDATE invoices SET active = 0 WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.log('Failed to execute query: ', err);
            res.status(500).send('Failed to execute query');
        } else if (result.affectedRows === 0) {
            res.status(404).send('invoice not found');
        } else {
            res.send(`Deleted invoice by id = ${id} successfully`);
        }
    });
});
// Thêm invoice
app.post('/invoices', (req, res) => {
    const { customer_id, type } = req.body;
    const sql = 'INSERT INTO invoices (id, customer_id, time, type, active) VALUES ( ?, ?, now(),?,1 )';

    db.query('SELECT MAX(id) AS maxId FROM invoices', (err, result) => {
        if (err) {
            console.log('Failed to execute query: ', err);
            res.status(500).send('Failed to execute query');
        } else {
            const maxId = result[0].maxId || 0;
            const newId = maxId + 1;
            const values = [newId, customer_id, type];

            db.query(sql, values, (err, result) => {
                if (err) {
                    console.log('Failed to execute query: ', err);
                    res.status(500).send('Failed to execute query');
                } else {
                    res.send(`Added invoice by id = ${newId} successfully`);
                }
            });
        }
    });
});
// Sửa invoice theo id
app.put('/invoices/:id', (req, res) => {
    const { customer_id, type } = req.body;
    const id = req.params.id;
    const sql = 'UPDATE invoices SET customer_id=?, type=? WHERE id=?';
    const values = [customer_id, type, id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.log('Failed to execute query: ', err);
            res.status(500).send('Failed to execute query');
        } else if (result.affectedRows === 0) {
            res.status(404).send(`invoice ${id} not found`);
        } else {
            res.send(`Updated invoice by id = ${id} successfully`);
        }
    });
});


// ===================================================================================================================================================================================================


// Lấy tất cả orders
app.get('/orders', (req, res) => {
    const sql = 'SELECT * FROM orders';

    db.query(sql, (err, result) => {
        if (err) {
            console.log('Failed to execute query: ', err);
            res.status(500).send('Failed to execute query');
        } else {
            res.send(result);
        }
    });
});
// Xem chi tiết order theo id
app.get('/orders/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM orders WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.log('Failed to execute query: ', err);
            res.status(500).send('Failed to execute query');
        } else if (result.length === 0) {
            res.status(404).send('User not found');
        } else {
            res.send(result[0]);
        }
    });
});
// Xóa order theo id
app.delete('/orders/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'UPDATE orders SET type = "cancelled" WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.log('Failed to execute query: ', err);
            res.status(500).send('Failed to execute query');
        } else if (result.affectedRows === 0) {
            res.status(404).send('order not found');
        } else {
            res.send(`Deleted order by id = ${id} successfully`);
        }
    });
});
// Thêm order
app.post('/orders', (req, res) => {
    const { invoice_id, type } = req.body;
    const sql = 'INSERT INTO orders (id, invoice_id, type) VALUES ( ?, ?, ? )';

    db.query('SELECT MAX(id) AS maxId FROM orders', (err, result) => {
        if (err) {
            console.log('Failed to execute query: ', err);
            res.status(500).send('Failed to execute query');
        } else {
            const maxId = result[0].maxId || 0;
            const newId = maxId + 1;
            const values = [newId, invoice_id, type];

            db.query(sql, values, (err, result) => {
                if (err) {
                    console.log('Failed to execute query: ', err);
                    res.status(500).send('Failed to execute query');
                } else {
                    res.send(`Added order by id = ${newId} successfully`);
                }
            });
        }
    });
});
// Sửa order theo id
app.put('/orders/:id', (req, res) => {
    const { invoice_id, type } = req.body;
    const id = req.params.id;
    const sql = 'UPDATE orders SET invoice_id=?, type=? WHERE id=?';
    const values = [invoice_id, type, id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.log('Failed to execute query: ', err);
            res.status(500).send('Failed to execute query');
        } else if (result.affectedRows === 0) {
            res.status(404).send(`order ${id} not found`);
        } else {
            res.send(`Updated order by id = ${id} successfully`);
        }
    });
});


// ===================================================================================================================================================================================================


// Lấy tất cả invoice_items
app.get('/invoice_items', (req, res) => {
    const sql = 'SELECT * FROM invoice_items';

    db.query(sql, (err, result) => {
        if (err) {
            console.log('Failed to execute query: ', err);
            res.status(500).send('Failed to execute query');
        } else {
            res.send(result);
        }
    });
});
// Xem chi tiết invoice_item theo id
app.get('/invoice_items/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM invoice_items WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.log('Failed to execute query: ', err);
            res.status(500).send('Failed to execute query');
        } else if (result.length === 0) {
            res.status(404).send('User not found');
        } else {
            res.send(result[0]);
        }
    });
});
// Xóa invoice_item theo id
app.delete('/invoice_items/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'UPDATE invoice_items SET active = 0 WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.log('Failed to execute query: ', err);
            res.status(500).send('Failed to execute query');
        } else if (result.affectedRows === 0) {
            res.status(404).send('invoice_item not found');
        } else {
            res.send(`Deleted invoice_item by id = ${id} successfully`);
        }
    });
});
// Thêm invoice_item
app.post('/invoice_items', (req, res) => {
    const { invoice_id, product_id, quantity, price } = req.body;
    const sql = 'INSERT INTO invoice_items (id, invoice_id, product_id, quantity, price, active) VALUES (?, ?, ?, ?, ?, 1)';

    db.query('SELECT MAX(id) AS maxId FROM invoice_items', (err, result) => {
        if (err) {
            console.log('Failed to execute query: ', err);
            res.status(500).send('Failed to execute query');
        } else {
            const maxId = result[0].maxId || 0;
            const newId = maxId + 1;
            const values = [newId, invoice_id, product_id, quantity, price];

            db.query(sql, values, (err, result) => {
                if (err) {
                    console.log('Failed to execute query: ', err);
                    res.status(500).send('Failed to execute query');
                } else {
                    res.send(`Added invoice_item by id = ${newId} successfully`);
                }
            });
        }
    });
});
// Sửa invoice_item theo id
app.put('/invoice_items/:id', (req, res) => {
    const { invoice_id, product_id, quantity, price } = req.body;
    const id = req.params.id;
    const sql = 'UPDATE invoice_items SET invoice_id=?, product_id=?,quantity=?,price=? WHERE id=?';
    const values = [invoice_id, product_id, quantity, price, id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.log('Failed to execute query: ', err);
            res.status(500).send('Failed to execute query');
        } else if (result.affectedRows === 0) {
            res.status(404).send(`invoice_item ${id} not found`);
        } else {
            res.send(`Updated invoice_item by id = ${id} successfully`);
        }
    });
});


// ===================================================================================================================================================================================================
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`\n✅ Server: http://localhost:${port}`);
});
// ===================================================================================================================================================================================================