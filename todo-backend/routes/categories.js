const { Router } = require('express');
const router = Router();
const { readJsonFile, writeJsonFile } = require('../utils/fileHelper');

router.get('/', (req, res) => {
  try {
    const data = readJsonFile('data.json');
    res.status(200).json({ categories: data.categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Server error while fetching categories' });
  }
});

router.post('/', (req, res) => {
  try {
    const { category } = req.body;
    
    if (!category || typeof category !== 'string' || category.trim() === '') {
      return res.status(400).json({ message: 'Invalid category name' });
    }

    const data = readJsonFile('data.json');
    
    if (data.categories.includes(category.trim())) {
      return res.status(400).json({ message: 'Category already exists' });
    }
    
    data.categories.push(category.trim());
    writeJsonFile('data.json', data);
    
    res.status(200).json({ 
      message: 'Category added successfully',
      categories: data.categories 
    });
  } catch (error) {
    console.error('Error adding category:', error);
    res.status(500).json({ message: 'Server error while adding category' });
  }
});

module.exports =  router;