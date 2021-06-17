import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { userUpdate } from '../../actions/userActions';
import { validateUserInfo } from '../../helpers/validateInfo';
import Loader from '../Loader/Loader';
import Message from '../Message/Message';

const UpdateUserInfoForm = ({ userId, userUsername, userEmail, userIsAdmin }) => {
    const [username, setUsername] = useState(userUsername);
    const [email, setEmail] = useState(userEmail);

    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');

    const startedStatus = userIsAdmin ? "admin" : "user";
    const [status, setStatus] = useState(startedStatus);

    const dispatch = useDispatch();

    const userUpdateState = useSelector(state => state.userUpdate);
    const { success, error, loading } = userUpdateState;

    let formValidationErrors = {};

    const isObjEmpty = (obj) => {
        return Object.keys(obj).length === 0;
    }

    const submitHandler = (e) => {
        e.preventDefault();

        formValidationErrors = validateUserInfo({username, email});

        if(!isObjEmpty(formValidationErrors)) {
            setUsernameError(formValidationErrors.username);
            setEmailError(formValidationErrors.email);
            return;
        }

        setUsernameError('');
        setEmailError('');

        const isAdmin = status === "user" ? false : true;

        dispatch(userUpdate({userId, username, email, isAdmin}))

    }

    return (
        <Row>
            <Col md={8}>
            {error &&
                (<Message variant='danger'>
                    {error}
                </Message>)}
            {success && (<Message variant='success'>
                User Info Updated
            </Message>)}
            {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='username'>
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            value={username}
                            type='text'
                            placeholder='Enter username'
                            onChange={(e) => setUsername(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                        {usernameError &&
                    (<Message variant='danger'>
                        {usernameError}
                    </Message>)}
                    <Form.Group controlId='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            value={email}
                            type='email'
                            placeholder='Enter email'
                            onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                        {emailError &&
                    (<Message variant='danger'>
                        {emailError}
                    </Message>)}
                    <Form.Group controlId='status'>
                        <Form.Label>Status</Form.Label>
                        <Form.Check
                            checked={status === "user"}
                            value="user"
                            type="radio"
                            label="user"
                            name="status"
                            id="radio1"
                            onChange={(e) => setStatus(e.target.value)}
                        /> 
                        <Form.Check
                            checked={status === "admin"}
                            value="admin"
                            type="radio"
                            label="admin"
                            name="status"
                            id="radio2"
                            onChange={(e) => setStatus(e.target.value)}
                        /> 
                        </Form.Group>
                    <Button type='submit' variant='primary'>
                        Update
                    </Button>
                </Form>
            </Col>
        </Row>
    )
};

export default UpdateUserInfoForm;
