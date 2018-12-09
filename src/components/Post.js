import React from "react";
function Post(props) {
	console.log(props.data)

	return props.data.map((post, index) => {
        {console.log(post)}
		return (
            <div className="Post" key={index}>
    			<div className="rank">
    				<span>{index+1}.</span>
    			</div>
    			<div className="vote">
    				<span>Arrow</span>
    			</div>
                <div className="text-container">
        			<div className="title">
        				<a className="Post-link" href={post.url} target="_blank" rel="noopener noreferrer">
        					{post.title}
        				</a>
        			</div>
                    <div className="subtext">
        				<span className="score">{post.score}
        					points by {''}
        					<a href={post.by}>{''}{post.by}</a>
        				</span>
        				<span className="age">
        					{''}
        					<a href={post.time}>&nbsp;{post.time}</a>
        				</span>
        				<span className="hide">
        					{''}
        					<a href="#">&nbsp;hide</a>
        				</span>
        				<span className="comment">
        					<a href={post.descendants}>&nbsp;comments</a>
        				</span>
        			</div>
                </div>

		</div>)
	})

}
export default Post;
