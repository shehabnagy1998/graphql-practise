const User = require('../../models/user'),
    { transformUser } = require('../../helpers/transform'),
    jwt = require('jsonwebtoken');

const userResolver = {
    users: async _ => {
        try {
            const users = await User.find();
            return users.map(user => {
                return transformUser(user)
            })
        }
        catch (err) {
            console.log(err)
        }
    },

    createUser: async (args) => {
        try {
            const user = await User.findOne({ email: args.userInput.email });
            if (user) {
                throw new Error('email already exists');
            }
            let userInfo = new User({
                email: args.userInput.email,
                password: args.userInput.password,
                createdEvents: []
            });
            const savedUser = await userInfo.save();
            return { ...savedUser._doc, password: null }
        } catch (err) { console.log(err) }
    },

    deleteUser: async (args) => {
        try {
            const user = await User.findByIdAndDelete(args.id);
            return transformUser(user)
        } catch (err) { console.log(err) }
    },

    login: async (args) => {
        const user = await User.findOne({ email: args.userInput.email });
        if (!user) { throw new Error('email is not exist') };
        if (args.userInput.password != user.password) { throw new Error('password is not correct') };
        const token = await jwt.sign({ userId: user.id, email: user.email }, 'mysuperstring',
            { expiresIn: '2h' }
        );
        return {
            userId: user.id,
            token,
            expireTime: 2
        }
    }
}

module.exports = userResolver;