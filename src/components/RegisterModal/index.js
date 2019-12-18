import React, { useState, useEffect } from 'react';
import { 
  Button, Modal, ModalHeader, ModalBody, ModalFooter 
} from 'reactstrap';
import classnames from 'classnames';
import CInput from '../common/CInput';
import { fieldValidator } from '../../lib/utils/FormValidator';


const RegisterModal = (props) => {
  const {
    submitHandler, 
    className,
    size,
    modal,
    setModal,
    data
  } = props;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [cellphone, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorFirstName, setErrorFirstName] = useState(null);
  const [errorLastName, setErrorLastName] = useState(null);
  const [errorEmail, setErrorEmail] = useState(null);
  const [errorPhoneNumber, setErrorPhoneNumber] = useState(null);

  const toggle = () => {
    setModal(!modal);
  };
  const profile = {
    firstName,
    lastName,
    cellphone,
    email
  };

  const onClosed = () => {
    setFirstName("");
    setLastName("");
    setPhoneNumber("");
    setEmail("");
    setErrorFirstName("");
    setErrorLastName("");
    setErrorEmail("");
    setErrorPhoneNumber("");
  };

  const onOpened = () => {
    setFirstName(data.first_name);
    setLastName(data.last_name);
    setEmail(data.email);
    setPhoneNumber(data.cellphone);
  };

  useEffect(() => {
    if (submitted) {
      const validateFirstName = fieldValidator([
        { 
          method: 'isEmpty', 
          validWhen: false, 
          message: 'First Name is required.' 
        }], firstName).filter(rule => rule.isInvalid);
      setErrorFirstName(validateFirstName[0] || null);
      
      const validateLastName = fieldValidator([
        { 
          method: 'isEmpty', 
          validWhen: false, 
          message: 'Last Name is required.' 
        }], lastName).filter(rule => rule.isInvalid);
      setErrorLastName(validateLastName[0] || null);
     
      if (cellphone) {
        const validatePhoneNumber = fieldValidator([
          {
            method: 'matches',
            args: [/^\(?\d\d\d\)? ?\d\d\d\d\d\d$/],
            validWhen: true, 
            message: 'That is not a valid phone number.'
          }], cellphone).filter(rule => rule.isInvalid);
        setErrorPhoneNumber(validatePhoneNumber[0] || null);
      }
      
      const validateEmail = fieldValidator([
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
        }], email).filter(rule => rule.isInvalid);
      setErrorEmail(validateEmail[0] || null);
    }
  }, [submitted, firstName, lastName, cellphone, email]); 
  
  return (
    <div>
      <Modal 
        className={className}
        isOpen={modal} 
        onClosed={onClosed}
        onOpened={onOpened}
        size={size} 
        toggle={toggle} 
      >
        <ModalHeader toggle={toggle}>Register</ModalHeader>
        <ModalBody>
          <div className="form-group row">
            <label htmlFor="first_name" className="col-sm-2 col-form-label">First Name</label>
            <div className="col-sm-10">
              <CInput
                className={classnames("form-control", {'is-invalid': errorFirstName && errorFirstName.isInvalid })} 
                name="first_name" 
                onChange={setFirstName}             
                placeholder="First Name" 
                type="text" 
                value={firstName}
              />
              <span className="text-muted">{errorFirstName && errorFirstName.message}</span>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="last_name" className="col-sm-2 col-form-label">Last Name</label>
            <div className="col-sm-10">
              <CInput
                className={classnames("form-control", {'is-invalid': errorLastName && errorLastName.isInvalid })} 
                name="last_name" 
                onChange={setLastName} 
                placeholder="Last Name"
                type="text" 
                value={lastName}
              />
              <span className="text-muted">{errorLastName && errorLastName.message}</span>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
            <div className="col-sm-10">
              <CInput  
                type="text" 
                name="email"
                onChange={setEmail}
                className={classnames("form-control", {'is-invalid': errorEmail && errorEmail.isInvalid})} 
                placeholder="Email"
                value={email}
              />
              <span className="text-muted">{errorEmail && errorEmail.message}</span>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="phone_number" className="col-sm-2 col-form-label">Celphone</label>
            <div className="col-sm-10">
              <CInput
                className={classnames("form-control", {'is-invalid': errorPhoneNumber && errorPhoneNumber.isInvalid })} 
                name="phone_number" 
                onChange={setPhoneNumber}
                placeholder="xxx-xxxxxx"
                type="text" 
                value={cellphone}
              />
              <span className="text-muted">{errorPhoneNumber && errorPhoneNumber.message}</span>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button 
            color="primary"
            onClick={
              () => {
                setSubmitted(true);
                return submitHandler(profile);
              }
            }
          >
            Send
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default RegisterModal;