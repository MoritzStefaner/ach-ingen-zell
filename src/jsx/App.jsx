import React from 'react';
import Map from 'Map';

export default class App extends React.Component {
  render() {

  	let maps = this.props.suffixList.map((suffix)=>
  		// one Map per suffix
  		<Map key={suffix} data={this.props.data} suffix={suffix}/>
  		);

    return <div>
    		{maps}
    	</div>
  }
}
