import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Card, Button, Modal } from 'react-bootstrap';

import Profile from '../../components/Profile/Profile';
import Message from '../../components/Message/Message';
import Loader from '../../components/Loader/Loader';
import { listProfilesByUserId } from '../../actions/profilesListActions';
import CreateProfileForm from '../../components/CreateProfileForm/CreateProfileForm';
import { useHistory } from 'react-router';


const ProfilesScreen = ({userId}) => {
    const [showCreateModal, setShowCreateModal] = useState(false);

    const history = useHistory();

    const refreshPage = () => {
        window.location.reload();
    }

    const handleShowCreateModal = () => setShowCreateModal(true);
    const handleCloseCreateModal = () => {
        setShowCreateModal(false);
        refreshPage();
    }

    const dispatch = useDispatch();
    
    const profilesList = useSelector(state => state.profilesList);
    const { loading, error, profiles } = profilesList;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if(!userInfo) {
            history.push('/login');
            return;
        }
        dispatch(listProfilesByUserId(userId ? userId : userInfo.data.id))
    }, [dispatch, userInfo, userId]);


    const createModal = (
        <Modal show={showCreateModal} onHide={handleCloseCreateModal}>
        <Modal.Body>
            <CreateProfileForm />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCreateModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );

    const createCard = (
        <Row>
            <Col key="profile-id-key" sm={12} md={6} lg={4} xl={3}>
                <Card className="my-3 p-3 rounded">
                    <Card.Body>
                        <Card.Title>
                            <strong>Create New Profile</strong>
                        </Card.Title>

                        <Button variant="outline-primary" onClick={handleShowCreateModal}>Create</Button>
                    </Card.Body>
                </Card>
            </Col>
            </Row>
    );

    return (
        <React.Fragment>
            {createModal}
            <h1>Profiles: </h1>
            {loading ? (<Loader />) : error ? (<Message variant="danger">{error}</Message>) : (<Row>
                {profiles.map(profile => (
                    <Col key={profile.id} sm={12} md={6} lg={4} xl={3}>
                        <Profile profile={profile} />
                    </Col>
                ))}
            </Row>)
            }
            {userId ? null : createCard}
        </React.Fragment>
    )
};

export default ProfilesScreen;
