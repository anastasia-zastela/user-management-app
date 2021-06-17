const db = require("./models");
const User = db.users;
const Profile = db.profiles;

const users = [
    {
        username: 'Kevin',
        email: 'kevin@example.com',
        password: "1234567",
        isAdmin: false
    },
    {
        username: 'Diana',
        email: 'diana@example.com',
        password: "1234567",
        isAdmin: false
    },
    {
        username: 'Marta',
        email: 'marta@example.com',
        password: "1234567",
        isAdmin: false
    },
    {
        username: 'Admin',
        email: 'admin@example.com',
        password: "1234567",
        isAdmin: true
    },
    {
        username: 'Den',
        email: 'den@example.com',
        password: "1234567",
        isAdmin: false
    },
    {
        username: 'Kevin',
        email: 'kevin@example.com',
        password: "1234567",
        isAdmin: false
    }
];

const profiles = [
    {
        name: 'Danylo',
        gender: 'male',
        birthdate: "1990/02/02",
        city: 'Kyiv',
        userId: 1
    },
    {
        name: 'Marta',
        gender: 'male',
        birthdate: "1990/05/01",
        city: 'Kherson',
        userId: 1
    },
    {
        name: 'Jane',
        gender: 'female',
        birthdate: "2001/05/02",
        city: 'Praga',
        userId: 1
    },
    {
        name: 'Sergii',
        gender: 'male',
        birthdate: "1996/05/03",
        city: 'Dublin',
        userId: 3
    },
    {
        name: 'David',
        gender: 'male',
        birthdate: "1986/05/01",
        city: 'Dublin',
        userId: 3
    },
    {
        name: 'Sergii',
        gender: 'male',
        birthdate: "2000/05/03",
        city: 'Dublin',
        userId: 3
    },
    {
        name: 'Max',
        gender: 'male',
        birthdate: "1981/05/03",
        city: 'Dublin',
        userId: 3
    }
];

const insertUser = (userInfo) => {
    User.sync().then(() => {
        User.create({
            username: userInfo.username,
            email: userInfo.email,
            password: userInfo.password,
            isAdmin: userInfo.isAdmin
        });
      });
};

const insertProfile = (profileInfo) => {
    Profile.sync().then(() => {
        Profile.create({
            name: profileInfo.name,
            gender: profileInfo.gender,
            birthdate: profileInfo.birthdate,
            city: profileInfo.city,
            userId: profileInfo.userId
        });
      });
};


users.forEach(u => insertUser(u));
console.log("Users inserted successfully!");

profiles.forEach(pr => insertProfile(pr));
console.log("Profiles inserted successfully!");