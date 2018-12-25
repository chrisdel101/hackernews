import React from 'react'
import utils from '../utils'


function PostMarkup(props){
    let post = props.post.post
    console.log('props', props.post)
    let index = props.post.index
    let hostURL = props.post.hostURL
    let getDiff = props.post.getDiff
    let commentsLink = props.post.commentsLink
    // render this markup when func called'
    function alternateMarkup(text, href){
        return(
            <span className={text}>
                <a href={href}>&nbsp;{text}</a>
            </span>

        )
    }
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
            {
                window.location.pathname === '/' || window.location.pathname === '/news' ?
                alternateMarkup('hide',`https://news.ycombinator.com/hide?id=${post.id}&goto=newest` ) :
                null
            }
            {
                window.location.pathname === "/newest" ?
                [alternateMarkup('hide',`https://news.ycombinator.com/hide?id=${post.id}&goto=newest` ),alternateMarkup('past'), alternateMarkup('web')]
                    : null

            }
            <span className="comment">
                <a href={`https://news.ycombinator.com/item?id=${post.id}`}>&nbsp;{commentsLink(post)}</a>
            </span>
        </div>
        </div>
    </div>)
}
export default  PostMarkup
