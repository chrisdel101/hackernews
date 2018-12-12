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
    },
    {
        path:'/new',
        component: Page,
        fetchData: utils.fetchData("https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty")
    },
    {
        path:'/show',
        component: Page,
        fetchData: utils.fetchData("https://hacker-news.firebaseio.com/v0/showstories.json?print=pretty")
    }

]
function Router(){
    console.log('fetch', routes[1].fetchData.then(i => console.log(i)))
    return(
        <BrowserRouter>
        <Switch>
            <Route path="/" render={() => <Page data={routes[0].fetchData} />} />
            <Route path="/newest" render={() => <Page data={routes[1].fetchData} />} />
            <Route path="/show" render={() => <Page data={routes[2].fetchData} />} />
        </Switch>
        </BrowserRouter>
    )
}

export default Router



// <Route path="/newest" component={Newest}/>
// <Route path="/show"   component={Show}/>
// <Route path="/ask"    component={Ask}/>
// <Route path="/job"    component={Job}/>
