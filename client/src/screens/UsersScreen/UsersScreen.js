import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

import User from '../../components/User/User';
import Message from '../../components/Message/Message';
import Loader from '../../components/Loader/Loader';
import { listUsers } from '../../actions/userListActions';
import { useHistory } from 'react-router';
import { allProfilesListReducer } from '../../actions/profilesListActions';


const UsersScreen = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const usersList = useSelector(state => state.usersList);
    const { loading, error, users } = usersList;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const allProfilesList = useSelector(state => state.allProfilesList);
    const { profiles } = allProfilesList;

    useEffect(() => {
        if(!userInfo.data.isAdmin) {
            history.push('/');
            return;
        }
        if(!userInfo) {
            history.push('/login');
            return;
        }
        if(!allProfilesList.profiles.length) {
            dispatch(allProfilesListReducer())
        }
        dispatch(listUsers())
    }, [dispatch, userInfo.data.isAdmin, history, userInfo, allProfilesList.profiles.length]);

    return (
        <React.Fragment>
            <h1>Users: </h1>
            {loading ? (<Loader />) : error ? (<Message variant="danger">{error}</Message>) : (<Row>
                {users.filter(u => u.id !== userInfo.data.id).map(user => (
                    <Col key={user.id} sm={12} md={6} lg={4} xl={3}>
                        <User user={user} profilesCount={profiles.filter(profile => profile.userId === user.id).length} />
                    </Col>
                ))}
            </Row>)
            }
        </React.Fragment>
    )
};

export default UsersScreen;
