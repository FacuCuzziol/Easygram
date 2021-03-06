import React,{useState,useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'
import {UserContext} from '../../App'
const SignIn = () =>{
    const history = useHistory(UserContext);
    const {state,dispatch} = useContext(UserContext)
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")
    const PostData =()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html:"Invalid email",classes:"#ef5350 red lighten-1"})
            return 
        }
        fetch("http://localhost:5000/signin",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password,
                email
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data);
            if(data.error){
                M.toast({html:data.error,classes:"#ef5350 red lighten-1"})
            }
            else{
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                dispatch({type:"USER",payload:JSON.stringify(data.user)})
                M.toast({html:"sign In success",classes:"#66bb6a green lighten-1"})
                history.push('/')
                window.location.reload()
            }
            console.log(data)
        }).catch(err=>{
            console.log(err)
        })
        
    }

    return(
        <div className="mycard">
            <div className="card auth-card">
                <h2>Easygram</h2>
                <input
                type="text"
                placeholder="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                />
                <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                />
                <button className="btn waves-effect waves-light #4fc3f7 light-blue darken-1" 
                onClick={()=>PostData()}
                >Login
                </button>
                <h5>
                    <Link to="/signup">Don't have an account?</Link>
                </h5>
                <h6>
                    <Link to="/reset">Forgot Password ?</Link>
                </h6>
            </div>
        </div>
    )
}


export default SignIn