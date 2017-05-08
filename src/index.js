import React from 'react';
import ReactDOM from 'react-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap'
//import createBrowserHistory from 'history/createBrowserHistory';
import { browserHistory, Link, BrowserRouter as Router } from 'react-router-dom';
import {AppBar, Tabs, Tab} from 'material-ui'
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Routes from './routes';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import './scss/test.scss';


//const store = configureStore();

//const customHistory = createBrowserHistory();


class AppHeader extends React.Component {
  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }
  render() {
    return (
      <Router history={browserHistory} >
        <div>
          <AppBar title="Template" />
          <Tabs>
              <Tab label='Home' containerElement={<Link to='/' />}/>
              <Tab label='About' containerElement={<Link to='/about' />}/>
              <Tab label='To-Do' containerElement={<Link to='/todo' />}/>
            </Tabs>
          <Routes />
        </div>
      </Router>
    );
  }

}

AppHeader.childContextTypes = {
   muiTheme: React.PropTypes.object.isRequired
}

ReactDOM.render(
  <AppHeader />,
  document.getElementById('root')
);
