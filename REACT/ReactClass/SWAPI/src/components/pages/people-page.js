import React from 'react'
import {Row} from "../Row/row";
import {PersonList} from "../sw-components";
import PersonDetails from "../sw-components/person-details";
import {withRouter} from 'react-router-dom'

const PeoplePage = ({history, match}) => {

    const {id} = match.params;

    return (
        <Row
            left={<PersonList onItemSelected={(id) => history.push(id)}/>}
            right={<PersonDetails itemId={id}/>}
        />
    )

}

export default withRouter(PeoplePage)

//................................................................
// import React, {Component} from 'react'
// import {Row} from "../Row/row";
// import {PersonList} from "../sw-components";
// import PersonDetails from "../sw-components/person-details";
//
// export default class PeoplePage extends Component {
//     state = {
//         selectedItem: 1
//     }
//
//     onItemSelected = (selectedItem) => {
//         this.setState({selectedItem: selectedItem});
//     }
//
//     render() {
//         const {selectedItem} = this.state;
//         return (
//             <Row
//                 left={<PersonList onItemSelected={this.onItemSelected}/>}
//                 right={<PersonDetails itemId={selectedItem}/>}
//             />
//         )
//     }
// }

