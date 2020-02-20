import React, {useState} from 'react';
import {withRouter} from 'react-router-dom';
import classnames from 'classnames';
import Loader from '../Common/loader';
import { fieldValidator } from '../../Lib/Utils/formValidator';
import PasswordValidationBox from '../PasswordValidation/passwordValidationBox';
import PasswordInput from '../Common/passwordInput';
import {validateFieldPassword} from "../../Lib/Utils/validations";

const ChangePasswordForm = ({
  loading,
  doChangePassword,
  doCloseModal,
  history
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const validateOldPassword = fieldValidator(
    [
      {
        method: 'isEmpty',
        validWhen: false,
        message: 'This field is required.',
      },
    ],
    oldPassword
  ).find(rule => rule.isInvalid);
  const [newPassword, setNewPassword] = useState('');
  const validateNewPassword = fieldValidator(
    [
      {
        method: 'isEmpty',
        validWhen: false,
        message: 'This field is required.',
      },
      {
        method: (value) => Boolean(validateFieldPassword(value)),
        validWhen: true,
        message: 'This field must follow password policies.',
      },
    ],
    newPassword
  ).find(rule => rule.isInvalid);
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const validateConfirmNewPassword = fieldValidator(
    [
      {
        method: 'isEmpty',
        validWhen: false,
        message: 'This field is required.',
      },
      {
        method: (value) => Boolean(validateFieldPassword(value)),
        validWhen: true,
        message: 'This field must follow password policies.',
      },
      {
        method: (value) => (value === newPassword),
        message: 'The passwords should match.',
        validWhen: true,
      },
    ],
    confirmNewPassword
  ).find(rule => rule.isInvalid);
  const [show, setShow] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    if (!validateConfirmNewPassword && !validateNewPassword && !validateOldPassword) {
      doChangePassword({
        oldPassword,
        newPassword,
        confirmNewPassword
      });
    }
  };

  return (
    loading ? <Loader/> : (
      <div className="py-3">
        <div className="form-group py-1">
          <PasswordInput
            className={
              classnames(
                'form-control py-2',
                {
                  'is-invalid': (submitted && validateOldPassword),
                }
              )
            }
            name="oldPassword"
            maxLength="20"
            onChange={(e) => setOldPassword(e.target.value)}
            placeholder="Password"
            value={oldPassword}
          />
          {
            (submitted && validateOldPassword) && (
              <span className="text-muted">{validateOldPassword.message}</span>
            )
          }
        </div>
        <div className="form-group py-1">
          <PasswordInput
            className={
              classnames(
                'form-control py-2',
                {
                  'is-invalid': (submitted && validateNewPassword),
                }
              )
            }
            name="newPassword"
            maxLength="20"
            onChange={(e) => setNewPassword(e.target.value)}
            onFocus={() => setShow(true)}
            placeholder="New Password"
            value={newPassword}
          />
          {
            (submitted && validateNewPassword) && (
              <span className="text-muted">{validateNewPassword.message}</span>
            )
          }
        </div>
        <div className="form-group py-1">
          <PasswordInput
            className={
              classnames(
                'form-control py-2',
                {
                  'is-invalid': (submitted && validateConfirmNewPassword),
                }
              )
            }
            name="reNewPassword"
            maxLength="20"
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            placeholder="Confirm Password"
            value={confirmNewPassword}
          />
          {
            (submitted && validateConfirmNewPassword) && (
              <span className="text-muted">{validateConfirmNewPassword.message}</span>
            )
          }
        </div>
        {
          show && (
            <PasswordValidationBox
              password={newPassword}
              rePassword={confirmNewPassword}
            />
          )
        }
        <div className="row mt-5">
          <button
            type="button"
            className="btn btn-primary mx-auto"
            onClick={() => {
              doCloseModal();
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-primary mx-auto"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    )
  );
};

export default withRouter(ChangePasswordForm);
