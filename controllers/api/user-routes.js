const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

//GET all users /api/users
router.get("/", (req, res) => {
  // Using User model to find all users
  User.findAll({
    // exclude users password from get request
    attributes: { exclude: ["password"] },
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//GET users by id /api/users/1
router.get("/:id", (req, res) => {
  //Using User model to find user by id
  User.findOne({
    attributes: { exclude: ["password"] },
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Post,
        attributes: ["id", "title", "post_text", "created_at"],
      },
      {
        model: Comment,
        attributes: ["id", "comment_text", "created_at"],
        include: {
          model: Post,
          attributes: ["title"],
        },
      },
    ],
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//POST create user /api/users
router.post("/", (req, res) => {
  //Using User model to create a new user
  // expects { username: 'example', email: 'example@example.com', password: 'example'}
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
    .then(dbUserData => {
      req.session.save(() => {
        //declaring session variables
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;
        
        res.json(dbUserData);
      })
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    })
});

//post request for user login
router.post("/login", (req, res) => {
  //expects {email: exmaple@example.com, password: 'example}
  //querying user table to find a specific user
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((dbUserData) => {
    // checks to see if email is in table if not send error message
    if (!dbUserData) {
      res.status(400).json({ message: "No user with that email address!" });
      return;
    }
    //Verify user
    //checkpassword method returns a boolean
    // checking if password matches if not send error message
    const validPassword = dbUserData.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password!" });
      return;
    }

    //creating session for log ins
    req.session.save(() => {
      //declaring session variables
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;

      res.json({ user: dbUserData, message: 'You are now logged in!' });
    });
  });
});

//PUT update user info by id /api/users/1
router.put("/:id", (req, res) => {
  //Using User model to update user info with user id in request
  // expects { username: 'example', email: 'example@example.com', password: 'example'}
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData[0]) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//DELETE delete user by id  /api/users/1
router.delete("/:id", (req, res) => {
  // Using User model to delete user by id
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user foudn with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/logout', (req, res) => {
  if(req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
