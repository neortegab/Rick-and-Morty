import React, { useState } from 'react';
import validation from '../validation.js'

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
    <div>
        <form>
            <div>
            <label>Email:</label>
                <input 
                    type='text' 
                    placeholder='example@email.com' 
                    name='email' 
                    value={userData.email}
                    onChange={(e) => handleChange(e)}>
                </input>
                {errors.email && <p>{errors.email}</p>}
            </div>
            <div>
            <label>Password:</label>
                <input 
                    type='password' 
                    name='password' 
                    value={userData.password}
                    onChange={(e) => handleChange(e)}>
                </input>
                {(userData.password !== '' && errors.password) && <p>{errors.password}</p>}
            </div>
            <button onClick={(e) => handleSubmit(e)}>Submit</button>
        </form>
    </div>
  )
}
