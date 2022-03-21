/* export const API_BASE_URL = process.env.REACT_APP_SERVER_URL;
export const ACCESS_TOKEN_NAME = 'login_access_token'; */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './LoginForms.css';

function LoginForm({ Login, error }) {
    const [details, setDetails] = useState({ name: "", email: "", password: "" });

    const navigate = useNavigate();

    const submitHandler = e => {
        e.preventDefault();

        Login(details);
        // navigate('/home/list')
    }

    
    return (
   

            <form onSubmit={submitHandler}  >
                <div className="form-inner">
                    <img src='/images/avatar.jpg' class="avatar" />
                    <h2 >Login</h2>
                    {(error != "") ? (<div className="error">{error}</div>) : ""}

                    <div className="form-group">
                        <label htmlfor="email">Email: </label>
                        <input type="email" name="email" id="email" onChange={e => setDetails({ ...details, email: e.target.value })} value={details.email} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" name="password" id="password" onChange={e => setDetails({ ...details, password: e.target.value })} value={details.password} />
                    </div>
                    <br />
                    <input type="submit" value="LOGIN" />
                </div>
            </form>
    
    )
}

export default LoginForm;
