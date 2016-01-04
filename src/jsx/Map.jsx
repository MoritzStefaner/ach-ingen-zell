import React from 'react';
import d3_scale from 'd3-scale';
const colorScale = d3_scale.viridis();

export default class Map extends React.Component {
  render() {

    // percentage of suffix ocurring in each bin
    let percentages = {};
    // max percentage (for defining the color scale)
    let maxPercent = 0;
    // total number of places with suffix
    let totalCount = 0;

    this.props.data.forEach((x)=>{
      // for each bin

      const myRegexp = new RegExp(this.props.suffix.join('$|') + '$');

      // count matches with suffix
      let count = x.filter((y)=> y.label.match(myRegexp)).length;

      totalCount += count;
      percentages[x.id] = count/x.length;
      // count only bins with at least 20 villages or towns for color scale maximum
      if(x.length>20) {
        maxPercent = Math.max(maxPercent, percentages[x.id]);
      }
    });

    colorScale.domain([maxPercent, 0])

  	let dots = this.props.data.map((x)=>{
      // one dot per bin
  		let col = colorScale(percentages[x.id]);
  		return <circle key={x.id} cx={x.x} cy={x.y} r="2.5" style={{"fill": col}}/>;
  	});

    let mainLabel = this.props.suffix[0];
    let variations = this.props.suffix.slice(1).map((x)=>`-${x}`).join(", ");

    return (
      <div className="map-tile">
        <h2>-{mainLabel}</h2>
        <h4>{variations}</h4>
        <h3>{totalCount} places</h3>
        <svg width="200" height="300">
      		{dots}
      	</svg>
       </div>
    );
  }
}

export default Map;