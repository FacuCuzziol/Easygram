import React,{useState,useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'
import {UserContext} from '../../App'
const Reset = () =>{
    const history = useHistory(UserContext);

    const [email,setEmail] = useState("")
    const PostData =()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html:"Invalid email",classes:"#ef5350 red lighten-1"})
            return 
        }
        fetch("http://localhost:5000/reset-password",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email
            })
        }).then(res=>res.json())
        .then(data=>{
           
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
                type="text"
                placeholder="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                />
                
                <button className="btn waves-effect waves-light #4fc3f7 light-blue darken-1" 
                onClick={()=>PostData()}
                >Reset Password
                </button>
                
            </div>
        </div>
    )
}


export default Reset