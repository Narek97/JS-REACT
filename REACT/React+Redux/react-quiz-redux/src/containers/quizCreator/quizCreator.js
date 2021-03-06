import React, {Component} from 'react';
import classes from './quizCreator.css'
import Button from "../../components/UI/button/button";
import {createControl, validate, validateForm} from "../../form/formFramwork";
import Input from "../../components/UI/input/input";
import Auxiliary from "../../HOC/Auxiliary/auxiliary";
import Select from "../../components/UI/select/select";
import {connect} from "react-redux";
import {createQuizQuestion, finishCreateQuiz} from "../../reduxStore/actions/createAction";

function createOptionsControl(number) {
    return createControl({
        label: `Вариант ${number}`,
        errorMessage: 'Значение не может быть пустым',
        id: number
    }, {required: true})
}

function createFormControls() {
    return {
        question: createControl({
            label: 'Введите вапрос',
            errorMessage: 'Вопрос не может быть пустым'
        }, {required: true}),
        option1: createOptionsControl(1),
        option2: createOptionsControl(2),
        option3: createOptionsControl(3),
        option4: createOptionsControl(4),
    }
}

class QuizCreator extends Component {

    state = {
        isFormValid: false,
        rightAnswerId: 1,
        formControls: createFormControls()
    }

    submitHandler = (e) => {
        e.preventDefault();
    }

    addQuestionHandler = (e) => {
        e.preventDefault();

        const {question, option1, option2, option3, option4} = this.state.formControls

        const questionItem = {
            question: question.value,
            id: this.props.quiz.length + 1,
            rightAnswerId: this.state.rightAnswerId,
            answer: [
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id}
            ]
        }
        this.props.createQuizQuestion(questionItem)
        this.setState({
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createFormControls()
        })

    }

    createQuizHandler = (e) => {
        e.preventDefault();
        this.setState({
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createFormControls()
        })
        this.props.finishCreateQuiz()
    }

    changeHandler = (value, controlName) => {
        const formControls = {...this.state.formControls}
        const control = {...formControls[controlName]}

        control.touched = true
        control.value = value
        control.valid = validate(control.value, control.validation)

        formControls[controlName] = control

        this.setState({
            formControls,
            isFormValid: validateForm(formControls)
        })
    }

    renderControls() {

        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];

            return (
                //kara Auxiliary texy React.Fragment lini
                <Auxiliary key={index}>
                    <Input

                        label={control.label}
                        value={control.value}
                        valid={control.valid}
                        shouldValidate={!!control.validation}
                        touched={control.touched}
                        errorMessage={control.errorMessage}
                        onChange={e => this.changeHandler(e.target.value, controlName)}
                    />
                    {
                        index === 0 ? <hr/> : null
                    }
                </Auxiliary>

            )
        })
    }


    selectChangeHandler = (e) => {
        this.setState({
            rightAnswerId: +e.target.value
        })
    }


    render() {

        const select = <Select
            label={'выбирайте правильный ответ'}
            value={this.state.rightAnswerId}
            onChange={this.selectChangeHandler}
            options={[
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3},
                {text: 4, value: 4}
            ]}
        />

        return (
            <div className={classes.QuizCreator}>
                <div>
                    <h1>Создание тестов</h1>

                    <form onSubmit={this.submitHandler}>

                        {
                            this.renderControls()
                        }
                        {select}
                        <Button
                            type="primary"
                            onClick={this.addQuestionHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Добавить вопрос
                        </Button>

                        <Button
                            type="sucsess"
                            onClick={this.createQuizHandler}
                            disabled={this.props.quiz.length === 0}

                        >
                            Создать тест
                        </Button>

                    </form>
                </div>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        quiz: state.create.quiz
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createQuizQuestion: item => dispatch(createQuizQuestion(item)),
        finishCreateQuiz: () => dispatch(finishCreateQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator);
