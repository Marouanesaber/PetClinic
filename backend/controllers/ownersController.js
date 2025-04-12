// Owners controller

// Get all owners
const getAllOwners = (req, res) => {
  const db = req.db;

  db.query(`
    SELECT o.id, CONCAT(o.first_name, ' ', o.last_name) AS name, o.email, o.telephone, o.address,
           (SELECT COUNT(*) FROM pets WHERE owner_id = o.id) AS pets_count
    FROM owners o
    ORDER BY o.created_at DESC
  `, (err, results) => {
    if (err) {
      console.error('Error fetching owners:', err);
      return res.status(500).json({ error: 'Error fetching owners' });
    }

    res.status(200).json(results);
  });
};

// Get a single owner by ID
const getOwnerById = (req, res) => {
  const db = req.db;
  const ownerId = req.params.id;

  db.query('SELECT * FROM owners WHERE id = ?', [ownerId], (err, results) => {
    if (err) {
      console.error('Error fetching owner:', err);
      return res.status(500).json({ error: 'Error fetching owner: ' + err.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Owner not found' });
    }

    res.status(200).json(results[0]);
  });
};

// Get all pets owned by an owner
const getOwnerPets = (req, res) => {
  const db = req.db;
  const ownerId = req.params.id;

  db.query('SELECT * FROM pets WHERE owner_id = ?', [ownerId], (err, results) => {
    if (err) {
      console.error('Error fetching owner pets:', err);
      return res.status(500).json({ error: 'Error fetching owner pets: ' + err.message });
    }

    res.status(200).json(results);
  });
};

// Create a new owner
const createOwner = (req, res) => {
  const db = req.db;
  const { first_name, last_name, email, telephone, address, city } = req.body;

  if (!first_name || !last_name || !email) {
    return res.status(400).json({ error: 'Required fields: first_name, last_name, email' });
  }

  const query = `
    INSERT INTO owners (first_name, last_name, email, telephone, address, city)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [first_name, last_name, email, telephone, address, city], (err, result) => {
    if (err) {
      console.error('Error creating owner:', err);
      return res.status(500).json({ error: 'Error creating owner' });
    }
    res.status(201).json({ id: result.insertId, message: 'Owner created successfully' });
  });
};

// Update an owner
const updateOwner = (req, res) => {
  const db = req.db;
  const ownerId = req.params.id;
  const { first_name, last_name, email, telephone, address, city } = req.body;

  const query = `
    UPDATE owners
    SET first_name = ?, last_name = ?, email = ?, telephone = ?, address = ?, city = ?
    WHERE id = ?
  `;

  db.query(query, [first_name, last_name, email, telephone, address, city, ownerId], (err, result) => {
    if (err) {
      console.error('Error updating owner:', err);
      return res.status(500).json({ error: 'Error updating owner' });
    }
    res.status(200).json({ message: 'Owner updated successfully' });
  });
};

// Delete an owner
const deleteOwner = (req, res) => {
  const db = req.db;
  const ownerId = req.params.id;

  db.query('DELETE FROM pets WHERE owner_id = ?', [ownerId], (err) => {
    if (err) {
      console.error('Error deleting related pets:', err);
      return res.status(500).json({ error: 'Error deleting related pets' });
    }

    db.query('DELETE FROM owners WHERE id = ?', [ownerId], (err, result) => {
      if (err) {
        console.error('Error deleting owner:', err);
        return res.status(500).json({ error: 'Error deleting owner' });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Owner not found' });
      }

      res.status(200).json({ message: 'Owner deleted successfully' });
    });
  });
};

export default {
  getAllOwners,
  getOwnerById,
  getOwnerPets,
  createOwner,
  updateOwner,
  deleteOwner
};
