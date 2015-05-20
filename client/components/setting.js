import React from "react";

import {settingStore as store} from "../stores/setting-store";
import {settingActions as action} from "../actions/setting-actions";
import displayName from './decorators/displayName';
import autobind from 'autobind-decorator'

const getState=(name)=>
	store.get(name);

const changeSetting=(changer)=>
	(name)=>
		()=>
			action.setting(name, changer(getState(name)));

@displayName('Setting')
export class Setting extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {value:getState(this.props.name)};
  }
  @autobind
  onStoreChange(){
    this.setState(prev=>
    	({value:getState(this.props.name)})
    );
  }
  @autobind
  componentDidMount() { 
    store.addChangeListener(this.onStoreChange);
  }
  @autobind
  componentWillUnmount() {
    store.removeChangeListener(this.onStoreChange);
  }
  render() { //return <div/>
    return <div> 
    	<div>{this.props.title}</div>
    	<div className={this.state.value?this.props.on:this.props.off} onClick={changeSetting(this.props.changer)(this.props.name)}> </div>
    </div>

  }
}