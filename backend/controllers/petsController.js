// Pets controller

// Get all pets
const getAllPets = (req, res) => {
  const db = req.db;

  db.query(`
    SELECT p.id, p.name, p.breed, p.date_of_birth, p.gender, o.first_name AS owner_name, o.email AS owner_email
    FROM pets p
    JOIN owners o ON p.owner_id = o.id
    ORDER BY p.created_at DESC
  `, (err, results) => {
    if (err) {
      console.error('Error fetching pets:', err);
      return res.status(500).json({ error: 'Error fetching pets' });
    }

    res.status(200).json(results);
  });
};

// Get a single pet by ID
const getPetById = (req, res) => {
  const db = req.db;
  const petId = req.params.id;

  // Ensure petId is a number
  if (isNaN(petId)) {
    return res.status(400).json({ error: 'Invalid pet ID' });
  }

  db.query(`
    SELECT p.*, CONCAT(o.first_name, ' ', o.last_name) as owner_name 
    FROM pets p
    JOIN owners o ON p.owner_id = o.id
    WHERE p.id = ?
  `, [petId], (err, results) => {
    if (err) {
      console.error('Error fetching pet:', err);
      return res.status(500).json({ error: 'Error fetching pet' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Pet not found' });
    }

    res.status(200).json(results[0]);
  });
};

// Create a new pet
const createPet = (req, res) => {
  const db = req.db;
  const { name, type_id, breed, date_of_birth, gender = 'unknown', owner_id, notes } = req.body;

  console.log("Received payload for creating pet:", req.body); // Debugging log

  if (!name || !type_id || !owner_id) {
    console.error("Validation failed: Missing required fields"); // Debugging log
    return res.status(400).json({ error: 'Required fields: name, type_id, owner_id' });
  }

  const query = `
    INSERT INTO pets (name, type_id, breed, date_of_birth, gender, owner_id, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [name, type_id, breed, date_of_birth, gender, owner_id, notes], (err, result) => {
    if (err) {
      console.error("Error executing query for creating pet:", err.message); // Debugging log
      return res.status(500).json({ error: 'Error creating pet' });
    }

    console.log("Pet created successfully with ID:", result.insertId); // Debugging log
    res.status(201).json({ id: result.insertId, message: 'Pet created successfully' });
  });
};

// Update a pet
const updatePet = (req, res) => {
  const db = req.db;
  const petId = req.params.id;
  const { name, type_id, breed, date_of_birth, gender, owner_id, notes } = req.body;

  const query = `
    UPDATE pets
    SET name = ?, type_id = ?, breed = ?, date_of_birth = ?, gender = ?, owner_id = ?, notes = ?
    WHERE id = ?
  `;

  db.query(query, [name, type_id, breed, date_of_birth, gender, owner_id, notes, petId], (err, result) => {
    if (err) {
      console.error('Error updating pet:', err);
      return res.status(500).json({ error: 'Error updating pet' });
    }
    res.status(200).json({ message: 'Pet updated successfully' });
  });
};

// Delete a pet
const deletePet = (req, res) => {
  const db = req.db;
  const petId = req.params.id;

  db.query('DELETE FROM pets WHERE id = ?', [petId], (err, result) => {
    if (err) {
      console.error('Error deleting pet:', err);
      return res.status(500).json({ error: 'Error deleting pet' });
    }
    res.status(200).json({ message: 'Pet deleted successfully' });
  });
};

// Get all pet types
const getPetTypes = (req, res) => {
  const db = req.db;

  console.log('Fetching pet types from database...');
  db.query('SELECT id, name FROM pet_types', (err, results) => {
    if (err) {
      console.error('Error executing query for pet types:', err.message); // Log detailed error
      return res.status(500).json({ error: 'Error fetching pet types. Please check the database.' });
    }

    if (!results || results.length === 0) {
      console.warn('No pet types found in the database.');
      return res.status(404).json({ error: 'No pet types found.' });
    }

    console.log('Pet types fetched successfully:', results); // Log the results
    res.status(200).json(results);
  });
};

export default {
  getAllPets,
  getPetById,
  createPet,
  updatePet,
  deletePet,
  getPetTypes
};
