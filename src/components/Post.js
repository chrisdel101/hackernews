import React, {Component} from "react";

class Post extends Component {
	render() {
		return (
			<tr className="Post">
				<td className="Post-header">
					<p>
						<code>src/App.js</code>
						and save to reload.
					</p>
					<a
						className="Post-link"
						href="https://reactjs.org"
						target="_blank"
						rel="noopener noreferrer"
					>
						Make HackerNews
					</a>
				</td>
			</tr>
		);
	}
}

export default Post;
