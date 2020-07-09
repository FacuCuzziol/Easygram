import React from 'react'
import {Link} from 'react-router-dom'

const SignUp = () =>{
    return(
        <div className="mycard">
            <div className="card auth-card">
                <h2>Easygram</h2>
                <input
                type="text"
                placeholder="name"
                />
                <input
                type="text"
                placeholder="email"
                />
                <input
                type="text"
                placeholder="password"
                />
                <button className="btn waves-effect waves-light #4fc3f7 light-blue lighten-1" >SignUp
                </button>
                <h5>
                    <Link to="signin">Already have an account?</Link>
                </h5>
            </div>
        </div>
    )
}


export default SignUp