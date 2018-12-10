import React from 'react'

function Header(props) {
	return (<div className="Header">
        <div className="header-cell logo">
            <a href="https://news.ycombinator.com">
                <img src="https://news.ycombinator.com/y18.gif"/>
            </a>
        </div>
		<div className="header-cell app-name">
            <strong>{props.Appname}</strong>
        </div>
		<div className="header-cell login">
        <a href="#">login</a>
        </div>
            <div className="header-links">
            {
                props.links.map((link, index) => {
                    return <div className="header-cell header-link" key={index}><a href={link.url}>{link.link}</a></div>
                })
            }
            </div>
	</div>)
}
export default Header
