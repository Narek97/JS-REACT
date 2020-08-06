import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import {ErrorBoundry} from "../errorBoundry/errorBoundry";
import ErrorIndicator from '../error-indicator';

import SwapiService from "../../services/swapi-service";

import {SwapiServiceProvider} from "../swapi-service-context/swapi-service-context";
import PeoplePage from "../pages/people-page";
import PlanetsPage from "../pages/planets-page";
import StarshipsPage from "../pages/starships-page";

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import './app.css';
import StarshipDetails from "../sw-components/starship-details";
import LoginPage from "../pages/login-pahe";
import SecretPage from "../pages/secret-page";
import Redirect from "react-router-dom/es/Redirect";

export default class App extends Component {

    swapiService = new SwapiService()

    state = {
        showRandomPlanet: true,
        hasError: false,
        isLoggedIn: false
    };

    onLogin = () => {
        this.setState({isLoggedIn: true});
    }

    toggleRandomPlanet = () => {
        this.setState((state) => {
            return {
                showRandomPlanet: !state.showRandomPlanet
            }
        });
    };

    componentDidCatch() {
        this.setState({hasError: true});
    }

    render() {

        const {isLoggedIn} = this.state

        if (this.state.hasError) {
            return <ErrorIndicator/>
        }

        const planet = this.state.showRandomPlanet ?
            <RandomPlanet/> :
            null;

        return (
            <ErrorBoundry>
                <SwapiServiceProvider
                    value={this.swapiService}
                >
                    <Router>
                        <Switch>
                            <div className="stardb-app">
                                <Header/>
                                {planet}
                                <button
                                    className="toggle-planet btn btn-warning btn-lg"
                                    onClick={this.toggleRandomPlanet}>
                                    Toggle Random Planet
                                </button>
                                <br/><br/>

                                <Route path="/"
                                       render={() => <h1>Welcome to StarDB</h1>}
                                       exact
                                />
                                <Route path="/people/:id?" component={PeoplePage}/>
                                <Route path="/planets" component={PlanetsPage}/>
                                <Route path="/starships" component={StarshipsPage} exact/>
                                <Route path="/starships/:id"
                                       render={({match}) => {
                                           const {id} = match.params
                                           return <StarshipDetails itemId={id}/>
                                       }}
                                />
                                <Route
                                    path="/login"
                                    render={() => <LoginPage
                                        isLoggedIn={isLoggedIn}
                                        onLogin={this.onLogin}/>
                                    }
                                />
                                <Route
                                    path="/secret"
                                    render={() => <SecretPage
                                        isLoggedIn={isLoggedIn}/>
                                    }
                                />
                                <Route render={()=><h2>Page not found</h2>} />
                            </div>
                        </Switch>
                    </Router>
                </SwapiServiceProvider>
            </ErrorBoundry>
        );
    }
}
