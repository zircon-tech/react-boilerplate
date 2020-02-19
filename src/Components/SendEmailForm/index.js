import React, { useState } from 'react';
import classnames from 'classnames';
import { form_rules } from '../../Lib/Utils/validations';
import Loader from '../Common/loader';

const useValidatedField = (initialState) => {
  const validator = form_rules;
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

const SendEmailForm = ({doSendEmail, loading}) => {
  const [validation, {email}, setEmail] = useValidatedField({email: ''});
  const [submmited, setSubmitted] = useState(false);

  const handleSendEmail = () => {
    setSubmitted(true);
    if (validation.isValid) {
      doSendEmail(email);
    }
  };

  return (
    loading ? <Loader/> : (
      <>
        <div>
          <p className="card-text"> We will send you an email with a code, please check your mailbox</p>
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
          <button onClick={handleSendEmail} type="button" className="btn btn-primary">Send me an email</button>
        </div>
      </>
    )
  );
};

export default SendEmailForm;
