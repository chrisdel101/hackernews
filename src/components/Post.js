import React from "react"
import PostMarkup from "./PostMarkup"
import CommentMarkup from "./CommentMarkup"
import utils from '../utils'

// Post takes an array
function Post(props) {
    console.log('p', props)
    // need routing
    function hide(postId){
        // get pathNames in an array
        let pathNameArray = window.location.pathname.split('/')
        if(pathNameArray.includes('news')){
            return `https://news.ycombinator.com/hide?id=${postId}&goto=news`
        } else if(pathNameArray.includes('newest')){
            return `https://news.ycombinator.com/hide?id=${postId}&goto=newest`
        } else {
            console.log('no hiding')
            return
        }
    }
	return props.data.map((post, outerIndex) => {
        // if post is still an array, loop again
            return Array.isArray(post) ? post.map((item, innerIndex) => {
                   return (!utils.checkRoute()  ?
                   <PostMarkup key={innerIndex} post={
                       {
                           post: item,
                           index:innerIndex,
                           hostURL: utils.hostURL,
                           getDiff: utils.getDiff,
                           commentsLink: utils.commentsLink
                       }  }/> :
                       <CommentMarkup key={innerIndex}  post={ {
                           post: item,
                           index:innerIndex,
                           hostURL: utils.hostURL,
                           getDiff: utils.getDiff,
                           commentsLink: utils.commentsLink
                       } }/>

                   )
            })
            :
             (
                !utils.checkRoute()  ? <PostMarkup key={outerIndex} post={
                    {
                        post: post,
                        index:outerIndex,
                        hostURL: utils.hostURL,
                        getDiff: utils.getDiff,
                        commentsLink: utils.commentsLink
                    }  }/> :
                    // {console.log}
                    <CommentMarkup key={outerIndex}  post={ {
                        post: post,
                        index:outerIndex,
                        hostURL: utils.hostURL,
                        getDiff: utils.getDiff,
                        commentsLink: utils.commentsLink
                    } }/>

                )
	})

}
export default Post
