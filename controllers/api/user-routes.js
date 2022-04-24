const router = require('express').Router();
const { User } = require('../../models');

//GET all users /api/users
router.get('/', (req, res) => {
    // Using User model to find all users
    User.findAll({
        // exclude users password from get request
        attributes: { exclude: ['password']}
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//GET users by id /api/users/1
router.get('/:id', (req, res) => {
    //Using User model to find user by id
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//POST create user /api/users
router.post('/', (req, res) => {
    //Using User model to create a new user
    // expects { username: 'example', email: 'example@example.com', password: 'example'}
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//PUT update user info by id /api/users/1
router.put('/:id', (req, res) => {
    //Using User model to update user info with user id in request
    // expects { username: 'example', email: 'example@example.com', password: 'example'}
    User.update(req.body, {
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData[0]) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//DELETE delete user by id  /api/users/1
router.delete('/:id', (req, res) => {
    // Using User model to delete user by id
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user foudn with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;