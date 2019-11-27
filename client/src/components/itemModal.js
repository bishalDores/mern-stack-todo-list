import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import {addItems} from '../actions/itemActions';

import uuid from 'uuid';

const ItemModal = (props) => {
  const {
    className
  } = props;

  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');


  const toggle = () => setModal(!modal);
  
  const onSubmit = e =>{
      e.preventDefault();

      const newItem = {
          id: uuid(),
          name:name
      }
      props.addItems(newItem);
      toggle();

  }
  const onChangeHandler = (e) =>{
        setName(e.target.value);
  }

  return (
    <div>
      <Button color="dark" onClick={toggle} style={{marginBottom:'20px'}}>Add Item</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Add to shopping list</ModalHeader>
        <ModalBody>
            <Form onSubmit={onSubmit} >
                <FormGroup>
                    <Label for="item">Item</Label>
                    <Input
                        type="text"
                        name="name"
                        id="item"
                        placeholder="Add shopping item"
                        onChange={onChangeHandler}
                    />
                    <Button color="dark" style={{marginTop:'2rem'}} block>Add Item</Button>
                </FormGroup>
            </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}
const mapStateToProps = (state) =>({});
const mapDispatchToProps = dispatch => ({
    addItems: (item) => dispatch(addItems(item)),

})
export default connect(mapStateToProps,mapDispatchToProps)(ItemModal);