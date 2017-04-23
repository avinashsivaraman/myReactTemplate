import React from 'react';
import ReactDOM from 'react-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import Routes from './routes';
//import createBrowserHistory from 'history/createBrowserHistory';
import { browserHistory, Link, BrowserRouter as Router } from 'react-router-dom';
//const store = configureStore();

//const customHistory = createBrowserHistory();


class AppHeader extends React.Component {
  render() {
    return (
      <Router history={browserHistory} >
        <div>
          <Navbar inverse collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                    Template
                </Navbar.Brand>
                <Navbar.Toggle />
              </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                <NavItem eventKey={1}><Link to='/'>Home</Link></NavItem>
                <NavItem eventKey={2}><Link to='/about'>About</Link></NavItem>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Routes />
        </div>
      </Router>
    );
  }

}

ReactDOM.render(
  <AppHeader />,
  document.getElementById('root')
);
