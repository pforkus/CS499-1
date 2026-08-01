const Users = require('../models/users');
const bcrypt = require('bcrypt');
const { signToken } = require('../utils/jwt');
const SALT_ROUNDS = 10;

const createUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Basic presence check
        if(!username || !password) {
            return res.status(400).json({ error: "Username and password are required."});
        }

        // Reject duplicates
        const existingUser = await Users.findOne({ username });
        if(existingUser) {
            return res.status(409).json({ error: "Username already exists."});
        }

        // Hash password and store the hashed result
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

        // Create user
        const newUser = await Users.create({ username, password: hashedPassword});

        // Signs a JWT to authenticate user
        const token = signToken(newUser);

        // Remove password from response
        const { password: _, ...userResponse } = newUser.toObject();
        res.status(201).json({ ...userResponse, token} );
    } catch (err) {
        res.status(500).json({ error: err.message });

    }
};
// Login
const login = async (req, res) => {
    try{
        const { username, password } = req.body;

        // Basic presence check
        if(!username || !password) {
            return res.status(400).json({ error: "Username and password are required."});
        }
        
        // Search for matching username in database
        const user = await Users.findOne({ username });
        if(!user) {
            return res.status(401).json({error: "Invalid username or password"});
        }

        // Compares hashed supplied password with stored hash
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(401).json({error: "Invalid username or password"});
        }

        // Sign a JWT for user
        const token = signToken(user);

        // Remove password from response
        const { password: _, ...userResponse } = user.toObject();
        res.status(200).json({ ...userResponse, token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Health check
const health = (req, res) => {
    res.sendStatus(200);
};



module.exports = {
    createUser,
    login,
    health
};