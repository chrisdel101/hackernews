import React from 'react'
import { BrowserRouter, Route, Link, Switch } from "react-router-dom"
import Page from './Page'
import utils from '../utils'

// "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"
const routes = [
    {
        path:'/',
        component: Page,
        fetchData: utils.fetchData("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty")
    }
]
function Router(){
    return(
        <BrowserRouter>
            <Route path="/" render={() => <Page data={routes[0].fetchData} />} />
        </BrowserRouter>
    )
}

export default Router



// <Route path="/newest" component={Newest}/>
// <Route path="/show"   component={Show}/>
// <Route path="/ask"    component={Ask}/>
// <Route path="/job"    component={Job}/>
