import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RaisedButton } from 'material-ui';
import { Link, withRouter } from 'react-router-dom';

import { getMore } from '../../actions/searchActions';

//Renders buttons to be shown under Map on searchResults 
class ActionButtons extends Component {
  renderShowMore = () => {
    const page = this.props.pageNumber + 1;
    const { searchResults, match } = this.props;
    if(searchResults.length === 20) {
      return (
        <Link to={`/search/${match.params.query}/${page}`}>
          <RaisedButton
            className='action-btn'
            label='More Show Dates'
          />
        </Link>
      );
    }
  }

  render() {
    return (
      <div className='button-container'>
        <Link to='/'>
          <RaisedButton className='action-btn' label='Back to Search' />
        </Link>
        {this.renderShowMore()}
        {this.props.children}
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { searchResults } = state.data;

  return { searchResults };
}

export default withRouter(connect(mapStateToProps, { getMore })(ActionButtons))
