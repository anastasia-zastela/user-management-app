import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Card, Button, Modal } from 'react-bootstrap';
import UpdateUserInfoForm from '../UpdateUserInfoForm/UpdateUserInfoForm';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser } from '../../actions/userActions';
import { deleteProfile } from '../../actions/profileActions';

const User = ({ user, profilesCount }) => {
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);

    const history = useHistory();

    const refreshPage = ()=>{
        window.location.reload();
    }

    const handleCloseUpdateModal = () => {
        setShowUpdateModal(false);
        refreshPage();
    }
    const handleShowUpdateModal = () => setShowUpdateModal(true);

    const handleCloseDeleteConfirmationModal = () => setShowDeleteConfirmationModal(false);
    const handleShowDeleteConfirmationModal = () => setShowDeleteConfirmationModal(true);

    const allProfilesList = useSelector(state => state.allProfilesList);
    const { profiles } = allProfilesList;

    const dispatch = useDispatch();

    const deleteRelatedProfiles = (userId) => {
      const arrOfIds = profiles.filter(profile => profile.userId === userId).map(pr => pr.id);
      
      arrOfIds.forEach(profileId => dispatch(deleteProfile(profileId)));
    }
      
    const handleDeleteUser = (userId) => {
        dispatch(deleteUser(userId));
        deleteRelatedProfiles(userId)
        refreshPage();
    }

    const handleRedirect = (userId, username, email, isAdmin) => {     
        history.push(`/users/${userId}?username=${username}&email=${email}&isAdmin=${isAdmin}`)
    }

    const updateModal = (
        <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
        <Modal.Body>
        <UpdateUserInfoForm
            userId={user.id}
            userUsername={user.username}
            userEmail = {user.email}
            userIsAdmin = {user.isAdmin}
            />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUpdateModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );

    const deleteConfirmationModal = (
        <Modal show={showDeleteConfirmationModal} onHide={handleCloseDeleteConfirmationModal}>
        <Modal.Body>
            Are you sure?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => handleDeleteUser(user.id)}>
            Yes, delete
          </Button>
          <Button variant="secondary" onClick={handleCloseDeleteConfirmationModal}>
            No, cancel
          </Button>
        </Modal.Footer>
      </Modal>
    );

    return (
        <React.Fragment>
            {updateModal}
            {deleteConfirmationModal}
            <Card className="my-3 p-3 rounded">
                <Card.Body>
                    <Card.Title>
                        <strong>{user.username}</strong>
                    </Card.Title>
                    <Card.Text>{user.email}</Card.Text>
                    <Card.Text>Profiles: {profilesCount}</Card.Text>

                    <Card.Text>
                        <Button variant="link" onClick={() => handleRedirect(user.id, user.username, user.email, user.isAdmin)}>View Profiles</Button>
                    </Card.Text>
                    <Button variant="outline-secondary" onClick={handleShowUpdateModal}>Edit</Button>
                    <Button variant="outline-danger" onClick={handleShowDeleteConfirmationModal}>Delete</Button>
                </Card.Body>
            </Card>
        </React.Fragment>
    )
};

export default User;
