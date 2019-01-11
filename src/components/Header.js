import React from 'react'

function Header(props) {
    let index
    if(process.env.NODE_ENV === "development"){
        console.log('dev')
        index = "/index"
    } else if(process.env.NODE_ENV === "production"){
        console.log('prod')
        index = `https://chrisdel101.github.io`
    } else {
        console.error('No NODE_ENV set')
    }
	return (<div className="Header">
        <div className="header-cell logo">
                {/*<a href={window.location.host + '/' + process.env.PUBLIC_URL}>*/}
                <a href={index + process.env.PUBLIC_URL}>

                <img src="https://news.ycombinator.com/y18.gif"/>
            </a>
        </div>
		<div className="header-cell app-name">
            <a href={index + process.env.PUBLIC_URL}>
                <strong>{props.Appname}</strong>
            </a>
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
