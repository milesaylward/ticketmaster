import { ARTIST_SEARCH, CLEAR_SEARCH, SEARCH_LOADING, GET_MORE } from '../actions/types';

const INITIAL_STATE = {
  searchResults: [],
  autocorrect: '',
  loading: false
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ARTIST_SEARCH:
    //if block here tests if the tickemaster api detected a spellcheck to pass
    //the data that is needed. if no data is returned an empty array is sent
    //signalling to the searchResults page that there are no results.
      if(action.payload.spellcheck) {
        return {
          searchResults: action.payload._embedded.events,
          autocorrect: action.payload.spellcheck.suggestions[0],
          loading: false
        };
      }
      else if(action.payload._embedded) {
        return {
          searchResults: action.payload._embedded.events,
          loading: false
        };
      }
      else {
        return {
          searchResults: [],
          loading: false
        };
      }
    case GET_MORE: {
      return { searchResults: action.payload }
    }
    case SEARCH_LOADING:
      return {
        loading: true,
        searchResults: []
      }
    case CLEAR_SEARCH:
      return {
        searchResults: [],
        autocorrect: ''
      }
    default:
      return state;
  }
}
