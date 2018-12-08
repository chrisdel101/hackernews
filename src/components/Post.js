import React from "react";
function Post(props) {
	console.log(props.data)

	return props.data.map((post, index) => {
        {console.log(post)}
		return (<tr className="Post" key={index}>
			<td className="rank">
				<span>{index+1}</span>
			</td>
			<td className="title">
				<a className="Post-link" href={post.url} target="_blank" rel="noopener noreferrer">
					{post.title}
				</a>
			</td>
			<td className="subtext">
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
			</td>
		</tr>)
	})

}
export default Post;
