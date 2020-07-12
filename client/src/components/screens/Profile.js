import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../../App'
const Profile = () =>{
    const [mypics,setPics] = useState([])
    const {state,dispatch} = useContext(UserContext);
    useEffect(()=>{
        fetch('http://localhost:5000/mypost',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            setPics(result.mypost)
        })
    },[])

    return(
        <div style={{maxWidth:"1300px",margin:"0px auto"}}>
            <div style={{
                display:"flex",
                justifyContent:"space-around",
                margin:"18px 0px",
                borderBottom:"1px solid grey"
            }}>
                <div>
                    <img style={{width:"160px", height:"160px", borderRadius:"80px"}}
                    src="https://ctxt.es/images/cache/800x540/nocrop/images%7Ccms-image-000020424.jpg"
                    />
                </div>
                <div>
                    <h4>{state?state.name:"loading"}</h4>
                    <div style={{display:"flex",
                    justifyContent:"space-between",
                    width:"108%"}}>
                        <h6>{mypics.length} posts</h6>
                        <h6>{state?state.followers.length:"0"} followers</h6>
                        <h6>{state?state.following.length:"0"} following</h6>
                    </div>
                </div>
            </div>
        
            <div className="gallery">
                {
                    mypics.map(item=>{
                        return (
                            <img key={item._id} className="item" src={item.photo} alt={item.title}/>
                        )
                    })
                }
 

            </div>
        </div>
    )
}


export default Profile