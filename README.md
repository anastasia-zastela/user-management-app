# User Management CRUD App

## Overview

User management CRUD app written on PERN Stack(PostgreSQL, Express, React and Node.js). Each user is able to create an account and log in.
Each user has name, email, password. Each user can have admin rights or not. Each user is able to create 1 or more profiles.

A profile has fields: name, gender, birthdate, city. Each user can log out whenever he wants and the session wil not be interrupted if the user logs in at least
once a month.

User (without admin rights) can view only your profiles (list and details), edit, delete. User (with admin rights) can view his own profiles, other users and their
profiles (separate page), edit / delete users and / or their profiles, give another user admin rights, see a dashboard page with analytics(how many users are
currently in the system, how many profiles are currently in total, how many profiles are over 18 years old).

## Technical details

#### Backend:

**Node JS**,
**PostgreSQL**(**Sequelize** ORM to communicate with DB),
**Express**,
Rest API

#### Frontend:

**React JS**,
**Redux**,
UI - **react-bootstrap** components with **Lux** free theme from https://bootswatch.com/,
Single page application (Web)

#### DB models

```javascript
const User = sequelize.define('user', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
  },
});

User.beforeCreate(async (user) => {
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(user.password, salt);
});

User.prototype.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};
```

```javascript
const Profile = sequelize.define("profile", {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      gender: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      birthdate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });

    return Profile;
  };
```

#### Validation

Validation of forms provided by both **frondend**(**client/helpers/validateInfo.js**) and **backend** sides(**app/middleware/validateProfileForm.js**,
**app/middleware/validateUserForm.js**,
**app/middleware/validateUserFormToUpdate.js**, **app/middleware/validateSignIn.js**).

#### Tokens

Tokens are made with **JWT** lib that creates a new one on the backend side each time user authenticates to a system. Token is stored in localStorage, and then
initially is stored in Redux store.

#### Protected routes

Routes are made proteced with middleware that verifies **JWT** token sent in Header of request(**app/middleware/verifyToken.js**);

#### Password encryption

Passwords in db are stored in encrypted form(**bcrypt** lib hashSync() function). When user authenticates bcrypt compareSync() function check if passwords match.

#### Stay login in implementation

When user authenticates, user data and user token are stored in localStorage. When page reloads or user closes the window, data from localStorage is stored in
**Redux store**.

#### Screens
