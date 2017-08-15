import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { RaisedButton } from 'material-ui';
import { search, getMore } from '../actions/searchActions';
import Map from '../components/Map';
import EventTable from '../components/eventTable';
import EventDetail from '../components/eventDetails';

class searchResults extends Component {
  state = {
    loaded: false,
    size: 20,
    page: 1
  }

  //when the component mounts it calls its search action with with the query
  //param passed through react-router via the browser bar.
  componentWillMount() {
    const { query } = this.props.match.params;
    this.props.search(query);

  }

  componentDidMount() {
    setTimeout(() => this.setState({loaded: true}), 20);
  }

  componentWillUpdate(nextProps) {
    const { params } = this.props.match;
    let pageSize = this.state.size;

    //A check if the page changed via react-router to decide
    //to grab the original list or a sliced list
    const pageChange = params === nextProps.match.params;
    if(!pageChange) {
      const { query, page } = nextProps.match.params;
      //Incorporating the back button was a fun as I
      //thougt it would be. I'm convinced this is not the
      //most elegant solution. Will be revisiting.
      if(page) {
        pageSize *= parseFloat(page);
        const slice = pageSize - 20;

        this.props.getMore(query, pageSize, slice);
        this.setState({page: this.state.page + 1});
      }
      else {
        this.props.getMore(query, 20, 0);
        this.setState({page: 1});
      }
    }
  }

  renderTitle = () => {
    const { autocorrect } = this.props.data;
    //tickemaster api provided spellcheck check seachActions.js for more info
    if(autocorrect) {
      return (
        <h1>
          Showing results for {autocorrect.suggestion}
        </h1>
      )
    }
    else {
      //match.params.query means whatever query was passed from landing and logged as param by react router
      return (
        <h1>Results for {this.props.match.params.query}</h1>
      )
    }
  }

  renderTable = () => {
    if(this.props.event.selected === '') {
      return <EventTable />;
    }
    else {
      return <EventDetail />
    }
  }

//renderSearchResults tests to see if the action creator is still loading and displays loading animation until it resolves
//if loading is false it tests the length of the data returned and return each component as necessary
  renderSearchResults = () => {
    const { loading, searchResults } = this.props.data;
    if(loading) {
      return (
        <div className='load-container'>
          <div className='loader'></div>
        </div>
        )
    }
    else if (searchResults.length === 0 & !loading) {
      return (
        <div className='no-results'>
          <h1>No results Found</h1>
          <Link to='/'>
            <RaisedButton label="Back To Search" />
          </Link>
        </div>
      )
    }
    return (
      <div>
        {this.renderTitle()}
        <Map page={this.state.page} />
        {this.renderTable()}
      </div>
    )
  }

  render() {
    return (
      <div className={'search-page ' + (this.state.loaded ? 'loaded' : '')}>
        {this.renderSearchResults()}
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { data, event } = state;
  return { data, event };
}

export default connect(mapStateToProps, { search, getMore })(searchResults);
