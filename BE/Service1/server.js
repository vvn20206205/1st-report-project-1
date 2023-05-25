const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "vvn"
});

db.connect((err) => {
    if (err) {
        console.log('Failed to connect to MySQL: ', err);
    } else {
        console.log('✅ Connected to MySQL');
    }
});
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

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`✅ Server run: http://localhost:${port}/`)
});