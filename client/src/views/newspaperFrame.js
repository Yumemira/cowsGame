import React from "react"
import "./newspaperStyle.css"
import MainMenuElements from "./MainMenuFrame"
import PostConstructor from "./components/postsConstructor"
import axios from "axios"
export default class Newspaper extends React.Component
{
  constructor(props)
  {
    super(props)

    this.state = {
        uid:"",
        minId: 0,
        bottomPost: false,
        socket: this.props.socket,
        data: {}
    }
    this.setList = this.setList.bind(this)
  }

  setList = function()
  {
    let elem = [this.state.data.length]

    for(let i = 0; i < this.state.data.length; i++)
    {
      let el = this.state.data[i]
      elem[i] = (<PostConstructor key={el.postID} idPost={el.postID} titleName={el.title} textData={el.data} textAuthor={el.author} socket={this.state.socket}/>)
    }
    return elem
  }

  componentDidMount(){
    axios.post("http://192.168.1.3:3001/maintainceposts", {currentId: this.state.minId})
    .then(res => {
      if(res.data.list.length < 20)
      {
        this.setState({
          bottomPost: true,
          data: res.data.list
        })
      }
      else
      {
        this.setState({
          minId: 20,
          data: res.data.list
        })
      }
    })
  }

  render(){
    let elems = MainMenuElements()
    
    elems[1] = (
        <main id='table--content'>
            <div className='main--header'><p id='content--page-name'>Новости</p></div>
            {this.setList()}
        </main>
      )

    return elems
  }
}