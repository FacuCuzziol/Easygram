import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../../App'
import {useParams} from 'react-router-dom'
const Profile = () =>{
    const [userProfile,setProfile] = useState(null)
    const [showfollow,setShowFollow] = useState(true)
    const {state,dispatch} = useContext(UserContext);
    const {userid} = useParams()
    
    useEffect(()=>{
        fetch(`http://localhost:5000/user/${userid}`,{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            //console.log(result)
            
            setProfile(result)
            
        })
    },[])

    const followUser= ()=>{
        fetch('http://localhost:5000/follow',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                followId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
            localStorage.setItem("user",JSON.stringify(data))
            setProfile((prevState)=>{
                return {
                    ...prevState,
                    user:{
                        ...prevState.user,
                        followers:[...prevState.user.followers,data._id]
                    }
                }
            })
            setShowFollow(false)
        })
    }

    const unfollowUser= ()=>{
        fetch('http://localhost:5000/unfollow',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                unfollowId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
            
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
            localStorage.setItem("user",JSON.stringify(data))
            setProfile((prevState)=>{
                const newFollower = prevState.user.followers.filter(item=>item != data._id)
                return {
                    ...prevState,
                    user:{
                        ...prevState.user,
                        followers:newFollower
                }
            }
            })
            
        })
    }

    return(
        <>
        {userProfile ? 
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
                <h4>{userProfile.user.name}</h4>
                <h4>{userProfile.user.email}</h4>
                <div style={{display:"flex",
                justifyContent:"space-between",
                width:"108%"}}>
                    <h6>{userProfile.posts.length} posts</h6>
                    <h6>{userProfile.user.followers.length} followers</h6>
                    <h6>{userProfile.user.following.length} following</h6>
                </div>
                {showfollow?
                    <button style={{
                        margin:"10px"
                    }}
                        className="btn waves-effect waves-light #4fc3f7 light-blue darken-1" 
                    onClick={()=>followUser()}
                    >Follow
                    </button>
                    :
                    <button style={{
                        margin:"10px"
                    }} className="btn waves-effect waves-light #4fc3f7 light-blue darken-1" 
                    onClick={()=>unfollowUser()}
                    >UnFollow
                    </button>
                }
                    
                    
            </div>
        </div>
    
        <div className="gallery">
            {
                userProfile.posts.map(item=>{
                    return (
                        <img key={item._id} className="item" src={item.photo} alt={item.title}/>
                    )
                })
            }


        </div>
    </div>
        :

        <div class="preloader-wrapper big active loading-circle">
            <div class="spinner-layer spinner-blue-only">
                <div class="circle-clipper left">
                    <div class="circle"></div>
                </div><div class="gap-patch">
                    <div class="circle"></div>
                </div><div class="circle-clipper right">
                    <div class="circle"></div>
                </div>
            </div>
        </div>
        }
        </>
    )
}


export default Profile