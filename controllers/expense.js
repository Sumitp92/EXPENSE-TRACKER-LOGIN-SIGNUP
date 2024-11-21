const User = require('../model/expenses'); 
const AddUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        const newUser = await User.create({
            name,
            email,
            password 
        });

        res.status(201).json({ success: true, message: 'User signed up successfully', user: newUser });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Error occurred during signup' });
    }
};
const LoginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(400).json({ success: false, message: 'User not found' });
        }
        if (user.password !== password) {
            return res.status(400).json({ success: false, message: 'Incorrect password' });
        }
        res.status(200).json({
            success: true,
            message: 'Login successful',
            user: user 
        });
    } catch (error) {
        console.log('Error during login:', error);
        res.status(500).json({ success: false, message: 'Error occurred during login' });
    }
};


module.exports = { AddUser, LoginUser };
