
import express from 'express';
import appointmentsController from '../controllers/appointmentsController.js';

const router = express.Router();

// GET all appointments
router.get('/', appointmentsController.getAllAppointments);

// GET appointment statistics (counts, etc.)
router.get('/stats', appointmentsController.getAppointmentStats);

// GET a single appointment by ID
router.get('/:id', appointmentsController.getAppointmentById);

// POST a new appointment
router.post('/', appointmentsController.createAppointment);

// PUT/UPDATE an appointment
router.put('/:id', appointmentsController.updateAppointment);

// DELETE an appointment
router.delete('/:id', appointmentsController.deleteAppointment);

export default router;
