import React from 'react';
import TodoComponent from './todo/TodoComponent';
import { USER_INFO_KEY, AUTH_URL } from '../constants';

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      loading: true,
      error: null,
      userInfo: null
    }
  }

  showLoadingIndicator = (shouldShow) => {
    this.setState({
      ...this.state,
      loading: shouldShow
    })
  }

  componentDidMount() {
    const userInfo = localStorage.getItem(USER_INFO_KEY);
    if (userInfo) {
      this.setState({
        ...this.state,
        loading: false,
        userInfo: JSON.parse(userInfo)
      })
    } else {
      this.showLoadingIndicator(true);
      var url = AUTH_URL;
      var requestOptions = {
          "method": "GET",
          "headers": {
              "Content-Type": "application/json"
          },
          "credentials": "include"
      };

      fetch(url, requestOptions)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          this.setState({
            ...this.state,
            loading: false,
            error: "Unable to get user credentials"
          });
        }
      })
      .then(json => {
        localStorage.setItem(USER_INFO_KEY, JSON.stringify(json))
        this.setState({
          ...this.state,
          loading: false,
          userInfo: json
        });
      })
      .catch(error => {
        this.setState({
          ...this.state,
          loading: false,
          error: error
        });
      });
    }

  }

  render() {
    if (this.state.loading) {
      return (
        <div>Loading. Please wait...</div>
      );
    }

    if (this.state.error) {
      return (
        <div>{this.state.error}</div>
      );
    }

    return (
      <TodoComponent userInfo={this.state.userInfo}/>
    )
  }

}
