import React, { Component } from 'react';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom';

import Landing from './views/Landing';
import searchResults from './views/searchResults';

//Landing needs to passed the history from react router so it can programatically navigate
//Second two routes show same component but use their params (:query, :page)
//to decide what information needs to be shown
class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" render={() => <Landing {...this.props.history} />} />
        <Route exact path ="/search/:query" component={searchResults} />
        <Route exact path ="/search/:query/:page" component={searchResults} />
      </Switch>
    )
  }
}

export default Routes;
