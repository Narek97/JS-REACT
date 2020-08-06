import React from 'react'
import {StarshipList} from "../sw-components";
import {withRouter} from 'react-router-dom'


const StarshipsPage = ({history}) => {

    return (
        <StarshipList onItemSelected={(itemId) => {
            history.push(itemId)
        }}
        />
    )
}

export default withRouter(StarshipsPage)

////.................................................................
// import React, {Component} from 'react'
// import {Row} from "../Row/row";
// import {StarshipList} from "../sw-components";
// import StarshipDetails from "../sw-components/starship-details";
//
// export default class StarshipsPage extends Component {
//     state = {
//         selectedItem: 10
//     }
//
//     onItemSelected = (selectedItem) => {
//         this.setState({selectedItem: selectedItem});
//     }
//
//     render() {
//         const {selectedItem} = this.state;
//
//         return (
//             <Row
//                 left={<StarshipList onItemSelected={this.onItemSelected}/>}
//                 right={<StarshipDetails itemId={selectedItem}/>}
//             />
//         )
//     }
// }

