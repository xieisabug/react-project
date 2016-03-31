/**
 * Created by Gene on 16/3/14.
 */

/// <reference path="../../typings/tsd.d.ts" />

import { Router, Route, hashHistory, IndexRoute } from 'react-router';

import AppComponent from './app.component';
import AboutComponent from './about.component';
import ReposComponent from './repos.component';
import RepoComponent from './repo.component';
import HomeComponent from './home.component';

ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/" component={AppComponent}>
            <IndexRoute component={HomeComponent} />
            <Route path="/repos" component={ReposComponent}>
                <Route path=":userName/:repoName" component={RepoComponent} />

            </Route>
            <Route path="/about" component={AboutComponent} />
        </Route>
    </Router>
), document.getElementById('container'));