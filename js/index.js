import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import store, { history } from './store'
import App from './App';

injectTapEventPlugin();

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <MuiThemeProvider>
        <App />
      </MuiThemeProvider>
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);
