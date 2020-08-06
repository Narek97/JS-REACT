import React from 'react';
import Layout from "./HOC/Layout/layout";
import {Route, Switch} from 'react-router-dom'
import Quiz from "./containers/quiz/quiz";
import QuizList from "./containers/quizList/quizList";
import Auth from "./containers/auth/auth";
import QuizCreator from "./containers/quizCreator/quizCreator";


function App() {
    return (
        <Layout>
            <Switch>
                <Route path="/auth" component={Auth}/>
                <Route path="/quiz-creator" component={QuizCreator}/>
                <Route path="/quiz/:id" component={Quiz}/>
                <Route path="/" component={QuizList}/>
            </Switch>
        </Layout>
    );
}

export default App;
