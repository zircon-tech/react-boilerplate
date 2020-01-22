import React, { Component } from "react";
import { connect } from "react-redux";
import Router from "./Router";
import alertActions from './Redux/Actions/alertActions';
import * as modalActions from "./Redux/Actions/modalActions";
import GenericModal from "./Components/Common/genericModal";
import './Rsc/Css/theme.css';
import './App.css';

const {FACEBOOK_APP_ID} = "constants";

class App extends Component {
  componentDidMount() {
    if (document.getElementById('facebook-jssdk')) {
      return;
    }
    const script = document.createElement("script");
    script.id = 'facebook-jssdk';
    script.src = `https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.1&appId=${FACEBOOK_APP_ID}`;
    script.async = true;
    document.body.appendChild(script);
  }

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
  alert: state.alert,
  modal: state.modal,
});

const mapDispatchToProps = dispatch => ({
  clearAlerts: () => dispatch(alertActions.clear()),
  doCloseModal: () => dispatch(modalActions.doCloseModal()),
  cleanModalForm: () => dispatch(modalActions.cleanModalForm()),
  doShowModal: (modalProps) => dispatch(modalActions.doShowModal(modalProps))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);