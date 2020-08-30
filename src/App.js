import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'


class App extends React.Component{

  state = {
    display: false,
    toyArray: []
  };
  

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

     
      // posting new toy in db and DOM
  handleSubmit = event => {event.preventDefault()
    let toyArrayCopy = [...this.state.toyArray]      
    let newId = toyArrayCopy.pop().id
   
   let newToy =  {id: newId+1, name: event.target[0].value, image: event.target[1].value, likes:0}
   let options=  { method: "POST",
                    headers: {"Content-Type": "application/json",
                    Accept: "application/json"
                   },
                   body: JSON.stringify(newToy)
                  }
    fetch("http://www.localhost:8000/toys", options )
    .then(response => response.json())
    .then (resp => { 
      let newArray = [ ...this.state.toyArray, resp] 
      this.setState({...this.state, 
                      toyArray: newArray  }) 
                   })
                
        }
          //deleting from db and DOM
  handleDelete = (toyId) => {
         let options= { method:"DELETE"}
    fetch("http://www.localhost:8000/toys/" + toyId, options )
    .then(resp => resp.json())
   
    let newArray = this.state.toyArray.filter((obj)=> { return obj.id !== toyId; }); 
    this.setState({...this.state, 
                    toyArray: newArray
                   })
  }
           //increasing likes 
  handleLikes = (toy) =>{
  
    toy.likes  +=1 
    this.setState({...this.state, 
                   toyArray: this.state.toyArray
                  })
   let toyId = toy.id
   let options=  { method: "PATCH",
                    headers: {"Content-Type": "application/json",
                    Accept: "application/json"
                   },
                   body: JSON.stringify({likes: toy.likes})
                  }
    fetch("http://www.localhost:8000/toys/"+toyId, options )
    .then(response => response.json())
    
      
  }

  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm handleSubmit = {this.handleSubmit}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer card = {this.state.toyArray} 
                      handleDelete = {this.handleDelete}
                      handleLikes= {this.handleLikes}/>
      </>
    );
  }
  
  componentDidMount(){ 
  
    fetch("http://www.localhost:8000/toys"  )
  .then(response => response.json())
  .then(response => {this.setState({...this.state, 
                                    toyArray: response 
                                  })
       })
  }
  


}

export default App;
