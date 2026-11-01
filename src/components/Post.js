import React from "react"
import PostMarkup from "./PostMarkup"
import CommentMarkup from "./CommentMarkup"
import utils from '../utils'

// Post takes an array or an object. Login sorts them
function Post(props) {
    let indexes
    let posts = props.data
    // if props.data an object - do this
    if(!(Array.isArray(props.data)) && typeof "object") {
        indexes = props.data.indexes
        posts = props.data.chunkData || props.data.chunkShowNew
    }
    // if array inside array - do this
    if(Array.isArray(props.data[0])){
        posts = props.data[0]
    }
    function renderMarkup(post, index){
        if(!utils.checkRoute('comments')){
            return(<PostMarkup key={index} post={
               {
                   post: post,
                   index:indexes[index],
                   hostURL: utils.hostURL,
                   getDiff: utils.getDiff,
                   commentsLink: utils.commentsLink
               }  }/>
           )
       } else {
           return(<CommentMarkup key={index}  post={ {
               post: post,
               index:index,
               hostURL: utils.hostURL,
               getDiff: utils.getDiff,
               commentsLink: utils.commentsLink
           } }/>
            )
       }
    }
	return posts.map((post, outerIndex) => {
        return(
            renderMarkup(post, outerIndex)
            )
	})

}
export default Post
