import React from "react"
import classnames from "classnames"
import './elementsStyle.css'

export default class InputElement extends React.Component
{
  constructor(props)
  {
    super(props)
    
    this.state = {
      text:props.buttonName,
      itype:props.itype,
      dValue:props?.dValue,
      iname:props.iname,
      clearInput: props.dValue === undefined,
      elid:props.elid,
      elclass:props.elclass,
      mclass:props.mclass
    }
    this.getInput = this.getInput.bind(this)
  }

  getInput = (e) => {
    this.setState({clearInput:(e.target.value.length === 0)})
  }

  render()
  {
    return (
    <div className={this.state.mclass}>
      <span className={classnames("--visibled", {
            "--hidden": !this.state.clearInput
          })}>{this.state.text}</span>
      <input type={this.state.itype} className={this.state.elclass} name={this.state.iname} id={this.state.elid} onChange={this.getInput} defaultValue={this.state.dValue} autoComplete='off'></input>
    </div>);
  }
}