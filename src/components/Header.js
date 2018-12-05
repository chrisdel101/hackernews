import React, {Component} from 'react'

class Header extends Component {
	render() {
		return (<tr className="Header">
			<td>{this.props.Appname}</td>
			<td>
				<ul>
					{
						this.props.links.map((link, index) => {
							return <li key={index}>{link}</li>
						})
					}
				</ul>
			</td>
		</tr>)
	}
}

export default Header
