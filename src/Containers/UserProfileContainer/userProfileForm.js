import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import classnames from 'classnames';
import Loader from '../../Components/Common/loader';
import { form_rules } from '../../Lib/Utils/validations';
import ChangePasswordForm from '../../Components/ChangePassword';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.validator = form_rules;
    this.state = {
      user: {
        first_name: '',
        last_name: '',
        email: '',
      },
      validation: this.validator.valid(),
    };
    this.submitted = false;
  }

  componentDidMount() {
    const {getUserProfile, currentUser} = this.props;

    getUserProfile().then(resp => {
      if (resp && resp.data) {
        const user = {
          id: resp.data.id,
          email: resp.data.email,
          first_name: resp.data.firstName,
          last_name: resp.data.lastName
        };
        this.setState({user});
      }
    });
  }

  handleClickPassChange = () => {
    const {
      doShowModal,
      doCloseModal,
      doChangePassword
    } = this.props;
    doShowModal({
      props: {
        size: "lg",
      },
      headerText: 'Change Password',
      body: (
        <ChangePasswordForm
          doCloseModal={doCloseModal}
          doChangePassword={doChangePassword}
        />
      )
    });
  };

  handleSubmit = (event) => {
    const {
      doUpdateUserProfile,
    } = this.props;
    event.preventDefault();
    this.setState(
      state => {
        const validation = this.validator.validate(state.user);
        return {
          validation
        };
      },
      () => {
        if (this.state.validation.isValid) {
          doUpdateUserProfile(this.state.user);
        }
      }
    );
    this.submitted = true;
  };

  handleOnChange = (e) => {
    const {name, value} = e.target;
    this.setState(state => ({
      user: {
        ...state.user,
        [name]: value
      }
    }));
  };

  render() {
    const {user} = this.state;
    const {loading } = this.props;
    const validation = this.submitted ?
      this.validator.validate(user) :
      this.state.validation;
    return (
      loading ? <Loader/> : (
        <div>
          <h2 className="py-5 text-black">User Profile</h2>
          <div className="row px-md-5">
            <div className="col-lg-8 col-12 mx-auto">
              <form className="mb-4 mt-4" onSubmit={this.handleSubmit}>
                <div className="form-group row">
                  <label htmlFor="email" className="mx-auto col-form-label">Email</label>
                  <div className="col-10">
                    <input
                      className="form-control"
                      name="email"
                      placeholder="Email"
                      type="text"
                      value={user && user.email}
                      disabled
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="first_name" className="mx-auto col-form-label">First Name</label>
                  <div className="col-10">
                    <input
                      className={classnames("form-control", {'is-invalid': validation.first_name.isInvalid })}
                      name="first_name"
                      onChange={this.handleOnChange}
                      placeholder="First Name"
                      type="text"
                      value={user && user.first_name}
                    />
                    <span className="text-muted">{validation.first_name.message}</span>
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="last_name" className="mx-auto col-form-label">Last Name</label>
                  <div className="col-10">
                    <input
                      className={classnames("form-control", {'is-invalid': validation.last_name.isInvalid })}
                      onChange={this.handleOnChange}
                      placeholder="Last Name"
                      type="text" name="last_name"
                      value={user && user.last_name}
                    />
                    <span className="text-muted">{validation.last_name.message}</span>
                  </div>
                </div>
                <div className="row mt-5">
                  <div className="col-6 text-right">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={this.handleClickPassChange}
                    >
                      Change Password
                    </button>
                  </div>
                  <div className="col-6 text-left">
                    <button type="submit" className="btn btn-primary">Save</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )
    );
  }
}

export default withRouter(UserProfile);
