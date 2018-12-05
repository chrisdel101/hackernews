import React from 'react'
function Header(props) {
	return (<tr className="Header">
		<td>{props.Appname}</td>
		<td>
			<ul>
				{
					props.links.map((link, index) => {
						return <li key={index}>{link}</li>
					})
				}
			</ul>
		</td>
	</tr>)
}
export default Header