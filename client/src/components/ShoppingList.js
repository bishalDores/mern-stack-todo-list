import React, {useState,useEffect} from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getItems } from '../actions/itemActions';


const ShoppingList = ({items,getItems}) => {
    useEffect(()=>{
        getItems();
    },[])
    return (
       <Container>
           <Button 
           color="dark"
           style={{marginBottom:'2rem'}}
           onClick={()=>{}}
           >
                Add Item
           </Button>
           <ListGroup>
               <TransitionGroup className="shopping-list">
                    {
                        items ? items.map(item=>{
                            console.log(item)
                            return (
                            <CSSTransition key={item.id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    <Button
                                     className="remove-btn"
                                     color= "danger"
                                     size="sm"
                                     style={{marginRight:'20px'}}
                                     onClick={()=>{
                                         let tempItems = items;
                                         tempItems = tempItems.filter(el =>el.id !== item.id);
                                        //  setItems(tempItems);
                                     }}
                                    >
                                        &times;
                                    </Button>
                                    {item.name}
                                </ListGroupItem>
                            </CSSTransition>)
                        }): 'Todo list is empty !!'
                    }
               </TransitionGroup>
           </ListGroup>
       </Container> 
    )
};
ShoppingList.propTypes = {
    items: PropTypes.array.isRequired,
    getItems: PropTypes.func.isRequired
}
const mapStateToProps = (state) =>({
    items: state.item.items
});
const mapDispatchToProps = dispatch => ({
    getItems: () => dispatch(getItems())
})
export default connect(mapStateToProps,mapDispatchToProps)(ShoppingList);