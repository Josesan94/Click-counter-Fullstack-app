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

const getButtons = (req,res) => {
    client.query(query, (err, results) => {
        if(err) {
          console.log(err)
        }
        res.status(200).json(results.rows)
    })
}

const createButtons = (req, res) => {
    const name = req.body.name;
    const clickCount  = req.body.clickcount;
    const query = 'INSERT INTO buttons (name, clickcount) VALUES ($1,$2)';
    const values = [name, clickCount];

    client.query(query, values, (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send(err);
        } else {
          res.status(201).send('Button created!');
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
  const id = parseInt(req.params.id);
  const clickcount = req.body.clickcount;
  const query = 'UPDATE buttons SET clickcount = COALESCE($1, clickcount) WHERE id = $2';
  const values = [clickcount, id];
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