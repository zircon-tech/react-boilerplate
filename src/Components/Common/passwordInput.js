import React, {useState} from 'react';
import classnames from 'classnames';

const PasswordInput = (props) => {
  const [hidden, setHidden] = useState(true);
  return (
    <>
      <input
        type={hidden ? 'password' : 'text'}
        {...props}
      />
      <i
        className={classnames('fa fa-fw field-icon toggle-password', hidden ? 'fa-eye-slash' : 'fa-eye')}
        onClick={
          () => setHidden(!hidden)
        }
      />
    </>
  );
};

export default PasswordInput;
