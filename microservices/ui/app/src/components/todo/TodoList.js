import React from 'react';
import { graphql } from 'react-apollo';
import Todo from './Todo';
import {
  QUERY_TODO,
} from '../../graphQueries/todoQueries';

class TodoList extends React.Component {
  render() {
    if (this.props.data.loading) {
      return (
        <div>Loading. Please wait...</div>
      );
    }

    if (this.props.data.error) {
      return (
        <div>{this.state.error}</div>
      );
    }

    return (
      <div className="parentContainer">
        <ul className="todoList">
        {
          this.props.data.todo.map((todo, index) => {
            return (
              <Todo key={index} todo={todo} />
            );
          })
        }
        </ul>
      </div>
    )
  }
}

const TodoListWithQuery = graphql(QUERY_TODO)(TodoList)

export default TodoListWithQuery;
