import axios from 'axios';
import qs from 'qs';

import { ARTIST_SEARCH, CLEAR_SEARCH, SEARCH_LOADING, GET_MORE } from './types';

const ROOT_URL = `https://app.ticketmaster.com/discovery/v2/events.json?`
/*
The ticketmaster Api url can get pretty hard to manage due to all the params
the qs module creates a query string from an object any additional params can simply be added to the
getQuery function below as a param: value pair dynamic values will need to be added to the createURL
and getQuery functions
*/
const getQuery = (query, num) => {
  const size = num || '20';
  return {
    apikey: 'PPeHoNwALNfj4r29Fxyc8D5978LjTpY7',
    includeSpellcheck: 'yes',
    autocorrect: 'yes',
    countryCode: 'US',
    sort: 'date,asc',
    size: size,
    keyword: query
  }
}

const createURL = (q, n) => {
  const ticketQueryParams = getQuery(q, n);

  const query = qs.stringify({...ticketQueryParams});
  return `${ROOT_URL}${query}`
}

export const search = (query) => {
  const url = createURL(query);
  return (dispatch) => {
    dispatch({
      type: SEARCH_LOADING,
      payload: true
    });
    axios.get(url)
      .then((res) => {
        dispatch({
          type: ARTIST_SEARCH,
          payload: res.data
        });
      });
  }
}


//get more function preforms a similar search except it expands the size of the page based
//on the current page number and slices the data from the size - 20 so only the latest 20
//events are returned
export const getMore = (query, num, slice) => {
  const url = createURL(query, num);

  return (dispatch) => {
    axios.get(url)
      .then((res) => {
        const data = res.data._embedded.events.slice(slice);
        dispatch({
          type: GET_MORE,
          payload: data
        });
      });
  }
}

export const clearSearch = () => {
  return {
    type: CLEAR_SEARCH,
    payload: ''
  }
}
