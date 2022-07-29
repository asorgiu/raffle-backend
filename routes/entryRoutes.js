const express = require('express');
const entryController = require('../controllers/entryController');

const router = express.Router();

// routes are scoped to /api/entries
router.get('/', entryController.entry_index);
router.get('/create', entryController.entry_create_get);
router.get('/:id', entryController.entry_details);
router.post('/', entryController.entry_create_post);
router.put('/:id', entryController.entry_update);
router.delete('/:id', entryController.entry_delete);

module.exports = router;
