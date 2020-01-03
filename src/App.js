import React, { Component } from "react";
import { connect } from 'react-redux';
import Router from "./Router";
import alertActions from './Redux/Actions/alertActions';
import './App.css';

class App extends Component {
  componentWillUnmount() {
    clearTimeout(this.timeout_number);
  }

  render() {
    const { alert } = this.props;
    this.timeout_number = alert.message && setTimeout(() => {
      this.props.clearAlerts();
    }, 5000);

    return (
    
      <div className="App">
        {
          (alert.message) &&
            <div className={`alert ${alert.type}`}>{alert.message}</div>
        }
        <Router />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  alert: state.alert
});
  
const mapDispatchToProps = dispatch => ({
  clearAlerts: () => dispatch(alertActions.clear())
});

const connectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export { connectedApp as App };
