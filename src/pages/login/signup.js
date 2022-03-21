import React, { useState } from 'react';
import LoginForm from './components/LoginForms';
import { useNavigate } from 'react-router-dom';


function SignUP() {
    const adminUser = {
        email: "admin@example.com",
        password: "password"
    }

    const [user, setUser] = useState({ name: "", email: "" });
    const [error, setError] = useState(""); 
    const navigate = useNavigate();
        const handleClick = () => {

            //apiCall(data);
            navigate('/home/dashboard')

        }

    const Login = details => {
        console.log(details);
        
        localStorage.setItem("email","admin@example.com");
        localStorage.setItem("password","password");
        if (details.email == adminUser.email && details.password == adminUser.password) {
            console.log("Logged in");
            setUser({
                name: details.name,
                email: details.email
            }
            );
            handleClick();
        } else {
            console.log("Details do not match!");
            setError("Details do not match!");
        }
    }

    const Logout = () => {
        setUser({ name: "", email: "" });
    }
    const myStyles = {
        backgroundImage: "url(/images/bg.jpg)",
       backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        padding: "0 15px 15px 15px"
  
    };


    return (
        <div className="App" style ={myStyles}>
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

export { SignUP };