import React, { useState } from 'react';
import classnames from 'classnames';
import * as userService from '../../Services/Api/userService';
import * as validations from '../../Lib/Utils/validations';

const useValidatedField = (initialState) => {
  const validator = validations.form_rules;
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
  const [validation, {email}, setEmail] = useValidatedField({email: ''});
  const [submmited, setSubmitted] = useState(false);

  const handleForgotPassword = () => {
    setSubmitted(true);
    if (validation.isValid) {
      userService.forgotPassword(email)
        .then(response => {
          alert("The email was sent, please check your mailbox.");
        })
        .catch(error => {
          // error: (error instanceof ClientError) ? error.message : 'Internal Error'
        });
    }
  };
 
  return (
    <>
      <div>
        <p className="card-text"> We will send you a link to recover your password, please enter your email</p>
        <div className="form-group mt-2">
          <input 
            className={classnames("form-control", {'is-invalid': submmited && validation.email.isInvalid})}
            name="email"
            onChange={
              (e) => {
                setEmail({email: e.target.value});
              }
            }
            placeholder="Email" 
            type="text"
            value={email}
          />
          <span className="text-muted">{submmited && validation.email.message}</span>
        </div>
      </div>
      <div className="mt-5">
        <button onClick={handleForgotPassword} type="button" className="btn btn-primary">Send me an email</button>
      </div>
    </>  
  );
};