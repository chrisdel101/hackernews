import React from "react"
import PostMarkup from "./PostMarkup"
import CommentMarkup from "./CommentMarkup"
import utils from '../utils'

// Post takes an array or an object. Login sorts them
function Post(props) {
    console.log('props', props)
    let indexes
    let posts = props.data
    // console.log('posts', posts)
    // if props.data an object, set up indexes
    if(!(Array.isArray(props.data)) && typeof "object") {
        indexes = props.data.indexes
        posts = props.data.chunkData
    }
    // if an array bypass the above
    // function ComponentMarkup(post){
    //     post = post.post
    //     return(<div className={`Post ${utils.checkRoute('/comments') ? 'comment' : ''}`}>
    //
    //         <div className="subtext post-child">
    //             <div className="vote">
    //                 <span><img src="https://news.ycombinator.com/grayarrow2x.gif"/></span>
    //             </div>
    //             <div className="by">
    //                 {post.by}
    //             </div>
    //
    //             <span className="parent">
    //             {''}
    //                 <a href={`https://news.ycombinator.com/item?id=${post.parent}`}>&nbsp;parent</a>
    //             </span>
    //             {''}
    //
    //
    //         </div>
    //
    //     </div>)
    // }
    function renderMarkup(post, index){
        // console.log('POST', post)
        // console.log('IND', indexes)
        if(!utils.checkRoute('/comments')){
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
        // console.log('posts', posts)
        return(
            renderMarkup(post, outerIndex)
            )
        {/*return(<CommentMarkup key={outerIndex}  post={ {
            post: post,
            index:outerIndex,
            hostURL: utils.hostURL,
            getDiff: utils.getDiff,
            commentsLink: utils.commentsLink
        } }/>)
        */}
        // if post is still an array, loop again
        {/*    return Array.isArray(post) ? post.map((item, innerIndex) => {
                console.log('i', indexes[innerIndex])
                   return (!utils.checkRoute('/comments')  ?
                   <PostMarkup key={innerIndex} post={
                       {
                           post: item,
                           index:indexes[innerIndex],
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
                !utils.checkRoute('/comments')  ? <PostMarkup key={outerIndex} post={
                    {
                        post: post,
                        index:indexes[outerIndex],
                        hostURL: utils.hostURL,
                        getDiff: utils.getDiff,
                        commentsLink: utils.commentsLink
                    }  }/> :

                    <CommentMarkup key={outerIndex}  post={ {
                        post: post,
                        index:outerIndex,
                        hostURL: utils.hostURL,
                        getDiff: utils.getDiff,
                        commentsLink: utils.commentsLink
                    } }/>

                )
                */}
	})

}
export default Post
