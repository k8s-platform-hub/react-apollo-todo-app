import React from 'react';
import { compose } from 'react-apollo'
import { graphql } from 'react-apollo';
import '../../styles/Todo.css';

import {
  QUERY_TODO,
  MUTATION_TODO_UPDATE,
  MUTATION_TODO_DELETE
} from '../../graphQueries/todoQueries';

class Todo extends React.Component {

  handleToggleTodo = () => {
    this._toggleTodo();
  }

  handleDeleteTodo = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this._deleteTodo();
  }

  render() {
    const todo = this.props.todo;
    return (
      <div className="parentContainer">
        <li className="todoItem" onClick={this.handleToggleTodo}>
          {
            todo.completed ?
              <strike className="todoLabel">{todo.task}</strike> :
              <label className="todoLabel">{todo.task}</label>
          }
          <label className="deleteLabel" onClick={this.handleDeleteTodo}>Delete</label>
        </li>
      </div>
    )
  }

  _toggleTodo = async () => {
    const todo = this.props.todo;
    await this.props.toggleTodo({
      variables: {
        todoId: todo.id,
        set: {
          completed: !todo.completed
        }
      },
      update: (store, { data: { update_todo }}) => {
        const data = store.readQuery({ query: QUERY_TODO })
        const toggledTodo = data.todo.find(t => t.id === todo.id)
        toggledTodo.completed = !todo.completed;
        store.writeQuery({
          query: QUERY_TODO,
          data
        })
      }
    })
  }

  _deleteTodo = async () => {
    const todo = this.props.todo;
    await this.props.deleteTodo({
      variables: {
        todoId: todo.id
      },
      update: (store, { data: { update_todo }}) => {
        const data = store.readQuery({ query: QUERY_TODO })
        data.todo = data.todo.filter(t => {
          return t.id !== todo.id
        })
        store.writeQuery({
          query: QUERY_TODO,
          data
        })
      }
    })
  }
}

const TodoWithMutation = compose(
  graphql(MUTATION_TODO_UPDATE, {
    name: 'toggleTodo'
  }),
  graphql(MUTATION_TODO_DELETE, {
    name: 'deleteTodo'
  })
)(Todo);

export default TodoWithMutation;
