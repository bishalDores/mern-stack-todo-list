import React, { useState, useEffect } from 'react';
import { Button, NavLink,Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

const LoginModal = (props) => {
  const {
    className
  } = props;

  const [modal, setModal] = useState(false);
  const [userInfo,setUserInfo] = useState({
      email:'',
      password:'',
  })
  const [msg,setMsg] = useState(null);
  const [authenticate,setAuthenticate] = useState(false);
 
  useEffect(()=>{
    if(props.error.id === "LOGIN_FAIL"){
        setMsg(props.error.msg.msg)
    }else{
        setMsg(null)
    }
  },[props.error]);

  LoginModal.propTypes = {
      isAuthenticated: PropTypes.bool,
      error: PropTypes.object.isRequired,
      login: PropTypes.func.isRequired,
      clearErrors: PropTypes.func.isRequired
  }

  const toggle = () => {
    props.clearErrors();
    setModal(!modal);
  }
  
  const onSubmit = e =>{
      e.preventDefault();
      const {email,password} = userInfo;

      const user = {
          email,
          password
      }
      props.login(user).then(res =>{
          setModal(false);
      })
      .catch(err => setMsg(err.msg.msg));
    
  }
  const onChangeHandler = (e) =>{
        const {name,value} = e.target;
        setUserInfo({
            ...userInfo,
            [name]:value
        })
  }

  return (
    <div>
      <NavLink onClick={toggle} href="#">Login</NavLink>
      <Modal isOpen={modal} toggle={toggle} className={className} onExit={toggle}>
        <ModalHeader toggle={toggle}>Login</ModalHeader>
        <ModalBody>
            {msg ? <Alert color="danger">{msg}</Alert>:null}
            <Form onSubmit={onSubmit} autoComplete="off">
                <FormGroup>
                     <Label for="email">Email</Label>
                    <Input
                        type="text"
                        name="email"
                        id="email"
                        placeholder="Enter your email"
                        onChange={onChangeHandler}
                        className="mb-3"
                        required
                    />
                     <Label for="password">Password</Label>
                    <Input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter your password"
                        onChange={onChangeHandler}
                        className="mb-3"
                        autoComplete="new-password"
                        required
                    />
                    <Button color="dark" style={{marginTop:'2rem'}} block>Login</Button>
                </FormGroup>
            </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}
const mapStateToProps = (state) =>({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});
const mapDispatchToProps = dispatch => {
    return{
        login: (payload) => dispatch(login(payload)),
        clearErrors: () => dispatch(clearErrors())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(LoginModal);