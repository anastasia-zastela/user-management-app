import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message/Message';
import Loader from '../../components/Loader/Loader';
import FormContainer from '../../components/FormContainer/FormContainer';
import { register } from '../../actions/userActions';
import { validateUserInfo } from '../../helpers/validateInfo';

const RegisterScreen = ({location, history}) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [message, setMessage] = useState(null);

    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const dispatch = useDispatch();

    const userRegister = useSelector(state => state.userRegister);
    const { loading, error } = userRegister;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    let formValidationErrors = {};

    const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(() => {
        if (userInfo) {
            history.push(redirect);
        }
    }, [history, userInfo, redirect]);

    const isObjEmpty = (obj) => {
        return Object.keys(obj).length === 0;
    }

    const submitHandler = (e) => {
        e.preventDefault();

        formValidationErrors = validateUserInfo({username, email, password});

        if(!isObjEmpty(formValidationErrors)) {
            setUsernameError(formValidationErrors.username);
            setEmailError(formValidationErrors.email);
            setPasswordError(formValidationErrors.password);
            return;
        }

        if (password !== confirmPassword) {
            setMessage('Passswords do not match');
        }
        else {
            dispatch(register(username, email, isAdmin, password));
        }
    }


    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {message &&
                (<Message variant='danger'>
                    {message}
                </Message>)}
            {error &&
                (<Message variant='danger'>
                    {error}
                </Message>)}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='username'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='name'
                        placeholder='Enter name'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                {usernameError &&
                (<Message variant='danger'>
                    {usernameError}
                </Message>)}
                <Form.Group controlId='email'>
                    <Form.Label>Email Adress</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                {emailError &&
                (<Message variant='danger'>
                    {emailError}
                </Message>)}
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                {passwordError &&
                (<Message variant='danger'>
                    {passwordError}
                </Message>)}

                <Form.Group controlId="isAdmin">
                    <div key="default-checkbox" className="mb-3">
                        <Form.Check 
                            label="Is Admin"
                            checked={isAdmin}
                            onChange={(e) => setIsAdmin(e.target.checked)}
                        />
                    </div>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Register
                </Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    Have an Account? <Link to={'/login'}>
                        Log In
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    );
};

export default RegisterScreen;

