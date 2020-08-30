import React from 'react';
import ToyCard from './ToyCard'


class  ToyContainer extends React.Component {
  render(){
    let cards = this.props.card.map((card) => <ToyCard key = {card.id}  
                                                       obj = {card}
                                                       handleDelete = {this.props.handleDelete}
                                                       handleLikes= {this.props.handleLikes}/>
    )
    return(
    <div id="toy-collection">
      {cards}
    </div>
  );
    }
  
}

export default ToyContainer;
