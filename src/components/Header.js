import React from 'react'

function Header(props) {
    function setIndexRoute(){
        let index
        if(process.env.NODE_ENV === "development"){
            index = "/index"
        } else if(process.env.NODE_ENV === "production"){
            index = `https://chrisdel101.github.io`
        } else {
            console.error('No NODE_ENV set')
        }
        return index
    }
	return (<div className="Header">
        <div className="header-cell logo">
                {/*<a href={window.location.host + '/' + process.env.PUBLIC_URL}>*/}
                <a href={setIndexRoute() + process.env.PUBLIC_URL}>

                <img src="https://news.ycombinator.com/y18.gif"/>
            </a>
        </div>
		<div className="header-cell app-name">
            <a href={setIndexRoute() + process.env.PUBLIC_URL}>
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
