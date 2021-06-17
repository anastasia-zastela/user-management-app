import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

import DashboardCard from '../../components/DashboardCard/DashboardCard';
import { listUsers } from '../../actions/userListActions';
import { allProfilesListReducer } from '../../actions/profilesListActions';
import { useHistory } from 'react-router';

const DashboardScreen = () => {
    const dispatch = useDispatch();
    const usersList = useSelector(state => state.usersList);
    const allProfilesList = useSelector(state => state.allProfilesList);

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const history = useHistory();

    const countUsers = () => {
        return usersList.users.length;
    };

    const countProfiles = () => {
        return allProfilesList.profiles.length;
    }

    const convertDateToAge = (date) => {
        const dateObj = new Date(date);
        const ageDifMs = Date.now() - dateObj.getTime();
        const ageDate = new Date(ageDifMs); 
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    const isAdult = (birthdate) => {
        console.log(birthdate)
        return convertDateToAge(birthdate) > 18 ? true : false;
    }

    useEffect(() => {
        if(!userInfo.data.isAdmin) {
            history.push('/');
            return;
        }
        if(!usersList.users.length) {
            dispatch(listUsers())
        }
        if(!allProfilesList.profiles.length) {
            dispatch(allProfilesListReducer())
        }
    }, [dispatch, userInfo.data.isAdmin, history, usersList.users.length, allProfilesList.profiles.length]);

    const dashboardCards = [
        {
            title: 'Users',
            count: countUsers()
        },
        {
            title: 'Profiles',
            count: countProfiles()
        },
        {
            title: 'Profiles over 18 y.o.',
            count: allProfilesList.profiles.filter(profile => isAdult(profile.birthdate)).length
        }
    ]

    return (
        <React.Fragment>
            <h1>Dashboard: </h1>
            <Row>
                {dashboardCards.map(dashboardCard => (
                    <Col key={dashboardCard.title} sm={12} md={6} lg={4} xl={3}>
                        <DashboardCard 
                            cardInfo={dashboardCard} 
                            />
                    </Col>
                ))}
            </Row>
        </React.Fragment>
    )
};

export default DashboardScreen;
