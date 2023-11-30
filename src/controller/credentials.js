const Pool = require('pg').Pool

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
});

const getCredentials = (req, res) => {
  const { id } = req.params;

  if (Number.parseFloat(id)) {
    const text = `SELECT * FROM credentials WHERE user_id = ${id}`;

    pool.query(text, (error, results) => {
      if (error) {
        throw error;
      }
  
      res.status(200).json(results.rows)
    })
  } else {
    res.status(400).json({ "status": "error", "message": "invalid id" })
  }
};

const saveCredential = (req, res) => {
  const { id, name, username, url, email, password } = req.body;

  const text = "INSERT INTO credentials(user_id, name, username, url, email, password) VALUES($1, $2, $3, $4, $5, $6)";
  const values = [id, name, username, url, email, password];

  pool.query(text, values, (error, results) => {
    if (error) {
      throw error;
    }

    res.status(201).json(results.rows)
  })
}

module.exports = {
  getCredentials,
  saveCredential
}
