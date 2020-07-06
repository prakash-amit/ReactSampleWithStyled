import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';
import styled from 'styled-components';

const StyledButton = styled.button`
background-color: ${props => props.alt ? 'red' : 'green'};
color: white;
font: inherit;
border: 1px solid blue;
padding: 8px;
cursor: pointer;
&:hover {
  background-color : ${props => props.alt ? 'salmon' : 'lightgreen'};
  color : black;
}`;

class App extends Component {
  state = {
    persons: [{ id: "a", name: "Amit", age: 25 },
    { id: "b", name: "Minakshi", age: 20 },
    { id: "c", name: "Sumit", age: 22 }],
    someother: "this is not touched",
    showPersons: false
  }

  deletePersonHandler = index => {
    const persons = this.state.persons.slice();
    persons.splice(index, 1);
    this.setState({
      persons: persons
    });
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => p.id == id);
    const person = { ...this.state.persons[personIndex] };
    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({
      persons: persons
    })
  }

  togglePersonCards = (event) => {
    let doesShow = this.state.showPersons;
    this.setState({
      showPersons: !doesShow
    })
  }


  render() {

    let persons = null;
    if (this.state.showPersons) {
      persons =
        <div>
          {
            this.state.persons.map((person, index) => {
              return (
                <Person
                  name={person.name}
                  age={person.age}
                  key={person.id}
                  click={index => this.deletePersonHandler(index)}
                  change={(event) => this.nameChangedHandler(event, person.id)}
                />
              );
            })
          }

        </div>
    }

    const headerClasses = [];
    if( this.state.persons.length <= 2 ) {
      headerClasses.push('red');
    }
    if( this.state.persons.length <= 1 ) {
      headerClasses.push('bold');
    }

    return (
      <div className="App">
        <h1>Hi! I am react app</h1>
        <p className = {headerClasses.join(' ')}>This is actually working!</p>
        <StyledButton alt = {this.state.showPersons}
          onClick={this.togglePersonCards}>
          Toggle Person List
        </StyledButton>
        {persons}
      </div>
    );
  }
}

export default App;
