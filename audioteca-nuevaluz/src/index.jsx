import './_config'

import React from 'react'
import ReactDOM from 'react-dom'
import { Home } from './Home'
import { Login } from './Login'
import { ChangePassword } from './ChangePassword'
import { BrowserRouter as Router, Route, IndexRoute } from 'react-router-dom'
import { PrivateRoute } from './_components/PrivateRoute'

ReactDOM.render(
    <Router>
        <div>
            <PrivateRoute path="/" exact component={Home} />
            <Route path="/login/" component={Login} />
            <Route path="/change-password/" component={ChangePassword} />
        </div>
    </Router>,
    document.getElementById('react-container')
)