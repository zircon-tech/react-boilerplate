import React, { Component } from "react";
import { connect } from "react-redux";
import Router from "./Router";
import alertActions from "./Redux/Actions/alertActions";
import * as modalActions from "./Redux/Actions/modalActions";
import GenericModal from "./Components/Common/genericModal";
import types from "./Redux/ActionTypes";
import "./App.css";

class App extends Component {
  componentWillUnmount() {
    clearTimeout(this.timeout_number);
  }

  render() {
    const { alert, doCloseModal, cleanModalForm, modal } = this.props;
    this.timeout_number =
      alert.message &&
      setTimeout(() => {
        this.props.clearAlerts();
      }, 5000);

    return (
      <div className="App">
        <GenericModal
          doClose={doCloseModal}
          cleanModalForm={cleanModalForm}
          {...modal}
        />
        {alert.message && (
          <div className={`alert ${alert.type}`}>{alert.message}</div>
        )}
        <Router />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  alert: state.alert
});

const mapDispatchToProps = dispatch => ({
  clearAlerts: () => dispatch(alertActions.clear()),
  doCloseModal: () => dispatch(modalActions.doCloseModal()),
  cleanModalForm: () => dispatch(modalActions.cleanModalForm())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);