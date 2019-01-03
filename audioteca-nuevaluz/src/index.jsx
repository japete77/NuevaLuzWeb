import './_config'

import React from 'react'
import ReactDOM from 'react-dom'
import { Home } from './Home'
import { Login } from './Login'
import { BrowserRouter as Router, Route, IndexRoute } from 'react-router-dom'
import { PrivateRoute } from './_components/PrivateRoute'

ReactDOM.render(
    <Router>
        <div>
            <PrivateRoute path="/" exact component={Home} />
            <Route path="/login/" component={Login} />
        </div>
    </Router>,
    document.getElementById('react-container')
)