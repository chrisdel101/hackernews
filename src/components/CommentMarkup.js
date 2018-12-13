import React from 'react'

function CommentMarkup(props){
    console.log('props', props)
    let post = props.post.post
    let index = props.post.index
    return (
    <div className="Post" key={index}>
            <div className="rank">
            <span>{index+1}.</span>
        </div>
        <div className="vote">
            <span><img src="https://news.ycombinator.com/grayarrow2x.gif"/></span>
        </div>
        <div className="text-container">
            <div className="title">
                    {post.text}
            </div>
            <div className="by">
                    {post.by}
            </div>
            <div className="subtext">

                <span className="age">
                    {''}
                    <a href={`https://news.ycombinator.com/item?id=${post.id}`}>&nbsp;{getDiff(post.time)}</a>
                </span>

            </div>
            </div>
    </div>)
}

export default CommentMarkup
