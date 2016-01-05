import React from 'react';
import d3_scale from 'd3-scale';
const colorScale = d3_scale.viridis();

export default class Map extends React.Component {
  render() {

    // percentage of suffix ocurring in each bin
    let percentages = {};

    let placenames = {};

    // max percentage (for defining the color scale)
    let maxPercent = 0;
    // total number of places with suffix
    let totalCount = 0;

    this.props.data.forEach((x)=>{
      // for each bin

      const myRegexp = new RegExp(this.props.suffix.join('$|') + '$', 'i');

      // count matches with suffix
      let hits = x.filter((y)=> y.label.match(myRegexp));
      let count = hits.length;

      totalCount += count;
      percentages[x.id] = count/x.length;

      placenames[x.id] = `${percentages[x.id].toFixed(3)}% of place names have suffix \'${this.props.suffix[0]}\' or variations: ${hits.map((y)=> y.label).join(", ")}`;
      // count only bins with at least 20 villages or towns for color scale maximum
      if(x.length>20) {
        maxPercent = Math.max(maxPercent, percentages[x.id]);
      }
    });

    colorScale.domain([maxPercent, 0])

  	let dots = this.props.data.map((x)=>{
      // one dot per bin
  		let col = colorScale(percentages[x.id]);
      if(percentages[x.id]>0){
        return <circle key={x.id} cx={x.x} cy={x.y} r="2.5" style={{"fill": col}}>
        <title>{placenames[x.id]}</title>
        </circle>;
      } else {
        return <circle key={x.id} cx={x.x} cy={x.y} r="2.5" style={{"fill": col}}></circle>;
      }

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
