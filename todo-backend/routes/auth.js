const { Router } = require('express');
const router = Router();
const { readJsonFile, writeJsonFile } = require('../utils/fileHelper');

router.post('/sign-up', (req, res) => {
  try {
    const { name, email, password } = req.body;
    const usersData = readJsonFile('users.json');
    
    const emailExists = usersData.users.some(user => user.email === email);
    if (emailExists) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    
    usersData.users.push({ name, email, password });
    writeJsonFile('users.json', usersData);
    
    res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;
    const usersData = readJsonFile('users.json');
    
    const user = usersData.users.find(user => 
      user.email === email && user.password === password
    );
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    const { password: _, ...userWithoutPassword } = user;
    res.status(200).json({ message: 'Login successful', user: userWithoutPassword });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

module.exports = router;