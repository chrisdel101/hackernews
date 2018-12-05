import React, {Component} from "react";
import Post from "./Post";
import Header from "./Header";

class Page extends Component {
	render() {
		return (<table className="Page">
			<thead>
				<Header Appname="Hacker News" links={[
						"new",
						"comments",
						"show",
						"ask",
						"jobs",
						"submit"
					]}/>
			</thead>
			<tbody>
				<Post/>
			</tbody>
		</table>);
	}
}

export default Page;
