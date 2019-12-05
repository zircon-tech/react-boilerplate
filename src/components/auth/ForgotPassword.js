import React, { useState, useEffect } from 'react'
import classnames from 'classnames';
import FormValidator from '../FormValidator'

const rules = [
    { 
        field: 'email', 
        method: 'isEmpty', 
        validWhen: false, 
        message: 'Email is required.' 
    },
    { 
        field: 'email',
        method: 'isEmail', 
        validWhen: true, 
        message: 'That is not a valid email.'
    }
]

const useValidatedField = (rules, initialState) => {
    const validator = new FormValidator(rules);
    const [field, setField] = useState(initialState);
    const [validation, setValidation] = useState(validator.validate(field));
    return [
      validation,
      field,
      (newField) => {
        setValidation(validator.validate(newField));
        setField(newField);
      },
    ];
  };

  
export default () => {
    const [validation, {email}, setEmail] = useValidatedField(rules, {email:''});
    const [submmited, setSubmitted]  = useState(false)

    const handleForgotPassword = () => {
        setSubmitted(true);
        if (validation.isValid) {
            console.log("send a link to an user email")
            // handle actual form submission here
        }
    }
 
    return (
        <section className="container-fluid h-100 px-4 px-md-5 py-md-5">
            <div className="row justify-content-sm-center mt-4 mb-5">
                <div className="col-sm-8 col-md-5 col-lg-4 bg-light rounded p-3 p-md-5 text-center">
                    <div className="col-lg-12 mb-5">
                        <h2 className="mb-5">Recover Password</h2>
                        <div className="mt-1">
                            <p className="card-text "> We will send you a link to recover your password, please enter your email</p>
                            <div className="form-group mt-2">
                                <input 
                                    className= {classnames("form-control", {'is-invalid': submmited && validation.email.isInvalid})}
                                    onChange = {
                                        (e) => {
                                            setEmail({email: e.target.value})
                                        }
                                    }
                                    placeholder="Email" 
                                    type="text"
                                    value={email}
                                />
                                <span className="text-muted">{submmited && validation.email.message}</span>
                            </div>
                        </div>
                    </div>
                    <button onClick = {handleForgotPassword} type="button" className="btn btn-primary">Send me an email</button>
                </div>
            </div>
        </section>
    )
}