
// Appointments controller

// Get all appointments
const getAllAppointments = (req, res) => {
  const db = req.db;
  
  db.query('SELECT * FROM appointments ORDER BY date ASC, time ASC', (err, results) => {
    if (err) {
      console.error('Error fetching appointments:', err);
      return res.status(500).json({ error: 'Error fetching appointments: ' + err.message });
    }
    
    res.status(200).json(results);
  });
};

// Get appointment statistics
const getAppointmentStats = (req, res) => {
  const db = req.db;
  
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];
  
  // Query for today's appointments count
  const todayQuery = 'SELECT COUNT(*) as todayCount FROM appointments WHERE date = ?';
  
  // Query for upcoming appointments (next 7 days)
  const upcomingQuery = `
    SELECT COUNT(*) as upcomingCount 
    FROM appointments 
    WHERE date BETWEEN ? AND DATE_ADD(?, INTERVAL 7 DAY)
  `;
  
  // Query for status counts
  const statusQuery = `
    SELECT status, COUNT(*) as count 
    FROM appointments 
    GROUP BY status
  `;
  
  // Execute today's count query
  db.query(todayQuery, [today], (err, todayResults) => {
    if (err) {
      console.error('Error fetching today\'s appointment count:', err);
      return res.status(500).json({ error: 'Error fetching appointment stats: ' + err.message });
    }
    
    // Execute upcoming count query
    db.query(upcomingQuery, [today, today], (err, upcomingResults) => {
      if (err) {
        console.error('Error fetching upcoming appointment count:', err);
        return res.status(500).json({ error: 'Error fetching appointment stats: ' + err.message });
      }
      
      // Execute status counts query
      db.query(statusQuery, (err, statusResults) => {
        if (err) {
          console.error('Error fetching appointment status counts:', err);
          return res.status(500).json({ error: 'Error fetching appointment stats: ' + err.message });
        }
        
        // Transform status results into an object
        const statusCounts = {};
        statusResults.forEach(status => {
          statusCounts[status.status] = status.count;
        });
        
        // Return all stats
        res.status(200).json({
          todayCount: todayResults[0].todayCount,
          upcomingCount: upcomingResults[0].upcomingCount,
          statusCounts: statusCounts
        });
      });
    });
  });
};

// Get a single appointment by ID
const getAppointmentById = (req, res) => {
  const db = req.db;
  const appointmentId = req.params.id;
  
  db.query('SELECT * FROM appointments WHERE id = ?', [appointmentId], (err, results) => {
    if (err) {
      console.error('Error fetching appointment:', err);
      return res.status(500).json({ error: 'Error fetching appointment: ' + err.message });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    
    res.status(200).json(results[0]);
  });
};

// Create a new appointment
const createAppointment = (req, res) => {
  const db = req.db;
  const { 
    pet_id, 
    date, 
    time, 
    reason, 
    notes, 
    status = 'pending',
    doctor 
  } = req.body;
  
  const userId = req.user?.id || null; // Get user ID from JWT token if available
  
  if (!pet_id || !date || !time) {
    return res.status(400).json({ error: 'Required fields: pet_id, date, time' });
  }
  
  const query = `INSERT INTO appointments 
                (pet_id, date, time, reason, notes, status, doctor, created_by) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  
  db.query(query, [pet_id, date, time, reason, notes, status, doctor, userId], (err, result) => {
    if (err) {
      console.error('Error creating appointment:', err);
      return res.status(500).json({ error: 'Error creating appointment: ' + err.message });
    }
    
    // Return the newly created appointment data
    db.query('SELECT * FROM appointments WHERE id = ?', [result.insertId], (err, appointments) => {
      if (err || appointments.length === 0) {
        return res.status(201).json({ 
          id: result.insertId, 
          message: 'Appointment created successfully' 
        });
      }
      
      res.status(201).json({ 
        ...appointments[0],
        message: 'Appointment created successfully' 
      });
    });
  });
};

// Update an appointment
const updateAppointment = (req, res) => {
  const db = req.db;
  const appointmentId = req.params.id;
  const { 
    pet_id, 
    date, 
    time, 
    reason, 
    notes, 
    status,
    doctor 
  } = req.body;
  
  // Build the query based on provided fields
  let query = 'UPDATE appointments SET ';
  const values = [];
  const updates = [];
  
  if (pet_id !== undefined) {
    updates.push('pet_id = ?');
    values.push(pet_id);
  }
  
  if (date) {
    updates.push('date = ?');
    values.push(date);
  }
  
  if (time) {
    updates.push('time = ?');
    values.push(time);
  }
  
  if (reason) {
    updates.push('reason = ?');
    values.push(reason);
  }
  
  if (notes !== undefined) {
    updates.push('notes = ?');
    values.push(notes);
  }
  
  if (status) {
    updates.push('status = ?');
    values.push(status);
  }
  
  if (doctor) {
    updates.push('doctor = ?');
    values.push(doctor);
  }
  
  // Add updated timestamp
  updates.push('updated_at = CURRENT_TIMESTAMP');
  
  if (updates.length === 0) {
    return res.status(400).json({ error: 'No fields to update' });
  }
  
  query += updates.join(', ') + ' WHERE id = ?';
  values.push(appointmentId);
  
  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error updating appointment:', err);
      return res.status(500).json({ error: 'Error updating appointment: ' + err.message });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    
    // Return the updated appointment data
    db.query('SELECT * FROM appointments WHERE id = ?', [appointmentId], (err, appointments) => {
      if (err || appointments.length === 0) {
        return res.status(200).json({ 
          message: 'Appointment updated successfully' 
        });
      }
      
      res.status(200).json({ 
        ...appointments[0],
        message: 'Appointment updated successfully' 
      });
    });
  });
};

// Delete an appointment
const deleteAppointment = (req, res) => {
  const db = req.db;
  const appointmentId = req.params.id;
  
  db.query('DELETE FROM appointments WHERE id = ?', [appointmentId], (err, result) => {
    if (err) {
      console.error('Error deleting appointment:', err);
      return res.status(500).json({ error: 'Error deleting appointment: ' + err.message });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    
    res.status(200).json({ 
      id: appointmentId,
      message: 'Appointment deleted successfully'
    });
  });
};

export default {
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getAppointmentStats
};
