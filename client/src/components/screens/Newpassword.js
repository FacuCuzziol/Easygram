import React,{useState,useContext} from 'react'
import {Link,useHistory,useParams} from 'react-router-dom'
import M from 'materialize-css'
import {UserContext} from '../../App'
const SignIn = () =>{
    const history = useHistory(UserContext);
    
    const [password,setPassword] = useState("")
    const {token} = useParams()
    console.log(token)
    const PostData =()=>{
        
        fetch("http://localhost:5000/new-password",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password,
                token
                
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data);
            if(data.error){
                M.toast({html:data.error,classes:"#ef5350 red lighten-1"})
            }
            else{
                
                M.toast({html:data.message,classes:"#66bb6a green lighten-1"})
                history.push('/signin')
                
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
                type="password"
                placeholder="enter a new password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                />
                <button className="btn waves-effect waves-light #4fc3f7 light-blue darken-1" 
                onClick={()=>PostData()}
                >Update password
                </button>
            </div>
        </div>
    )
}


export default SignIn