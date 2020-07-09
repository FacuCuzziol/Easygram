import React from 'react'

const CreatePost = ()=>{
    return(
        <div className="card input-field"
        style={{
            margin:"30px auto",
            maxWidth:"900px",
            padding:"20px",
            textAlign:"center"
        }}
        >
            <input type="text" placeholder="title"/>
            <input type="text" placeholder="body"/>
            <div className="file-field input-field">
            <div className="btn #4fc3f7 light-blue darken-1">
                <span>Upload Image</span>
                <input type="file"/>
            </div>
            <div className="file-path-wrapper">
                <input class="file-path validate" type="text"/>
            </div>
            </div>
            <button className="btn waves-effect waves-light #4fc3f7 light-blue darken-1" >
                Submit Post
                </button>

        </div>
    )
}


export default CreatePost