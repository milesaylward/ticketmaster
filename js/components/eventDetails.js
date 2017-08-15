import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Follow } from 'react-twitter-widgets';
import FacebookProvider, { Like } from 'react-facebook';
import { FloatingActionButton } from 'material-ui';

import TicketIcon from './svg/svgIcons';

class EventDetail extends Component {
  getDate = (eventDate) => {
    //workaround to get dates to display regardless of user Timezone
    //the slice removes the time related information after the date
    const d = new Date(eventDate);
    const userTimezoneOffset = d.getTimezoneOffset() * 60000;
    const date = new Date(d.getTime() + userTimezoneOffset);
    return date.toString().slice(0,15);
  }

  getTime = (eventTime) => {
    //check if the event has a time and converts it to 12 hour time
    if(eventTime) {
      const H = eventTime.substr(0, 2);
      const h = (H % 12) || 12;
      const AmPm = H < 12 ? "AM" : "PM";

      const timeString = h + eventTime.substr(2, 3) + AmPm;
      return timeString;
    }
  }

  twitterUsername = (twitter) => {
    const username = twitter.url.split('.com/');
    return username[1];
  }

  renderTwitter = (twitter) => {
    if(twitter !== '') {
      return (
        <Follow username={twitter} />
      )
    }
    return;
  }

  renderFacebook = (url) => {
    if(url !== '') {
      return (
        <FacebookProvider appId='1552573768139217'>
          <Like className='fb-like' href={url} colorScheme='dark' share />
        </FacebookProvider>
      )
    }
    return;
  }

  renderArtists = () => {
    //renders the artist cards with their twitter and
    //facebook links if they exist
    const { attractions } = this.props.selected._embedded;
    const artists = attractions.map((artist, i) => {
      let twitterHandle = '';
      let facebookUrl = '';
      if(artist.externalLinks){
        if(artist.externalLinks.twitter) {
          twitterHandle = this.twitterUsername(artist.externalLinks.twitter[0]);
        }
        if(artist.externalLinks.facebook) {
          facebookUrl = artist.externalLinks.facebook[0].url;
        }
      }
      return (
        <li key={i}>
          <img src={artist.images[4].url} alt={artist.name}/>
          <div className='artist-block'>
            <div className='artist-info'>
              <p>{artist.name}</p>
              <div>
                <div className='twitter'>
                  {this.renderTwitter(twitterHandle)}
                </div>
                <div className='facebook'>
                  {this.renderFacebook(facebookUrl)}
                </div>
              </div>
            </div>
          </div>
        </li>
      )
    });

    return artists;
  }

  renderPrices = (event) => {
    if(event.priceRanges) {
      const { max, min } = event.priceRanges[0];
      //only renders prices if they are present in the repsonse for the selcted event
      //response prices only contain important numbers without 0s ie: 97.5 so toFixed makes it 97.50
      return (
        <h3>Tickets: {min.toFixed(2)}$ - {max.toFixed(2)}$</h3>
      )
    }
    return
  }

  render() {
    const { selected } = this.props;
    const { localDate, localTime } = this.props.selected.dates.start;
    const { name, city, state } = selected._embedded.venues[0];
    return (
      <div>
        <div style={{color: 'white'}} className='detail-main'>
          <div className='detail-container'>
            <h2>{selected.name}</h2>
            <div className='event-container'>
              <h3>Date: {this.getDate(localDate)}</h3>
              <h3>Time: {this.getTime(localTime)}</h3>
              {this.renderPrices(selected)}
              <h3>Location: {name} | {city.name}, {state.stateCode}</h3>
              <h3>Attractions:</h3>
              <div>
                <ul>
                  {this.renderArtists()}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className='fab'>
          <a href={selected.url} target='_blank'>
            <FloatingActionButton className='buy-btn'>
              <TicketIcon />
            </FloatingActionButton>
          </a>
          <p>Buy Tickets!</p>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { selected } = state.event;

  return { selected };
}

export default connect(mapStateToProps)(EventDetail);
