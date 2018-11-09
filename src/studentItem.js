import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: white;
`;

export default class StudentItem extends React.Component {
  render() {
    return (
      <Draggable draggableId={this.props.student._id} index={this.props.index}>
        {provided => (
          <Container
            {...provided.draggableProps}
            highlight_line
            {...provided.dragHandleProps}
            end_highlight_line
            ref={provided.innerRef}
          >
            {this.props.student.name}
          </Container>
        )}
      </Draggable>
    );
  }
}
