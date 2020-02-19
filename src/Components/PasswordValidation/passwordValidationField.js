import React from 'react';

function PasswordValidationField({id, checked, text}) {
  return (
    <div className="custom-control custom-checkbox mb-2">
      <input
        type="checkbox" className="custom-control-input"
        id={id}
        checked={!checked}
        disabled={checked}
        readOnly
      />
      <label
        className="custom-control-label fs-14 fw-300"
        htmlFor={id}
      >
        {text}
      </label>
    </div>
  );
}

export default PasswordValidationField;
