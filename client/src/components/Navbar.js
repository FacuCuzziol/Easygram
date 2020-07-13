import React,{useContext,useRef,useEffect,useState} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {UserContext} from '../App'
import M from 'materialize-css'


const NavBar = () =>{
    const searchModal = useRef(null)
    const [search,setSearch] = useState('')
    const {state,dispatch} = useContext(UserContext)
    const history = useHistory()
    useEffect(()=>{
      M.Modal.init(searchModal.current)
    },[])
    const renderList = ()=>{
      if(state){
        return[
          <li key="1"> <i data-target="modal1" className="modal-trigger large material-icons" style={{color:"black"}}>search</i></li>,
          <li key="2"><Link to="/profile">Profile</Link></li>,
          <li key="3"><Link to="/create">Create Post</Link></li>,
          <li key="4"><Link to="/myfollowingpost">My Following Posts</Link></li>,
          <li key="5">
            <button className="btn waves-effect waves-light #ef5350 red lighten-1" 
              onClick={()=>{
                localStorage.clear()
                dispatch({type:"CLEAR"})
                history.push('/signin')
                }
              }
              >Logout
            </button>
          </li>
        ]
      }else{
        return[
          <li key="6"><Link to="/signin">SignIn</Link></li>,
          <li key="7"><Link to="/signup">SignUp</Link></li>
        ]
      }
    }

    return(
        <nav>
        <div className="nav-wrapper white" style={{padding:"10px"}}>
          <Link to={state?"/":"signin"} className="brand-logo left">Easygram</Link>
          <ul id="nav-mobile" className="right">
            {renderList()}
          </ul>
        </div>
        
        <div id="modal1" class="modal" ref={searchModal} style={{color:"black"}}>
        <div className="modal-content">
        <input
                type="text"
                placeholder="search users"
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
                
                />
            <ul className="collection">
              <li className="collection-item">Alvin</li>
              <li className="collection-item">Alvin</li>
              <li className="collection-item">Alvin</li>
              <li className="collection-item">Alvin</li>
              
            </ul>
          
        </div>
        <div className="modal-footer">
          <button className="modal-close waves-effect waves-green btn-flat">Agree</button>
        </div>
      </div>

      </nav>
    )
}

export default NavBar