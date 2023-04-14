const { Client } = require('pg')

const client = new Client({
    host: 'localhost',
    port:5432,
    user:'postgres',
    password:'1234',
    database:'ButtonsDB'
})

client.connect();

let query = `SELECT * FROM buttons ORDER BY id ASC`;

const getButtons = (req, res) => {
  client.query(query, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error getting buttons');
    } else {
      res.status(200).json(result.rows);
    }
  });
}

const createButtons = (req, res) => {
    const name = req.body.name;
    const clickcount  = req.body.clickcount;
    const query = 'INSERT INTO buttons (name, clickcount) VALUES ($1,$2)';
    const values = [name, clickcount];

    client.query(query, values, (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send(err);
        } else {
          res.status(201).json({ button: { id: result.insertId, name, clickcount } });
        }
      });
}

const deleteButton = (req, res) => {
  const id = parseInt(req.params.id);
  const query = 'DELETE FROM buttons WHERE id = $1';

  client.query(query, [id], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else if (result.rowCount === 0) {
      res.status(404).send('Button not found');
    } else {
      res.status(200).send('Button deleted successfully');
    }
  });
};

const updateButtonClickCount = (req, res) => {
  const id = req.params.id;
  const clickCount = req.body.clickcount;
  const query = 'UPDATE buttons SET clickcount = COALESCE($1, clickcount) WHERE id = $2';
  const values = [clickCount, id];

  if (!clickCount) {
    res.status(400).send('Click count is missing in the request body');
    return;
  }
  client.query(query, values, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error updating button click count');
    } else if (result.rowCount === 0) {
      res.status(404).send('Button not found');
    } else {
      res.status(200).send('Button click count updated successfully');
    }
  });
}

module.exports = {
    getButtons,
    createButtons,
    deleteButton,
    updateButtonClickCount
}