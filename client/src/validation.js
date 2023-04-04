// eslint-disable-next-line
const emailRegExValidation = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi;
// eslint-disable-next-line
const passwordRegExValidation = /^(?=.\d)$/gm;

export default function validation(inputs){
    let errors = {};
    if(inputs){
        if(inputs.email === ''){
            errors.email = 'Username can\'t be empty';
        }
        if(!emailRegExValidation.test(inputs.email)){
            errors.email = 'Username must be an email';   
        }
        if(inputs.email.length > 35){
            errors.email = 'Username can\'t be longer than 35 characters';
        }
        if(passwordRegExValidation.test(inputs.password)){
            errors.password = 'Password must have a number';
        }
        if(inputs.password.length < 6 || inputs.password.length > 10){
            errors.password = 'Password must have minimum 6 characters and maximum 10';
        }
    }
    return errors;
}