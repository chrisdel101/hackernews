import React from "react";
function Post(props) {
	{
		return props.posts.map((post, index) => {
			return (<tr className="Post">
				<td className="rank">
					<span>{post.rank}</span>
				</td>
				<td className="text">
					<a className="Post-link" href={post.href} target="_blank" rel="noopener noreferrer">
						{post.text}
					</a>
				</td>
				<td className="subtext">
					<span className="score">{post.points}
						points by {''}
						<a href={post.user}>{''}{post.user}</a>
					</span>
					<span className="age">
						{''}
						<a href={post.age}>&nbsp;{post.age}</a>
					</span>
					<span className="hide">
						{''}
						<a href={post.hide}>&nbsp;hide</a>
					</span>
					<span className="comment">
						<a href={post.comment}>&nbsp;comment</a>
					</span>
				</td>
			</tr>)
		})
	}
}
export default Post;