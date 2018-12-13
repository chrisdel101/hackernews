import React from "react"
import PostMarkup from "./PostMarkup"
import CommentMarkup from "./CommentMarkup"
import utils from '../utils'

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
    function checkRoute(){
        let pathname = window.location.pathname
        console.log(pathname === "/comments" ? true : false)
        return (pathname === "/comments" ? true : false)

    }
	return props.data.map((post, index) => {
        {console.log('post', post)}
        return (
                !checkRoute()  ? <PostMarkup post={ {
                            post: post,
                            index:index,
                            hostURL: utils.hostURL,
                            getDiff: utils.getDiff,
                            commentsLink: utils.commentsLink} }/> :
                        <CommentMarkup post={ {
                           post: post,
                           index:index,
                           hostURL: utils.hostURL,
                           getDiff: utils.getDiff,
                           commentsLink: utils.commentsLink
                       } }/>

        )
	})

}
export default Post
