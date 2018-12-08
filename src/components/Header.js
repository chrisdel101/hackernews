import React from 'react'
function Header(props) {
	return (<tr className="Header">
        <td className="header-cell">Y-Icon</td>
		<td className="header-cell">{props.Appname}</td>
		<td className="header-cell">Login</td>
				{
					props.links.map((link, index) => {
						return <td className="header-cell" key={index}>{link}</td>
					})
				}
	</tr>)
}
export default Header
