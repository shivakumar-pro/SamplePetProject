import * as React from 'react';

import { useNavigate } from 'react-router-dom';





function Website() {

    const navigate = useNavigate();

    const adminUser = {
        email: "admin@example.com",
        password: "password"
    }



    React.useEffect(() => {

        let email = localStorage.getItem('email');
        let password = localStorage.getItem('password');
        if (email == adminUser.email && password == adminUser.password) {
            navigate('/home/dashboard')
        }
        else {
            navigate('/signup')
        }

    }, []);



    
    return (
        <h1></h1>
      
    )


}

export { Website };






