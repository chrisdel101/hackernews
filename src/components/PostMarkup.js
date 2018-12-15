import React from 'react'
import utils from '../utils'


function PostMarkup(props){
    let post = props.post.post
    console.log('props', props)
    let index = props.post.index
    let hostURL = props.post.hostURL
    let getDiff = props.post.getDiff
    let commentsLink = props.post.commentsLink
    return (
    <div className="Post" key={index}>
        <div className="rank">
        <span>{index+1}.</span>
    </div>
    <div className="vote">
        <a href={`https://news.ycombinator.com/vote?id=${post.id}&how=up&goto=news`}>
        <span><img src="https://news.ycombinator.com/grayarrow2x.gif"/></span>
        </a>
    </div>
    <div className="text-container">
        <div className="title">
            <a className="Post-link" href={post.url} target="_blank" rel="noopener noreferrer">
                {post.title}
            </a>
            <a id="host-url" href={`http://${hostURL(post.url)}`} target="_blank" rel="noopener noreferrer">
            &nbsp;{!hostURL(post.url) ? null : `(${hostURL(post.url)})` }
            </a>
        </div>
        <div className="subtext">
            <span className="score">{post.score}
                points by {''}
                <a href={`https://news.ycombinator.com/user?id=${post.by}`}>{''}{post.by}</a>
            </span>
            <span className="age">
                {''}
                <a href={`https://news.ycombinator.com/item?id=${post.id}`}>&nbsp;{getDiff(post.time)}</a>
            </span>
            <span className="hide">
                {''}
                <a href={'#'}>&nbsp;hide</a>
            </span>
            <span className="comment">
                <a href={`https://news.ycombinator.com/item?id=${post.id}`}>&nbsp;{commentsLink(post)}</a>
            </span>
        </div>
        </div>
    </div>)
}
export default  PostMarkup