import { Router } from 'express';
import { pool } from '../db-config';

export const router = Router();

router.get('/get_todos', async (req, res) => {
  pool
    .connect()
    .then((client) => {
      client.query(
        `SELECT * FROM Todolist ORDER BY created_at DESC`,
        (err, queryRes) => {
          if (err) {
            console.log(err.stack);
            res.status(500).send();
          } else res.json({ data: queryRes.rows });
          client.release();
        }
      );
    })
    .catch((err) => console.log(err));
});

router.post('/create_todo', async (req, res) => {
  const { todo } = req.body;
  const sqlQuery = {
    text: `INSERT INTO Todolist(todo) VALUES($1)`,
    values: [todo]
  };
  pool
    .connect()
    .then((client) => {
      client.query(sqlQuery, (err) => {
        if (err) {
          console.log(err.stack);
          res.status(500).send();
        } else res.status(200).send();
        client.release();
      });
    })
    .catch((err) => console.log(err));
});

router.put('/update_todo', (req, res) => {
  const { id } = req.query;
  const { value, column } = req.body;
  const sqlQuery = `UPDATE Todolist SET ${column} = ${value} WHERE id=${id}`;
  pool
    .connect()
    .then((client) => {
      client.query(sqlQuery, (err) => {
        if (err) {
          res.status(500).send();
        } else res.status(200).send();
        client.release();
      });
    })
    .catch((err) => console.log(err));
});

router.delete('/delete_todo/', (req, res) => {
  const { id } = req.query;
  const sqlQuery = `DELETE FROM Todolist WHERE id=${id}`;

  pool
    .connect()
    .then((client) => {
      client.query(sqlQuery, (err) => {
        if (err) {
          res.status(500).send();
          console.log(err.stack);
        } else res.status(200).send();
      });
      client.release();
    })
    .catch((err) => console.log(err));
});