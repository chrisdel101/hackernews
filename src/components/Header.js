import React from 'react'
function Header(props) {
	return (<tr className="Header">
        <td className="header-cell logo">
            <a href="https://news.ycombinator.com">
                <img src="https://news.ycombinator.com/y18.gif"/>
            </a>
        </td>
		<td className="header-cell app-name">
            <strong>{props.Appname}</strong>
        </td>
		<td className="header-cell">Login</td>
            <tr className="header-links">
            {
                props.links.map((link, index) => {
                    return <td className="header-cell header-link" key={index}>{link}</td>
                })
            }
            </tr>
	</tr>)
}
export default Header
