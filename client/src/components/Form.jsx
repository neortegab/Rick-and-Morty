import React, { useState } from 'react';
import validation from '../validation.js'
import './styles/Form.css';

export default function Form({login}) {

    const [userData, setUserData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState(validation(userData));

    const handleChange = (event) => {
        const inputName = event.target.name;
        const inputValue = event.target.value;
        setErrors(validation({...userData, [inputName]: inputValue}))
        setUserData({...userData, [inputName]: inputValue})
    } 

    const handleSubmit = (event) => {
        event.preventDefault();
        login(userData);
    }

return (
    <div className='login-container'>
        <div className='login-form'>
            <form>
                <div className='login-label-input'>
                    <label>Email:</label>
                        <input className='login-input'
                            type='text' 
                            placeholder='example@email.com' 
                            name='email' 
                            value={userData.email}
                            onChange={(e) => handleChange(e)}>
                        </input>
                        {errors.email && <p className='login-error'>{errors.email}</p>}
                    <label>Password:</label>
                        <input className='login-input'
                            type='password' 
                            name='password' 
                            value={userData.password}
                            onChange={(e) => handleChange(e)}>
                        </input>
                        {(userData.password !== '' && errors.password) && <p className='login-error'>{errors.password}</p>}
                    <button className='login-button' onClick={(e) => handleSubmit(e)}>Submit</button>
                </div>
            </form>
        </div>
    </div>
  )
}
