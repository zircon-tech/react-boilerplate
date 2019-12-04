import FormValidator from '../components/FormValidator';
 

 const passwordMatch = (confirmation, state) => (state.password === confirmation)

 const form_rules =  new FormValidator([
    { 
        field: 'first_name', 
        method: 'isEmpty', 
        validWhen: false, 
        message: 'First Name is required.' 
    },
    { 
        field: 'last_name', 
        method: 'isEmpty', 
        validWhen: false, 
        message: 'Last Name is required.' 
    },
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
    },
    { 
        field: 'phone_number', 
        method: 'isEmpty', 
        validWhen: false, 
        message: 'Please provide a phone number.'
    },
    {
        field: 'phone_number', 
        method: 'matches',
        args: [/^\(?\d\d\d\)? ?\d\d\d\d\d\d$/],
        validWhen: true, 
        message: 'That is not a valid phone number.'
    },
    { 
        field: 'password', 
        method: 'isEmpty', 
        validWhen: false, 
        message: 'Password is required.'
    },
    { 
        field: 'password', 
        method: 'matches',
        args: [/^.*(?=.{6,}).*$/], 
        validWhen: true, 
        message: 'Password must have at least six characters.'
    },
    { 
        field: 'password', 
        method: 'matches',
        args: [/^.*(?=.*[A-Z]).*$/], 
        validWhen: true, 
        message: 'Password must have at least one uppercase.'
    },
    { 
        field: 'password_confirmation', 
        method: 'isEmpty', 
        validWhen: false, 
        message: 'Password confirmation is required.'
    },
    { 
        field: 'password_confirmation', 
        method: passwordMatch, 
        validWhen: true, 
        message: 'Password and password confirmation do not match.'
    }
]);
export default form_rules