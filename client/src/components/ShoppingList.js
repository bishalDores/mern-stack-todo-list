import React, {useState} from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import uuid from 'uuid';

const ShoppingList = () => {
    const[items,setItems] = useState([
        {id: uuid(), name:'Gym'},
        {id: uuid(), name:'Peanut Butter'},
        {id: uuid(), name:'Banana'},
        {id: uuid(), name:'Eggs'},
    ])
    return (
       <Container>
           <Button 
           color="dark"
           style={{marginBottom:'2rem'}}
           onClick={()=>{
               const name = prompt('Enter Item');
               if(name){
                   setItems([
                       ...items,
                       {id:uuid(),name}
                   ])
               }
           }}
           >
                Add Item
           </Button>
           <ListGroup>
               <TransitionGroup className="shopping-list">
                    {
                        items.map(item=>{
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
                                         setItems(tempItems);
                                     }}
                                    >
                                        &times;
                                    </Button>
                                    {item.name}
                                </ListGroupItem>
                            </CSSTransition>)
                        })
                    }
               </TransitionGroup>
           </ListGroup>
       </Container> 
    )
};

export default ShoppingList;