import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createProfile } from '../../actions/profileActions';
import { validateProfileInfo } from '../../helpers/validateInfo';
import Loader from '../Loader/Loader';
import Message from '../Message/Message';

const CreateProfileForm = () => {
    const [name, setName] = useState('');
    const [gender, setGender] = useState("female");
    const [birthdate, setBirthdate] = useState(null);
    const [city, setCity] = useState('');

    const [nameError, setNameError] = useState('');
    const [birthdateError, setBirthdateError] = useState('');
    const [cityError, setCityError] = useState('');

    const dispatch = useDispatch();

    const profileCreate = useSelector(state => state.profileCreate);
    const { success, error, loading } = profileCreate;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    let formValidationErrors = {};

    const isObjEmpty = (obj) => {
        return Object.keys(obj).length === 0;
    }

    const submitHandler = (e) => {
        e.preventDefault();

        formValidationErrors = validateProfileInfo({name, birthdate, city});

        if(!isObjEmpty(formValidationErrors)) {
            setNameError(formValidationErrors.name);
            setBirthdateError(formValidationErrors.birthdate);
            setCityError(formValidationErrors.city);
            return;
        }

        setNameError('');
        setBirthdateError('');
        setCityError('');

        dispatch(createProfile(name, gender, birthdate, city, userInfo.data.id));

        setName('')
        setGender("female")
        setBirthdate('')
        setCity('')
    }

    return (
        <Row>
            <Col md={8}>
            {error &&
                (<Message variant='danger'>
                    {error}
                </Message>)}
            {success && (<Message variant='success'>
                Profile created
            </Message>)}
            {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter name'
                            onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                        {nameError &&
                    (<Message variant='danger'>
                        {nameError}
                    </Message>)}
                    <Form.Group controlId='gender'>
                        <Form.Label>Gender</Form.Label>
                        <Form.Check
                            checked={gender === "female"}
                            value="female"
                            type="radio"
                            label="female"
                            name="gender"
                            id="radio1"
                            onChange={(e) => setGender(e.target.value)}
                        /> 
                        <Form.Check
                            checked={gender === "male"}
                            value="male"
                            type="radio"
                            label="male"
                            name="gender"
                            id="radio2"
                            onChange={(e) => setGender(e.target.value)}
                        /> 
                        </Form.Group>
                    <Form.Group controlId='birthdate'>
                        <Form.Label>Birthdate</Form.Label>
                        <Form.Control
                            type='date'
                            placeholder='yyyy-mm-dd'
                            onChange={(e) => setBirthdate(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                        {birthdateError &&
                    (<Message variant='danger'>
                        {birthdateError}
                    </Message>)}
                    <Form.Group controlId='city'>
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter city'
                            onChange={(e) => setCity(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                        {cityError &&
                    (<Message variant='danger'>
                        {cityError}
                    </Message>)}

                    <Button type='submit' variant='primary'>
                        Create
                    </Button>
                </Form>
            </Col>
        </Row>
    )
};

export default CreateProfileForm;
