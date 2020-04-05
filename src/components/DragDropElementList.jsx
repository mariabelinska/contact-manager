import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ListGroup, ListGroupItem } from 'reactstrap';
import onDragEnd from '../services/onDragEnd';

export const DragDropElementList = ({ list, listElement, updateList }) => {
  return (
    <DragDropContext onDragEnd={result => onDragEnd(result, list, updateList)}>
      <Droppable droppableId="droppable">
        {provided => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {renderListViewItems(list, listElement)}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

const renderListViewItems = (list, listElement) => {
  return (
    <ListGroup>
      {list.map((item, index) => (
        <Draggable key={item.id} draggableId={item.id} index={index}>
          {provided => (
            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
              <div className="list-group-element">
                <ListGroupItem key={item.id} tag="a" action>
                  {listElement(item)}
                </ListGroupItem>
              </div>
            </div>
          )}
        </Draggable>
      ))}
    </ListGroup>
  );
};

DragDropElementList.propTypes = {
  list: PropTypes.array.isRequired,
  listElement: PropTypes.func.isRequired,
  updateList: PropTypes.func.isRequired,
};

export default DragDropElementList;
