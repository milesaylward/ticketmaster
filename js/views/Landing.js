import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import InputHints from 'react-input-hints';
import { RaisedButton } from 'material-ui';

import { clearSearch } from '../actions/searchActions';


let d = 1;
class Landing extends Component {
  state = {
    query: '',
    loaded: false
  }
  //the setTimeout here adds a .loaded className to our root component allowing it to be animated
  //using Scss
  componentDidMount() {
    setTimeout(() => this.setState({loaded: true}), 50);
  }

  queryChange = (query) => {
    this.setState({
      query
    })
  }
  //the setTimeouts below here remove the .loaded className causing the landing page to undo it's animation
  handleSubmit = (e, query) => {
    e.preventDefault();
    this.props.clearSearch();
    this.setState({loaded: false});
    setTimeout(() => this.props.push(`/search/${query}`), 300);
  }

  buttonClick = (query) => {
    this.props.clearSearch();
    this.setState({loaded: false});
    setTimeout(() => this.props.push(`/search/${query}`), 300);
  }

  render() {
    return (
      <div className={'form-container background ' + (this.state.loaded ? 'loaded' : '')}>
        <h1>Search shows. Buy tickets.<br />Rock Out!</h1>
        <form className='landing-search' onSubmit={e => this.handleSubmit(e, this.state.query)}>
          <InputHints
            value = {this.state.query}
            onChange = {event => this.queryChange(event.target.value)}
            writeSpeedMs={200}
            deleteSpeedMs={100}
            placeholders={[
              'ed sheeran',
              'jay z',
              'beyonce',
              'lukas graham',
              'slayer',
              'def leppard'
            ]}
          />
        </form>
        <div className='btn-container'>
          <div style={{display: 'block'}}>
            <h3>Some of my favorites!</h3>
          </div>
          <RaisedButton
            className='artist-btn' label='Hozier'
            labelStyle={{textAlign: `center`}}
            onTouchTap={() => this.buttonClick('Hozier')}
          />
          <RaisedButton
            className='artist-btn' label='The Revivalists'
            labelStyle={{textAlign: `center`}}
            onTouchTap={() => this.buttonClick('The Revivalists')}
          />
          <RaisedButton
            className='artist-btn' label='Grouplove'
            labelStyle={{textAlign: `center`}}
            onTouchTap={() => this.buttonClick('Grouplove')}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { data } = state;
  return { data };
}

export default connect(mapStateToProps, { clearSearch })(Landing);
