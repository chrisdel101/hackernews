(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{1:function(e,t){function n(e){return fetch(e).then(function(e){return e.json()}).then(function(e){return e})}function a(e){return fetch(e).then(function(e){return e.json()}).then(function(e){return e})}function o(e){var t="https://hacker-news.firebaseio.com/v0/item/".concat(e,".json?print=pretty");return fetch(t).then(function(e){return e.json()}).then(function(e){return e})}!function(){var e=0}();e.exports={range:function(e,t,n){return Array.from({length:(t-e)/n},function(t,a){return e+a*n})},getAPI:n,getDiff:function(e){var t=function(e){var t=new Date(1e3*e),n=t.getFullYear(),a=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][t.getMonth()];return t.getDate()+" "+a+" "+n+" "+t.getHours()+":"+t.getMinutes()+":"+t.getSeconds()}(e),n=new Date(t).getTime();return function(e){var t=(e/1e3).toFixed(),n=(e/6e4).toFixed(),a=(e/36e5).toFixed(),o=(e/864e5).toFixed();return t<60?"".concat(t," seconds ago"):n<60?"".concat(n," minutes ago"):a<24?"".concat(a," hours ago"):"".concat(o," days ago")}((new Date).getTime()-n)},elementsRandomColor:function(e){(e=Array.from(e)).map(function(e){return console.log(e),e.style.backgroundColor="#"+Math.floor(16777215*Math.random()).toString(16)})},getTopIDs:a,getStory:o,fetchData:function(e){console.log(e);var t=[];return new Promise(function(n,r){a(e).then(function(e){e.map(function(e,t){return e}).map(function(e,n){o(e).then(function(e){t.push(e)}).catch(function(e){return console.error(e)})})}),setTimeout(function(){n(t)},2e3)})},walkBackComments:function(){return n("https://hacker-news.firebaseio.com/v0/maxitem.json?print=pretty").then(function(e){for(var t=[],n=0;n<100;){var a=e-n;t.push(a),n++}var r=t.map(function(e){return o(e).then(function(e){if(e&&"comment"===e.type)return e})});return console.log("walk back okay"),r})},hostURL:function(e){if(!e)return"";var t=new URL(e).hostname;return t=t.replace(/^(www\.)/,"")},commentsLink:function(e){return e.kids?"".concat(e.kids.length," comments"):"discuss"},checkRoute:function(e){return window.location.pathname===e},checkLoaded:function(e){return Array.isArray(e)?!!e.length:Array.isArray(e)?void 0:!function(e){for(var t in e)if(e.hasOwnProperty(t))return!1;return!0}(e)},filterShowStories:function(){n(" https://hacker-news.firebaseio.com/v0/showstories.json?print=pretty").then(function(e){Promise.all(e.map(function(e){return o(e).then(function(e){return e})})).then(function(e){return e.sort(function(e,t){return e.time-t.time}).reverse()})})},encodeStr:function(e,t){return encodeURI("".concat(e).concat(t))},paginate:function(e){var t=this.state.counter+30;console.log("count",t);var n=t-30,a=t;return{chunkComments:e.slice(n,a),counter:t}}}},34:function(e,t,n){e.exports=n(85)},39:function(e,t,n){},49:function(e,t){},79:function(e){e.exports={}},83:function(e,t,n){},85:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(31),c=n.n(r),s=(n(39),n(8)),i=n(9),l=n(12),m=n(10),u=n(11),h=n(15),f=n(6),p=n(1),d=n.n(p);var k=function(e){var t=e.post.post,n=e.post.index,a=e.post.hostURL,r=e.post.getDiff,c=e.post.commentsLink;function s(e,t,n){return o.a.createElement("div",{className:e,key:n},o.a.createElement("a",{href:t},"\xa0",e))}return o.a.createElement("div",{className:"Post",key:n},o.a.createElement("div",{className:"rank"},d.a.checkRoute("/jobs")&&d.a.checkRoute("/comments")?null:o.a.createElement("div",null,n,".")),o.a.createElement("div",{className:"vote"},o.a.createElement("a",{href:"https://news.ycombinator.com/vote?id=".concat(t.id,"&how=up&goto=news")},o.a.createElement("div",null,o.a.createElement("img",{src:"https://news.ycombinator.com/grayarrow2x.gif"})))),o.a.createElement("div",{className:"text-container"},o.a.createElement("div",{className:"title"},o.a.createElement("a",{className:"Post-link",href:t.url,target:"_blank",rel:"noopener noreferrer"},t.title),o.a.createElement("a",{id:"host-url",href:"http://".concat(a(t.url)),target:"_blank",rel:"noopener noreferrer"},"\xa0",a(t.url)?"(".concat(a(t.url),")"):null)),o.a.createElement("div",{className:"subtext"},o.a.createElement("div",{className:"score"},t.score,"\xa0points by ","",o.a.createElement("a",{href:"https://news.ycombinator.com/user?id=".concat(t.by)},"",t.by)),o.a.createElement("div",{className:"age"},"",o.a.createElement("a",{href:"https://news.ycombinator.com/item?id=".concat(t.id)},"\xa0",r(t.time))),"/"===window.location.pathname||"/news"===window.location.pathname?s("hide","https://news.ycombinator.com/hide?id=".concat(t.id,"&goto=newest"),n):null,"/newest"===window.location.pathname?[s("hide","https://news.ycombinator.com/hide?id=".concat(t.id,"&goto=newest"),n),s("past",d.a.encodeStr("https://hn.algolia.com/?query=",t.title),n+100),s("web",d.a.encodeStr("https://www.google.com/search?q=",t.title),n+200)]:null,o.a.createElement("div",{className:"comment"},o.a.createElement("a",{href:"https://news.ycombinator.com/item?id=".concat(t.id)},"\xa0",c(t))))))},w=n(32),g=n.n(w),v=function(e){function t(e){var n;Object(s.a)(this,t),(n=Object(l.a)(this,Object(m.a)(t).call(this,e))).state={original:""};Object(f.a)(Object(f.a)(n));return n.index=e.post.index,n.hostURL=e.post.hostURL,n.getDiff=e.post.getDiff,n}return Object(u.a)(t,e),Object(i.a)(t,[{key:"findOriginal",value:function(e){var t=this;return d.a.getAPI("https://hacker-news.firebaseio.com/v0/item/".concat(e,".json?print=pretty")).then(function(e){"story"!==e.type?t.findOriginal(e.parent):t.setState({original:e})})}},{key:"componentDidMount",value:function(){this.findOriginal(this.props.post.post.parent)}},{key:"slicer",value:function(e){return!!e&&(e.length>=30?e.slice(0,30):e)}},{key:"render",value:function(){this.state.original.title;var e=this.props.post.post;return o.a.createElement("div",{className:"Post ".concat(d.a.checkRoute("/comments")?"comment":"")},o.a.createElement("div",{className:"subtext post-child"},o.a.createElement("div",{className:"vote"},o.a.createElement("span",null,o.a.createElement("img",{src:"https://news.ycombinator.com/grayarrow2x.gif"}))),o.a.createElement("div",{className:"by"},e.by),o.a.createElement("span",{className:"age"},"",o.a.createElement("a",{href:"https://news.ycombinator.com/item?id=".concat(e.id)},"\xa0",this.getDiff(e.time))),o.a.createElement("span",{className:"parent"},"",o.a.createElement("a",{href:"https://news.ycombinator.com/ q  q item?id=".concat(e.parent)},"\xa0parent")),"",o.a.createElement("span",{className:"orignal-post"},"",o.a.createElement("a",{href:this.state.original.url},"\xa0on: ",this.slicer(this.state.original.title)))),o.a.createElement("div",{className:"text-container post-child"},o.a.createElement("div",{className:"title"},g()(e.text))))}}]),t}(a.Component);var E=function(e){var t;console.log("props",e),console.log("test post");var n=e.data;return Array.isArray(e.data)||(t=e.data.indexes,n=e.data.chunkData),n.map(function(e,n){return function(e,n){return d.a.checkRoute("/comments")?o.a.createElement(v,{key:n,post:{post:e,index:n,hostURL:d.a.hostURL,getDiff:d.a.getDiff,commentsLink:d.a.commentsLink}}):o.a.createElement(k,{key:n,post:{post:e,index:t[n],hostURL:d.a.hostURL,getDiff:d.a.getDiff,commentsLink:d.a.commentsLink}})}(e,n)})};var y=function(e){return o.a.createElement("div",{className:"Header"},o.a.createElement("div",{className:"header-cell logo"},o.a.createElement("a",{href:"/"},o.a.createElement("img",{src:"https://news.ycombinator.com/y18.gif"}))),o.a.createElement("div",{className:"header-cell app-name"},o.a.createElement("a",{href:"/"},o.a.createElement("strong",null,e.Appname))),o.a.createElement("div",{className:"header-cell login"},o.a.createElement("a",{href:"#"},"login")),o.a.createElement("div",{className:"header-links"},e.links.map(function(e,t){return o.a.createElement("div",{className:"header-cell header-link",key:t},o.a.createElement("a",{href:e.url},e.link))})))};var b=function(e){return o.a.createElement("footer",{className:"Footer"},o.a.createElement("div",{className:"footer-links"},e.links.map(function(e,t){return o.a.createElement("div",{className:"footer-link",key:t},o.a.createElement("a",{href:e.url},e.link))})))},D=(n(79),function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(l.a)(this,Object(m.a)(t).call(this,e))).state={counter:0,fullData:[],chunkData:[],fullComments:[],chunkComments:[],stories:"",headerLinks:[{link:"new",url:"/newest"},{link:"comments",url:"/comments"},{link:"show",url:"/show"},{link:"ask",url:"/ask"},{link:"jobs",url:"/jobs"},{link:"submit",url:"https://news.ycombinator.com/submit"}],footerLinks:[{link:"Guildlines",url:"https://news.ycombinator.com/newsguidelines.html"},{link:"FAQ",url:"https://news.ycombinator.com/newsfaq.html"},{link:"Support",url:"mailto:hn@ycombinator.com"},{link:"API",url:"https://github.com/HackerNews/API"},{link:"Security",url:"https://news.ycombinator.com/security.html"},{link:"Lists",url:"https://news.ycombinator.com/lists"},{link:"Bookmarklet",url:"https://news.ycombinator.com/bookmarklet.html"},{link:"Legal",url:"http://www.ycombinator.com/legal/"},{link:"Apply to YC",url:"http://www.ycombinator.com/apply/"},{link:"Contact",url:"mailto:hn@ycombinator.com"}]},n.updatePageState=n.updatePageState.bind(Object(f.a)(Object(f.a)(n))),n}return Object(u.a)(t,e),Object(i.a)(t,[{key:"getData",value:function(e){var t=this;d.a.getAPI("https://hacker-news.firebaseio.com/v0/maxitem.json?print=pretty").then(function(n){Promise.all(Array.from({length:100},function(e,t){return n-t}).map(function(t){return d.a.getStory(t).then(function(t){if(t)if("comment"===e){if("comment"===t.type)return t}else if("show"===e&&"comment"!==t.type)return t})})).then(function(n){if("comment"===e){var a=n.filter(function(e){return e}),o=t.paginate(a);console.log("counterAndChunk",o),t.setState({fullComments:Object(h.a)(a),chunkComments:Object(h.a)(o.chunkComments),counter:o.counter,indexes:o.indexes}),console.log("state",t.state)}else if("show"===e){console.log("show");n.map(function(e){e&&console.log(e.title)})}else console.error("Error: fetch type needed")})})}},{key:"filterShowStories",value:function(){var e=this;d.a.getAPI(" https://hacker-news.firebaseio.com/v0/showstories.json?print=pretty").then(function(t){Promise.all(t.map(function(e){return d.a.getStory(e).then(function(e){return e})})).then(function(t){t=t.sort(function(e,t){return e.time-t.time}).reverse(),e.setState(function(e){return{stories:Object(h.a)(e.stories).concat([t])}})})})}},{key:"paginate",value:function(e){var t=this.state.counter+30;console.log("count",t);var n=t-30,a=t,o=d.a.range(n+1,a+1,1),r=e.slice(n,a);return d.a.checkRoute("/comments")?{chunkComments:r,counter:t,indexes:o}:{chunkData:r,counter:t,indexes:o}}},{key:"colorLinks",value:function(){var e=window.location.pathname;document.querySelector("a[href='"+e+"']").style.color="#ffffff"}},{key:"updatePageState",value:function(e){var t;if(console.log("update",e),d.a.checkRoute("/comments")){t=e.fullComments;var n=this.paginate(t);console.log("new",n.chunkComments),this.setState({chunkComments:n.chunkComments,counter:n.counter,indexes:n.indexes})}else{t=e.chunkData;var a=this.paginate(t);this.setState({chunkData:a})}}},{key:"componentDidMount",value:function(){var e=this;d.a.checkRoute("/comments")?this.getData("comment"):d.a.checkRoute("/shownew")?this.getData("show"):(console.log("TEST ABOVE"),console.log("not comments"),console.log("props",this.props),console.log("env",Object({NODE_ENV:"production",PUBLIC_URL:"/hackernews"})),console.log("TEST BELOW"),this.props.data.then(function(t){e.setState({fullData:t},function(){var t=e.paginate(e.state.fullData);e.setState({chunkData:t})})}).catch(function(e){return console.error("error: ".concat(e))}))}},{key:"ShowPageText",value:function(){return"/show"===window.location.pathname?o.a.createElement("div",{className:"show-added-text"},"Please read the"," ",o.a.createElement("a",{href:"https://news.ycombinator.com/showhn.html"}," rules"),". You can also browse the"," ",o.a.createElement("a",{href:"/shownew"},"newest")," ","Show HNs."," "):null}},{key:"renderBodyContent",value:function(){return d.a.checkRoute("/comments")?d.a.checkLoaded(this.state.fullComments)?o.a.createElement("div",null,o.a.createElement(this.ShowPageText,null),console.log("Render - Comment")," ",o.a.createElement(E,{data:this.state.chunkComments})," "):o.a.createElement("div",null," Fetching Comments API Data "):d.a.checkRoute("/shownew")?d.a.checkLoaded(this.state.stories)?o.a.createElement("div",null,console.log("Render - show new")," ",o.a.createElement(E,{data:this.state.stories})," "):void 0:d.a.checkLoaded(this.state.fullData)?d.a.checkLoaded(this.state.chunkData)?(console.log("STATE",this.state),o.a.createElement("div",null,o.a.createElement(this.ShowPageText,null),console.log("Render-Data")," "," ",o.a.createElement(E,{data:this.state.chunkData})," ")):o.a.createElement("div",null," Fetching API Data "):o.a.createElement("div",null," Fetching Data API Data ")}},{key:"clickFunc",value:function(){d.a.checkRoute("/comments")?this.updatePageState(this.state.fullComments,"chunkComments"):this.updatePageState(this.state.fullData,"chunkData")}},{key:"render",value:function(){var e=this;return o.a.createElement("div",{className:"Page"},o.a.createElement("div",{className:"page-inner-container"},o.a.createElement("div",{className:"header-container"},o.a.createElement(y,{Appname:"Hacker News",links:this.state.headerLinks})," ")," ",o.a.createElement("div",{className:"body-container"}," ",this.renderBodyContent(),o.a.createElement("div",{id:"paginator",onClick:function(){e.updatePageState(e.state)}},"More"))," ",o.a.createElement(b,{links:this.state.footerLinks}))," ")}}]),t}(a.Component)),j=n(87),N=n(88);var S=function(){return o.a.createElement(j.a,{basename:"/hackernews"},o.a.createElement("div",null,o.a.createElement(N.a,{exact:!0,path:"/",component:function(){return o.a.createElement(D,{data:d.a.fetchData("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty")})}}),o.a.createElement(N.a,{path:"/newest",component:function(){return o.a.createElement(D,{data:d.a.fetchData("https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty")})}}),o.a.createElement(N.a,{path:"/show",component:function(){return o.a.createElement(D,{data:d.a.fetchData("https://hacker-news.firebaseio.com/v0/showstories.json?print=pretty")})}}),o.a.createElement(N.a,{path:"/shownew",component:D}),o.a.createElement(N.a,{path:"/ask",component:function(){return o.a.createElement(D,{data:d.a.fetchData("https://hacker-news.firebaseio.com/v0/askstories.json?print=pretty")})}}),o.a.createElement(N.a,{path:"/jobs",component:function(){return o.a.createElement(D,{data:d.a.fetchData("https://hacker-news.firebaseio.com/v0/jobstories.json?print=pretty")})}}),o.a.createElement(N.a,{path:"/comments",component:D}),o.a.createElement(N.a,{path:"/best",component:function(){return o.a.createElement(D,{data:d.a.fetchData("https://hacker-news.firebaseio.com/v0/beststories.json?print=pretty")})}})))},x=(n(83),function(e){function t(){return Object(s.a)(this,t),Object(l.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"App"},o.a.createElement(S,null))}}]),t}(a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(o.a.createElement(x,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[34,2,1]]]);
//# sourceMappingURL=main.3f7713bd.chunk.js.map