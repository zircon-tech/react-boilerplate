import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import classnames from 'classnames';
import Loader from '../Loader'
import * as userService from '../../services/api/user.service'
import FormValidator from '../FormValidator';

const passwordMatch = (confirmation, state) => (state.newPassword === confirmation)

const form_rules =  new FormValidator([
    
    { 
        field: 'newPassword', 
        method: 'isEmpty', 
        validWhen: false, 
        message: 'Password is required.'
    },
    { 
        field: 'newPassword', 
        method: 'matches',
        args: [/^.*(?=.{6,}).*$/], 
        validWhen: true, 
        message: 'Password must have at least six characters.'
    },
    { 
        field: 'newPassword', 
        method: 'matches',
        args: [/^.*(?=.*[A-Z]).*$/], 
        validWhen: true, 
        message: 'Password must have at least one uppercase.'
    },
    { 
        field: 'reNewPassword', 
        method: 'isEmpty', 
        validWhen: false, 
        message: 'Password confirmation is required.'
    },
    { 
        field: 'reNewPassword', 
        method: passwordMatch, 
        validWhen: true, 
        message: 'Password and password confirmation do not match.'
    }
 ])



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
            validation : this.validator.valid()
        }
        this.submitted = false;
        this.loading= false
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

    handleSubmit = () => {
        this.loading = this.submitted = true
        const validation = this.validator.validate(this.state.user);
        this.setState({ validation});

        if (validation.isValid) {
            userService.resetPasswordWithToken(this.state.user, this.props.token).then(
                () => this.props.history.push('/login')
            ).catch(
                (error) => this.setState({
                   // error: (error instanceof ClientError) ? error.message : 'Internal Error'
                })
            );
        } 
    }

    render() {
        let validation = this.submitted ?                      
                            this.validator.validate(this.state.user) :
                            this.state.validation
        return (
            this.state.loading ? <Loader/> :    
            <section className="container-fluid h-100 py-4 px-4 px-md-5 py-md-5">
                <div className="row justify-content-sm-center mt-4 mb-5">
                        <div className="col-sm-8 col-md-5 col-lg-4 bg-light rounded p-5 text-center">
                            <h2 className="mb-4"><b>Recover Password</b></h2>
                            <div className="pt-4 mb-4">

                                {
                                    this.state.error && (
                                        <div className="form-group alert-danger">{this.state.error}</div>
                                    )
                                }

                                <div className="form-group">
                                    <input
                                        type="password"
                                        name="newPassword"
                                        value={this.state.user.newPassword}
                                        maxLength="20"
                                        onChange={this.handleChange}
                                        className={
                                            classnames(
                                                'form-control py-2',
                                                {
                                                     'is-invalid': validation.newPassword.isInvalid 
                                                }
                                            )
                                        }
                                        placeholder="Password"
                                    />
                                    <span className="text-muted">{validation.newPassword.message}</span>
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        name="reNewPassword"
                                        value={this.state.user.reNewPassword}
                                        maxLength="20"
                                        onChange={this.handleChange}
                                        className={
                                            classnames(
                                                'form-control py-2',
                                                {
                                                    'is-invalid': validation.reNewPassword.isInvalid 
                                                }
                                            )
                                        }
                                        placeholder="Confirm Password"/>
                                        <span className="text-muted">{validation.reNewPassword.message}</span>
                                </div>
                                <div className="pt-1">
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={this.handleSubmit}
                                    >
                                        Reset
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
            </section>
        );
    }
}

export default withRouter(ResetPassword);
