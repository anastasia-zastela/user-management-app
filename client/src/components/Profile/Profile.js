import React, { useState } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import UpdateProfileInfoForm from '../UpdateProfileInfoForm/UpdateProfileInfoForm';
import { deleteProfile } from '../../actions/profileActions';
import { useDispatch } from 'react-redux';

const Profile = ({ profile }) => {
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);

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

    const dispatch = useDispatch();

    const handleDeleteProfile = (profileId) => {
        dispatch(deleteProfile(profileId));
        refreshPage();
    }

    const formattedDate = profile.birthdate.slice(0, 10);

    const updateModal = (
        <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
        <Modal.Body>
        <UpdateProfileInfoForm 
            profileId={profile.id}
            profileName={profile.name}
            profileGender = {profile.gender}
            profileBirthdate = {formattedDate}
            profileCity = {profile.city}
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
          <Button variant="danger" onClick={() => handleDeleteProfile(profile.id)}>
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
                    <strong>{profile.name}</strong>
                </Card.Title>
                <Card.Text>{profile.gender}</Card.Text>
                <Card.Text>{formattedDate}</Card.Text>
                <Card.Text>{profile.city}</Card.Text>

                <Button variant="outline-secondary" onClick={handleShowUpdateModal}>Edit</Button>
                <Button variant="outline-danger" onClick={handleShowDeleteConfirmationModal}>Delete</Button>
            </Card.Body>
        </Card>
        </React.Fragment>
    )
};

export default Profile;
