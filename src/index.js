// Libs
import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";

// Components
import Students from "./studentItem";

// style properties
const Container = styled.section``;

const Name = styled.p`
  padding: 0.25rem;
  border: solid 0.5px red;
  text-align: center;
`;

const StudentList = styled.div`
  border: solid 0.5px red;
  padding: 8px;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      isLoaded: false
    };
  }

  componentDidMount() {
    this.getCharacters();
  }

  getCharacters = async () => {
    try {
      axios
        .get(
          `https://www.potterapi.com/v1/characters?key=$2a$10$wl8IcvHDCg/W0eMq/Hgi1OXDKxDnn/TnSieteflX.MPjVQw28WVw2`,
          {
            house: "Hufflepuff"
          }
        )
        .then(res => {
          console.log(res.data.slice(0, 20));
          this.setState({
            students: res.data.slice(0, 20),
            isLoaded: true
          });
        });
    } catch (err) {
      console.log(err.response);
    }
  };

  onDragEnd = result => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }
    if (destination.index === source.index) {
      return;
    }

    const newStudentsList = this.state.students;
    const studentIndex = this.state.students.findIndex(
      item => item._id === draggableId
    );

    const student = this.state.students[studentIndex];
    newStudentsList.splice(source.index, 1);
    newStudentsList.splice(destination.index, 0, student);

    this.setState({
      students: newStudentsList
    });
  };

  renderStudentList = students => {
    return (
      <Container>
        <Droppable droppableId="0001">
          {provided => (
            <StudentList ref={provided.innerRef} {...provided.droppableProps}>
              {students.map((student, index) => (
                <Students student={student} index={index} />
              ))}
            </StudentList>
          )}
        </Droppable>
      </Container>
    );
  };

  render() {
    const { students } = this.state;

    return (
      <Container>
        <DragDropContext onDragEnd={this.onDragEnd}>
          {this.state.isLoaded && this.renderStudentList(students)}
        </DragDropContext>
      </Container>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
