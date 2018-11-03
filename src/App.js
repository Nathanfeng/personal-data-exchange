import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { withStyles } from '@material-ui/core/styles';
// import ProtectedRoute from './ProtectedRoute';

// Styles
import './App.css';

// Components
import Upload from './Components/Upload';
import Header from './Components/Header';
import Retrieve from './Components/Retrieve';
import GrantAccess from './Components/GrantAccess';


const history = createHistory({
  basename: '',
});

const styles = {
  main: {
    padding: 100,
    paddingTop: 40,
  },
};

class App extends Component {

  render() {
    const { classes } = this.props;

    return (
      <div className="App">
        <Header history={history} />
        <Router history={history}>
          <main className={classes.main}>
            <Switch>
              <Route
                path='/'
                exact
                component={Upload}
              />
              <Route
                path='/retrieve_record'
                component={Retrieve}
              />
              <Route
                path='/grant_access'
                component={GrantAccess}
              />
            </Switch>
          </main>
        </Router>
      </div>
    );
  }
}

export default withStyles(styles)(App);
