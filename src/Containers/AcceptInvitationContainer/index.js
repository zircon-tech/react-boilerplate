import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  doRegisterFromInvitation,
  doCheckInvitationToken,
} from '../../Redux/Actions/userActions';
import AcceptInvitationForm from '../../Components/AcceptInvitationForm';

class AcceptInvitationContainer extends Component {
  render() {
    return (
      <AcceptInvitationForm
        doRegister={this.props.doRegister}
        loading={this.props.loading}
        doCheckValidationToken={this.props.doCheckInvitationToken}
        token={this.props.token}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  doRegister: (data, token) => dispatch(doRegisterFromInvitation(data, token)),
  doCheckInvitationToken: (token) => dispatch(doCheckInvitationToken(token))
});

const mapStateToProps = state => ({
  loading: state.user.loading
});

export default connect(mapStateToProps, mapDispatchToProps)(AcceptInvitationContainer);
