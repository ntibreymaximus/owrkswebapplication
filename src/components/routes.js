import React, { Component } from 'react'
import { BrowserRouter as Router, Route,Switch} from 'react-router-dom'
import Dashboard from './dashboard'
import Login from './login'
import { AuthProvider } from "./Context/AuthContext";


export default class Routes extends Component {
    render() {
        return (
            <div>
                <Router>
                    <AuthProvider>
                        <Switch>
                        <Route path="/" exact component={Login}/>
                        <Route path="/dashboard/home" component={Dashboard}/>
                    </Switch>
                    </AuthProvider>
                    
                    
                </Router>
            </div>
        )
    }
}  
