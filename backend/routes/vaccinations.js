
import express from 'express';
import { authenticateUser } from '../middleware/auth.js';
import { 
  getAllVaccinations, 
  getVaccinationById, 
  createVaccination, 
  updateVaccination, 
  deleteVaccination 
} from '../controllers/vaccinationsController.js';

const router = express.Router();

// Get all vaccinations - no authentication required for now to help with debugging
router.get('/', getAllVaccinations);

// Get a single vaccination by ID
router.get('/:id', getVaccinationById);

// Post a new vaccination
router.post('/', createVaccination);

// Update a vaccination
router.put('/:id', updateVaccination);

// Delete a vaccination
router.delete('/:id', deleteVaccination);

export default router;
