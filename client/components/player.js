import React from "react";
import displayName from './decorators/displayName';
import {settingStore as store} from "../stores/setting-store";
import autobind from 'autobind-decorator'

const play=(self)=>
  ()=>
    self.setState(prev=>({play:true}))

@displayName('Player')
export default class Player extends React.Component {
  constructor(props)
  {
    super(props);
    this.state={
      play:store.get('autoPlay')
    }
  }
  @autobind
  componentDidMount()
  {
    //if(store.get('autoPlay'))
    //  this.refs.player.getDOMNode().play();
  }
  render() {
    return this.state.play
      ? <audio ref='player' autoPlay controls src={this.props.src}/> 
      : <div className={this.props.playClass} onClick={play(this)}/>;
  }
}
