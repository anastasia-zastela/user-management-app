const validateUserInfo = ({username, email, password = '1234567'}) => {
    let errors = {};
  
    if (!username.trim()) {
      errors.username = 'Username required';
    }
    else if (!/^[A-Za-z]+/.test(username.trim())) {
      errors.username = 'Enter a valid name';
    }
  
    if (!email) {
      errors.email = 'Email required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email address is invalid';
    }
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password needs to be 6 characters or more';
    }
    return errors;
}

const validateProfileInfo = ({name, birthdate, city}) => {
    let errors = {};
  
    if (!name.trim()) {
      errors.name = 'Username required';
    }
    else if (!/^[A-Za-z]+/.test(name.trim())) {
      errors.name = 'Enter a valid name';
    }
  
    if (!birthdate) {
      errors.birthdate = 'Date required';
    }

    if (!city) {
      errors.city = 'City is required';
    }

    return errors;
}

export {
    validateUserInfo,
    validateProfileInfo
}