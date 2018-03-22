import React from 'react';
import '../../styles/Todo.css';
import TodoInput from './TodoInput';
import TodoList from './TodoList';

export default class TodoComponent extends React.Component {

  render() {
    return (
      <div className="parentContainer">
        <h1 className="header">Todos</h1>
        <TodoInput userId={this.props.userInfo.hasura_id}/>
        <TodoList />
      </div>
    )
  }
}
