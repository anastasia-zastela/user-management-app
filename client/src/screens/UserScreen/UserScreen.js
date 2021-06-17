import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useLocation, useParams } from 'react-router';
import ProfilesScreen from '../ProfilesScreen/ProfilesScreen';


const UserScreen = () => {
    const { id } = useParams();
    
    const search = useLocation().search;
    const username = new URLSearchParams(search).get('username');
    const email = new URLSearchParams(search).get('email');
    const isAdmin = new URLSearchParams(search).get('isAdmin');

    return (
        <React.Fragment>
            <Row>
                <Col>
                <h1>{username}</h1> 
                <p>{email}</p>
                <p>{isAdmin === "admin" ? "admin" : "user"}</p>
                </Col>
            </Row>
            <ProfilesScreen userId={id}/>
        </React.Fragment>
    )
}

export default UserScreen;
