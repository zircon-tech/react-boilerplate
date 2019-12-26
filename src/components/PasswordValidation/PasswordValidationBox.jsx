import React from 'react';
import memoizeOne from 'memoize-one';

import {
  contain1LowerCase,
  contain1UpperCase,
  contain1NumberOrSpecialChar,
  contain8Character,
} from '../../lib/utils/validations';
import PasswordValidationField from './PasswordValidationField';

class PasswordValidationBox extends React.PureComponent {
  constructor(props) {
    super(props);
    this.contain8Character = memoizeOne(
      contain8Character,
    );
    this.contain1LowerCase = memoizeOne(
      contain1LowerCase,
    );
    this.contain1UpperCase = memoizeOne(
      contain1UpperCase,
    );
    this.contain1NumberOrSpecialChar = memoizeOne(
      contain1NumberOrSpecialChar,
    );
  }

  render() {
    const {
      password, rePassword
    } = this.props;
    return (
      <div className="p-1 bg-white-alpha text-left mb-5">
        {
          (rePassword !== undefined) ? (
            <PasswordValidationField
              id="passReMatch"
              checked={!password || !rePassword || (password !== rePassword)}
              text="Passwords should match"
            />
          ) : null
        }
        <PasswordValidationField
          id="customCheck1"
          checked={!this.contain1UpperCase(password)}
          text="At least one uppercase character"
        />
        <PasswordValidationField
          id="customCheck2"
          checked={!this.contain1LowerCase(password)}
          text="At least one lowercase character"
        />
        <PasswordValidationField
          id="customCheck3"
          checked={!this.contain1NumberOrSpecialChar(password)}
          text="At least one number or one special character (e.g., #,?,!)"
        />
        <PasswordValidationField
          id="customCheck4"
          checked={!this.contain8Character(password)}
          text="At least 8 characters"
        />
      </div>
    );
  }
}

export default PasswordValidationBox;
