import React, { useState, useEffect } from 'react';
import { Button, NavLink,Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

const RegisterModal = (props) => {
  const {
    className
  } = props;

  const [modal, setModal] = useState(false);
  const [userInfo,setUserInfo] = useState({
      name:'',
      email:'',
      password:'',
  })
  const [msg,setMsg] = useState(null);
  const [authenticate,setAuthenticate] = useState(false);
 
  useEffect(()=>{
    if(props.error.id === "REGISTER_FAIL"){
        setMsg(props.error.msg.msg)
    }else{
        setMsg(null)
    }
  },[props.error]);

  RegisterModal.propTypes = {
      isAuthenticated: PropTypes.bool,
      error: PropTypes.object.isRequired,
      register: PropTypes.func.isRequired,
      clearErrors: PropTypes.func.isRequired
  }

  const toggle = () => {
    props.clearErrors();
    setModal(!modal);
  }
  
  const onSubmit = e =>{
      e.preventDefault();
      const {name,email,password} = userInfo;
      const newUser = {
          name,
          email,
          password
      }
       props.register(newUser).then(res => {
        
            setModal(false);
            setUserInfo({
                ...userInfo,
                name:'',
                email:'',
                password:'',
            })
       }).catch(err => {
           setMsg(err.msg.msg);
        });
    
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
      <NavLink onClick={toggle} href="#">Register</NavLink>
      <Modal isOpen={modal} toggle={toggle} className={className} onExit={toggle}>
        <ModalHeader toggle={toggle}>Add to shopping list</ModalHeader>
        <ModalBody>
            {msg ? <Alert color="danger">{msg}</Alert>:null}
            <Form onSubmit={onSubmit} autoComplete="off">
                <FormGroup>
                    <Label for="name">Name</Label>
                    <Input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Enter your name"
                        onChange={onChangeHandler}
                        className="mb-3"
                        required
                    />
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
                    <Button color="dark" style={{marginTop:'2rem'}} block>Register</Button>
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
        register: payload => dispatch(register(payload)),
        clearErrors: () => dispatch(clearErrors())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(RegisterModal);