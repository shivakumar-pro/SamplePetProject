import React, { useState } from 'react';
import LoginForm from './components/LoginForms';


function Get() {





    return (
        <div className="App">
            {
                (user.email != "") ? (
                    <div className="welcome" >

                        <h2>Welcome, <span>{user.name}</span></h2>
                        <button onCkick={Logout}>Logout</button>
                    </div>
                ) : (
                    <LoginForm Login={Login} error={error} />
                )
            }
        </div>
    );
}

export { Get };