import React from "react"
import "./MainMenuStyle.css"
import MainMenuElements from "./MainMenuFrame.js"
import axios from "axios"
import PostConstructor from "./components/postsConstructor"

class ForumMenu extends React.Component
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
    this.postCreateLink = this.postCreateLink.bind(this)
    this.setList = this.setList.bind(this)
  }

  postCreateLink = () => {
    if(this.state.uid)
    {
      return "/new-post-create?id=" + this.state.uid
    }
    else
    {
      return ""
    }
  }

  
  setList = () => {
    let elem = [this.state.data.length]

    for(let i = 0; i < this.state.data.length; i++)
    {
      let el = this.state.data[i]
      elem[i] = (<PostConstructor socket={this.state.socket} key={el.postID} idPost={el.postID} titleName={el.postname} textData={el.data} textAuthor={el.username} authorId={el.userid} />)
    }
    return elem
  }

  componentDidMount()
  {
    const id = JSON.parse(localStorage.getItem("cow-bull--user-id"))
    this.setState({
      uid: id
    })

    axios.post("http://192.168.1.6:3001/posts", {currentId: this.state.minId})
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
    const elem = MainMenuElements()
    const linkCreate = this.postCreateLink()
    
    elem[1] = (
      <main>
        <div className='main--footer'><p>Форум</p></div>
        <a href={linkCreate} id='main--post-creator'>Новое обсуждение</a>
        {this.setList()}
      </main>
    )
    return elem
  }
}

export default ForumMenu