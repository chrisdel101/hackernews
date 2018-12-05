import React, {Component} from 'react'
import Post from './Post'
import Header from './Header'

class Page extends Component {
	render() {
		return (<table className="Page">
			<Header/>
			<Post/>
		</table>);
	}
}

export default Page
