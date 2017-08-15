import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Routes from './routes';



class App extends Component {
  render() {
    return (
      <div>
        <Routes history={this.props.history}/>
      </div>
    );
  }
}

export default withRouter(App);
