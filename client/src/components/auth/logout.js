import React from 'react';
import { NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';
import * as PropTypes from 'prop-types';

const Logout = ({logout}) => {

    Logout.propTypes = {
        logout: PropTypes.func.isRequired
    }
    return (
        <>
            <NavLink href="#" onClick={logout}>
                Logout
            </NavLink>
        </>
    )
};
const mapDispatchToProps = dispatch =>{
    return {
        logout: () =>dispatch(logout())
    }
}
export default connect(null, mapDispatchToProps)(Logout);
