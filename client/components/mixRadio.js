import React from "react";
import displayName from './decorators/displayName';
import {Setting} from './setting';

@displayName('MixRadio')
class MixRadio extends React.Component {
  render() {
      return <div>
          <h1>Mix Radio</h1>
          <Setting on='point fa fa-lg fa-thumbs-up' off='point fa fa-lg fa-thumbs-down' title='auto play' changer={value=>!value} name='autoPlay'/>
        </div>
  }
}
export default MixRadio;
