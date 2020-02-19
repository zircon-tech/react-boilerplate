import React, { Component } from 'react';
import { connect } from 'react-redux';
import { doSendInvitation } from '../../Redux/Actions/userActions';
import SendEmailForm from '../../Components/SendEmailForm';

class SendInvitationContainer extends Component {
  render() {
    return (
      <SendEmailForm
        doSendEmail={this.props.doSendEmail}
        loading={this.props.loading}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  doSendEmail: (data) => dispatch(doSendInvitation(data)),
});

const mapStateToProps = state => ({
  loading: state.user.loading
});

export default connect(mapStateToProps, mapDispatchToProps)(SendInvitationContainer);
