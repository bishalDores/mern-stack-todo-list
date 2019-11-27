import React, {useState,useEffect} from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getItems,deleteItems } from '../actions/itemActions';


const ShoppingList = ({items,getItems,deleteItems}) => {
    useEffect(()=>{
        getItems();
    },[]);
    const onDeleteHandler = (id) =>{
        deleteItems(id);
        }
    return (
       <>
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
                                     onClick={()=>onDeleteHandler(item.id)}
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
       </> 
    )
};
ShoppingList.propTypes = {
    items: PropTypes.array.isRequired,
    getItems: PropTypes.func.isRequired,
    deleteItems: PropTypes.func.isRequired,
}
const mapStateToProps = (state) =>({
    items: state.item.items
});
const mapDispatchToProps = dispatch => ({
    getItems: () => dispatch(getItems()),
    deleteItems: (id) => dispatch(deleteItems(id))
})
export default connect(mapStateToProps,mapDispatchToProps)(ShoppingList);