# User Management CRUD App

## Overview

**User management CRUD** app written on **PERN** Stack(**PostgreSQL**, **Express**, **React** and **Node.js**).

Each user is able to create an account and log in.
Each user has name, email, password. Each user can have admin rights or not. Each user is able to create 1 or more profiles.

A profile has fields: name, gender, birthdate, city. Each user can log out whenever he wants and the session wil not be interrupted if the user logs in at least
once a month.

User (without admin rights) can view only his own profiles (list and details), edit, delete. User (with admin rights) can view his own profiles, other users and their
profiles (separate page), edit / delete users and / or their profiles, give to another user admin rights, see a dashboard page with analytics(how many users are
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

```javascript
db.users.hasMany(db.profiles, { as: 'profiles' });
db.profiles.belongsTo(db.users, {
  foreignKey: 'userId',
  as: 'userOwnerId',
});
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

Passwords in db are stored in encrypted form(**bcrypt** lib hashSync() function). When user authenticates bcrypt compareSync() function checks if passwords match.

#### Stay login in implementation

When user authenticates, user data and user token are stored in localStorage. When page reloads or user closes the window, data from localStorage is stored in
**Redux store**.

#### Tests

Unit tests for frontend side written with **Enzyme** to test each component.

#### Docker

Dockerfile written for backend, frontend and db, docker-compose.yml connects it together.

#### Screens

Sign In
<img width="1429" alt="Screenshot 2021-06-18 at 14 53 05" src="https://user-images.githubusercontent.com/77297643/122557364-59a15c00-d045-11eb-825e-ed1c7e271344.png">
Sign Up
<img width="1430" alt="Screenshot 2021-06-18 at 14 53 12" src="https://user-images.githubusercontent.com/77297643/122557359-5908c580-d045-11eb-8ed1-35e97e5e08a5.png">
Profiles Screen (for user without admin rights)
<img width="1414" alt="Screenshot 2021-06-18 at 14 53 34" src="https://user-images.githubusercontent.com/77297643/122557355-58702f00-d045-11eb-813c-fad95d719006.png">
Profiles Screen (for user with admin rights)
<img width="1428" alt="Screenshot 2021-06-18 at 14 55 12" src="https://user-images.githubusercontent.com/77297643/122557309-4a221300-d045-11eb-8efd-765471310214.png">
Create New Profile
<img width="1408" alt="Screenshot 2021-06-18 at 14 53 43" src="https://user-images.githubusercontent.com/77297643/122557351-56a66b80-d045-11eb-9c08-112b4a6b922f.png">
Edit An Existing Profile
<img width="1416" alt="Screenshot 2021-06-18 at 15 02 35" src="https://user-images.githubusercontent.com/77297643/122558013-3a56fe80-d046-11eb-8cd1-370d78f93311.png">
Delete Confirmation Modal
<img width="1427" alt="Screenshot 2021-06-18 at 14 53 55" src="https://user-images.githubusercontent.com/77297643/122557344-55753e80-d045-11eb-8e49-d04d0c9e0d86.png">
Dashboard Screen
<img width="1435" alt="Screenshot 2021-06-18 at 14 54 23" src="https://user-images.githubusercontent.com/77297643/122557335-54441180-d045-11eb-8308-b9c522c5bfc1.png">
Users Screen
<img width="1420" alt="Screenshot 2021-06-18 at 14 54 33" src="https://user-images.githubusercontent.com/77297643/122557328-527a4e00-d045-11eb-88d3-f2a1b8657c44.png">
Edit User Info
<img width="1418" alt="Screenshot 2021-06-18 at 14 54 44" src="https://user-images.githubusercontent.com/77297643/122557322-4f7f5d80-d045-11eb-9de5-8dbed36e3ad9.png">
