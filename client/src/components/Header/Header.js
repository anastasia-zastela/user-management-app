import React from 'react';
import { useHistory } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { logout } from '../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';


const Header = () => {
      const dispatch = useDispatch();
      const history = useHistory();

      const userLogin = useSelector(state => state.userLogin);
      const { userInfo } = userLogin;
  
      const logoutHandler = () => {
          dispatch(logout());
          history.push('/login');
      }

      let header = null;
      let adminLinks = null;

      if(userInfo && userInfo.data.isAdmin) {
        adminLinks = (<React.Fragment>
            <LinkContainer to="/dashboard">
            <Nav.Link>Dashboard</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/users">
                <Nav.Link>Users</Nav.Link>
            </LinkContainer>
            </React.Fragment>)
      }
    
      if(userInfo) {
        header = (<header>
        <Navbar bg="light" variant="light" expand="lg">
            <Container>
                <LinkContainer to="/profiles">
                    <Navbar.Brand>{userInfo.data.username}</Navbar.Brand>
                </LinkContainer>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <LinkContainer to="/profiles">
                            <Nav.Link>Profiles</Nav.Link>
                        </LinkContainer>
                        {adminLinks}
                        <Container>
                            <Nav.Link onClick={logoutHandler}>Log out</Nav.Link>
                        </Container>
                    </Nav>
                </Navbar.Collapse>


            </Container>
        </Navbar>

    </header>);
    }

    return (
        <React.Fragment>
            {header}
        </React.Fragment>
        
    )
};

export default Header;
