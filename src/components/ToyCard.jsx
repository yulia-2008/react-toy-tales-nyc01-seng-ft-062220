import React, { Component } from 'react';

class ToyCard extends Component {

  render() {
    
let toy = this.props.obj;
let toyId = this.props.obj.id

    return (
      <div className="card">
        <h2>{this.props.obj.name}</h2>
        <img src={this.props.obj.image} alt={this.props.obj.name} className="toy-avatar" />
        <p>{this.props.obj.likes} Likes </p>
        <button className="like-btn" onClick = {() => this.props.handleLikes(toy)}>Like {'<3'} </button>
        <button className="del-btn" onClick = {() => this.props.handleDelete(toyId)}>Donate to GoodWill</button>
      </div>
    );
  }

}

export default ToyCard;
