import React from 'react'

function Footer(props){
    return(
        <footer className="Footer">
        <div className="footer-links">
        {
            props.links.map((link, index) => {
                return <div className="footer-link" key={index}><a href={link.url}>{link.link}</a></div>
            })
        }
        </div>
        </footer>
    )
}

export default Footer
