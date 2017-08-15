import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RaisedButton } from 'material-ui';
import { showDetails } from '../actions/detailActions';

class EventTable extends Component {
  state = {
    loaded: false
  }
  //set state to loaded adding .loaded className to the component for css usage
  componentDidMount() {
    setTimeout(() => this.setState({loaded: true}), 700);
  }

  getDetails = (eventItem) => {
    this.props.showDetails(eventItem);
  }

  renderTableBody = () => {
    let tableData = '';
    const { searchResults } = this.props;

    if(searchResults) {
      tableData = searchResults.map((eventItem, i) => {
        const { localDate } = eventItem.dates.start;
        const { stateCode } = eventItem._embedded.venues[0].state;
        const { name } = eventItem._embedded.venues[0].city


        return (
          <tr key={i} className='table-event' onClick={() => this.getDetails(eventItem)}>
            <td>{eventItem.name}</td>
            <td>{this.getDate(localDate)}</td>
            <td>{name}, {stateCode}</td>
            <td>
              <a href={eventItem.url} target='_blank'>
                <RaisedButton label='Buy Tickets' />
              </a>
            </td>
          </tr>
        )
      })
    }
    return tableData;
  }

  getDate = (eventDate) => {
    //workaround to get dates to display regardless of user Timezone
    //the slice removes the timezone related information after the date
    const d = new Date(eventDate);
    const userTimezoneOffset = d.getTimezoneOffset() * 60000;
    const date = new Date(d.getTime() + userTimezoneOffset);
    return date.toString().slice(0,15);
  }

  getTime = (eventTime) => {
    if(eventTime) {
      const H = eventTime.substr(0, 2);
      const h = (H % 12) || 12;
      const AmPm = H < 12 ? "AM" : "PM";

      const timeString = h + eventTime.substr(2, 3) + ampm;
      return timeString;
    }
    return;
  }
  render() {
   return (
     <div className='table-container' >
       <table className={'highlight responsive-table ' + (this.state.loaded ? 'loaded' : '')}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>City/State</th>
            <th>Ticket Link</th>

          </tr>
        </thead>
        <tbody>
          {this.renderTableBody()}
        </tbody>
      </table>
    </div>
   )
 }
}

const mapStateToProps = state => {
  const { searchResults } = state.data;
  return { searchResults };
}

export default connect(mapStateToProps, { showDetails })(EventTable);
