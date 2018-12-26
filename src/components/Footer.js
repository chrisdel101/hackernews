import React from 'react'

function Footer(props){
    return(
        <div className="Footer">
        <div className="footer-links">
        {
            props.links.map((link, index) => {
                return <div className="footer-link" key={index}><a href={link.url}>{link.link}</a></div>
            })
        }
        </div>
        </div>
    )
}

export default Footer
