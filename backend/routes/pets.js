import express from 'express';
import petsController from '../controllers/petsController.js';

const router = express.Router();

// GET all pet types (place this route before the dynamic :id route)
router.get('/pet-types', petsController.getPetTypes);

// GET all pets
router.get('/', petsController.getAllPets);

// GET a single pet by ID
router.get('/:id', petsController.getPetById);

// POST a new pet
router.post('/', petsController.createPet);

// PUT/UPDATE a pet
router.put('/:id', petsController.updatePet);

// DELETE a pet
router.delete('/:id', petsController.deletePet);

export default router;
