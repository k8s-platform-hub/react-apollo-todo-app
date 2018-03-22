import React from 'react';
import { graphql } from 'react-apollo';
import '../../styles/Todo.css';

import {
  QUERY_TODO,
  MUTATION_TODO_ADD
} from '../../graphQueries/todoQueries';

class TodoInput extends React.Component {

  constructor() {
    super();
    this.state = {
      textboxValue: ''
    }
  }

  handleTextboxValueChange = (e) => {
    this.setState({
      ...this.state,
      textboxValue: e.target.value
    });
  }

  handleTextboxKeyPress = (e) => {
    if (e.key === 'Enter') {
      const newTask = this.state.textboxValue;
      const userId = this.props.userId;
      this._addTodo(newTask, userId);
    }
  }

  _addTodo = async (newTask, userId) => {
    await this.props.addTodoMutation({
      variables: {
        objects: [{
          task: newTask,
          user_id: userId,
          completed: false
        }]
      },
      update: (store, { data: { insert_todo }}) => {
        const data = store.readQuery({ query: QUERY_TODO })
        const insertedTodo = insert_todo.returning;
        data.todo.splice(0, 0, insertedTodo[0])
        store.writeQuery({
          query: QUERY_TODO,
          data
        })
      }
    })
    this.setState({
      ...this.state,
      textboxValue: ''
    });
  }

  render() {
    return (
      <div className="parentContainer">
        <input className="input" placeholder="Add a todo" value={this.state.textboxValue} onChange={this.handleTextboxValueChange} onKeyPress={this.handleTextboxKeyPress}/>
        <br />
      </div>
    )
  }
}

const TodoInputWithMutation = graphql(MUTATION_TODO_ADD, {
  name: 'addTodoMutation'
})(TodoInput);

export default TodoInputWithMutation;
