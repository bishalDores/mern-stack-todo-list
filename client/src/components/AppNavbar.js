import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
  } from 'reactstrap';
  import { connect } from 'react-redux';
  import Login from '../components/auth/LoginModal';
  import Register from '../components/auth/RegisterModal';
  import Logout from '../components/auth/logout';

  const AppNavbar = (props) => {

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar color="dark" dark expand="sm" className="mb-5">
                <Container>
                    <NavbarBrand href="/">ShoppingList</NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                {props.isAuthenticated ? "" : <Login/>}
                            </NavItem>
                            <NavItem>
                                {props.isAuthenticated ? "": <Register/>}
                            </NavItem>
                            <NavItem>
                                <span className="navbar-text mr-3"><strong>{props.isAuthenticated ? `Welcome ${props.user.name}` : ''}</strong></span>
                            </NavItem>
                            <NavItem>
                            {props.isAuthenticated ? <Logout/> : ""}
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </div>
    )
  };

  const mapStateToProps = state =>{
      return {
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user
      }
  }

  export default connect(mapStateToProps,null)(AppNavbar);
  