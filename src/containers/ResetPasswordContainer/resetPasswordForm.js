import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import classnames from 'classnames';
import memoizeOne from 'memoize-one';
import Loader from '../../Components/loader';
import { validateFieldPassword, form_rules } from '../../Lib/Utils/validations';
import PasswordValidationBox from '../../Components/PasswordValidation/passwordValidationBox';
import PasswordInput from '../../Components/Common/passwordInput';


class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.validator = form_rules;
    this.state = {
      user: {
        newPassword: '',
        reNewPassword: '',
      },
      error: null,
      validation: this.validator.valid(),
      tokenValidation: false,
      loading: false,
      show: false
    };
    this.submitted = false;
    this.validateFieldPassword = memoizeOne(
      validateFieldPassword,
    );
  }
  
  componentDidMount() {
    this.setState({loading: true});
    const token = this.getTokenParamFromUrl();
    this.props.doCheckValidationToken(token).then(
      () => {
        this.setState({
          tokenValidation: true,
          loading: false
        });
      }
    ).catch(() => {
      this.setState({
        tokenValidation: false,
        loading: false
      });
    });
  }

    handleChange = (event) => {
      const {name, value} = event.target;
      const {user} = this.state;
      this.setState({
        user: {
          ...user,
          [name]: value
        }
      });
    }

    
    getTokenParamFromUrl = () => {
      const query = new URLSearchParams(this.props.location.search);
      return query.get('token');
    }

    handleSubmit = () => {
      this.setState({loading: true});
      const token = this.getTokenParamFromUrl();
      const {doResetPassword, history} = this.props;
      this.setState(
        state => {
          const validation = this.validator.validate(state.user);
          const validPass = this.validateFieldPassword(state.user.newPassword);
          if (validPass && validation.isValid) {
            doResetPassword(state.user, token, history);
          }
          return { 
            validation 
          };
        }
      );
      this.submitted = true;
    }
    
    render() {
      const { 
        tokenValidation, 
        loading, 
        user, 
        error,
        show
      } = this.state;
      if (!tokenValidation) {
        return (
          loading ? 
            <Loader/> : <h5 className="text-danger">This link has alreay been used.</h5>
        );
      }
      const validation = this.submitted ?                      
        this.validator.validate(user) :
        this.state.validation;
      
      return (
        loading ? <Loader/> : (
          <>
            {
              error && (
                <div className="form-group alert-danger">{error}</div>
              )
            }

            <div className="form-group">
              <PasswordInput
                className={
                  classnames(
                    'form-control py-2',
                    {
                      'is-invalid': validation.newPassword.isInvalid 
                    }
                  )
                }
                name="newPassword"
                maxLength="20"
                onChange={this.handleChange}
                onFocus={() => this.setState({show: true})}
                placeholder="Password"
                value={user && user.newPassword}
              />
              <span className="text-muted">{validation.newPassword.message}</span>
            </div>
            <div className="form-group">
              <PasswordInput
                className={
                  classnames(
                    'form-control py-2',
                    {
                      'is-invalid': validation.reNewPassword.isInvalid 
                    }
                  )
                }
                name="reNewPassword"
                maxLength="20"
                onChange={this.handleChange}
                placeholder="Confirm Password"
                value={user && user.reNewPassword}
              />
              <span className="text-muted">{validation.reNewPassword.message}</span>
            </div>
            {
              show ? (
                <PasswordValidationBox
                  password={user && user.newPassword}
                  rePassword={user && user.reNewPassword}
                />
              ) : null
            }
            <div className="mt-5">
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.handleSubmit}
              >
                                  Send
              </button>
            </div>
          </>
        )
      );
    }
}

export default withRouter(ResetPassword);
