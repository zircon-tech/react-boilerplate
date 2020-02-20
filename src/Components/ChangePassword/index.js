import React, {useState} from 'react';
import {withRouter} from 'react-router-dom';
import classnames from 'classnames';
import Loader from '../Common/loader';
import { form_rules } from '../../Lib/Utils/validations';
import PasswordValidationBox from '../PasswordValidation/passwordValidationBox';
import PasswordInput from '../Common/passwordInput';


const ChangePasswordForm = ({
  loading, 
  doChangePassword, 
  doCloseModal,
  history
}) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [show, setShow] = useState(false);
  
  const handleSubmit = () => {
    const passwords = {
      oldPassword,
      newPassword,
      confirmNewPassword
    };
    doChangePassword(passwords);
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
                  // 'is-invalid': validation.newPassword.isInvalid
                }
              )
            }
            name="oldPassword"
            maxLength="20"
            onChange={(e) => setOldPassword(e.target.value)}
            placeholder="Password"
            value={oldPassword}
          />
          {/* <span className="text-muted">{validation.oldPassword.message}</span> */}
        </div>
        <div className="form-group py-1">
          <PasswordInput
            className={
              classnames(
                'form-control py-2',
                {
                  // 'is-invalid': validation.newPassword.isInvalid
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
          {/* <span className="text-muted">{validation.newPassword.message}</span> */}
        </div>
        <div className="form-group py-1">
          <PasswordInput
            className={
              classnames(
                'form-control py-2',
                {
                  //'is-invalid': validation.reNewPassword.isInvalid
                }
              )
            }
            name="reNewPassword"
            maxLength="20"
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            placeholder="Confirm Password"
            value={confirmNewPassword}
          />
          {/* <span className="text-muted">{validation.reNewPassword.message}</span> */}
        </div>
        {
          show ? (
            <PasswordValidationBox
              password={newPassword}
              rePassword={confirmNewPassword}
            />
          ) : null
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
