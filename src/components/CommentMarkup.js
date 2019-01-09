import React, {Component} from "react"
import utils from '../utils'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

//
// class CommentMarkup extends Component {
//     constructor(props) {
//         console.log('p', props)
// 		super(props);
// 		this.state = {
// 			original: ""
// 		};
//         // console.log('props', props.post.post)
//         let that = this
//         this.post = props.post.post
//         this.index = props.post.index
//         this.hostURL = props.post.hostURL
//         this.getDiff = props.post.getDiff
//         // console.log('props', this.props )
// 	}
//     // goes up the tree until it find parent
//     findOriginal(parentID){
//     //call api on parent
//         return utils.getAPI(`https://hacker-news.firebaseio.com/v0/item/${parentID}.json?print=pretty`)
//         .then(item => {
//             // if parent is story done
//             if(item.type === 'story'){
//                 this.setState({
//                     original: item
//                 })
//                 return
//             } else {
//                 // call again with new parent val
//                 // return 'none'
//                 this.findOriginal(item.parent)
//
//
//             }
//         })
//
//     }
//     componentDidMount(){
//         this.findOriginal(this.post.parent)
//     }
//     slicer(str){
//         if(!str){
//             return false
//         }
//         if(str.length >= 30){
//             return str.slice(0,30)
//         } else {
//             return str
//         }
//
//
//     }
//
//     render(){
//         // if(!this.post){
//         //     console.log('nothing')
//         //     return
//         // }
//         let originalPost = this.state.original.title
//         // console.log('props', this.props)
//         return (
//             <div className={`Post ${utils.checkRoute('/comments') ? 'comment' : ''}`}>
//
//                 <div className="subtext post-child">
//                     <div className="vote">
//                         <span><img src="https://news.ycombinator.com/grayarrow2x.gif"/></span>
//                     </div>
//                     <div className="by">
//                         {this.post.by}
//                     </div>
//                     <span className="age">
//                     {''}
//                         <a href={`https://news.ycombinator.com/item?id=${this.post.id}`}>&nbsp;{this.getDiff(this.post.time)}</a>
//                     </span>
//                     <span className="parent">
//                     {''}
//                         <a href={`https://news.ycombinator.com/item?id=${this.post.parent}`}>&nbsp;parent</a>
//                     </span>
//                     {''}
//                     <span className="orignal-post">
//                     {''}
//                     <a href={this.state.original.url}>&nbsp;on: {this.slicer(this.state.original.title)}</a>
//
//                     </span>
//
//
//                 </div>
//                 <div className="text-container post-child">
//                     <div className="title">
//                     {ReactHtmlParser(this.post.text)}
//                     </div>
//                 </div>
//             </div>)
//     }
// }

function CommentMarkup(props){
    // console.log('POST', post)
    let post = props.post.post
    let index = props.post.index
           let hostURL = props.post.hostURL
            let getDiff = props.post.getDiff

    return(<div className={`Post ${utils.checkRoute('/comments') ? 'comment' : ''}`}>

        <div className="subtext post-child">
            <div className="vote">
                <span><img src="https://news.ycombinator.com/grayarrow2x.gif"/></span>
            </div>
            <div className="by">
                {post.by}
            </div>
            <span className="age">
            {''}
                <a href={`https://news.ycombinator.com/item?id=${post.id}`}>&nbsp;{getDiff(post.time)}</a>
            </span>
            <span className="parent">
            {''}
                <a href={`https://news.ycombinator.com/item?id=${post.parent}`}>&nbsp;parent</a>
            </span>
            {''}
            {/*<span className="orignal-post">
            {''}
            <a href={this.state.original.url}>&nbsp;on: {this.slicer(this.state.original.title)}</a>

            </span>
            */}


        </div>
        <div className="text-container post-child">
            <div className="title">
            {ReactHtmlParser(post.text)}
            </div>
        </div>
    </div>)
}
export default CommentMarkup
