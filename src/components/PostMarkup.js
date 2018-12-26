import React from 'react'
import utils from '../utils'


function PostMarkup(props){
    let post = props.post.post
    // console.log('props', props.post)
    let index = props.post.index
    let hostURL = props.post.hostURL
    let getDiff = props.post.getDiff
    let commentsLink = props.post.commentsLink
    // render this markup when needed'
    function alternateMarkup(text, href, index){
        return(
            <div className={text} key={index}>
                <a href={href}>&nbsp;{text}</a>
            </div>
        )
    }
    return (
    <div className="Post" key={index}>
        <div className="rank">
        <div>{index+1}.</div>
    </div>
    <div className="vote">
        <a href={`https://news.ycombinator.com/vote?id=${post.id}&how=up&goto=news`}>
        <div><img src="https://news.ycombinator.com/grayarrow2x.gif"/></div>
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
            <div className="score">{post.score}&nbsp;points by {''}
                <a href={`https://news.ycombinator.com/user?id=${post.by}`}>{''}{post.by}</a>
            </div>
            <div className="age">
                {''}
                <a href={`https://news.ycombinator.com/item?id=${post.id}`}>&nbsp;{getDiff(post.time)}</a>
            </div>
            {
                window.location.pathname === '/' || window.location.pathname === '/news' ?
                alternateMarkup('hide',`https://news.ycombinator.com/hide?id=${post.id}&goto=newest`, index ) :
                null
            }
            {
                window.location.pathname === "/newest" ?
                [
                    alternateMarkup('hide',`https://news.ycombinator.com/hide?id=${post.id}&goto=newest` ,index),
                    alternateMarkup('past', utils.encodeStr(`https://hn.algolia.com/?query=`, post.title), index+100),
                    alternateMarkup('web', utils.encodeStr(`https://www.google.com/search?q=`, post.title), index+200)
                ]
                    : null

            }
            <div className="comment">
                <a href={`https://news.ycombinator.com/item?id=${post.id}`}>&nbsp;{commentsLink(post)}</a>
            </div>
        </div>
        </div>
    </div>)
}
export default  PostMarkup
