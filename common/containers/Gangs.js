import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { findDOMNode } from 'react-dom'
import fetch from 'isomorphic-fetch'

import Force from '../components/Force.js'

class Gangs extends Component{
	constructor(props) {
        super(props);

        this.state = {
        	data:{
        		nodes: [],
        		links: []
        	}
        }
        this.getData();
    }

	componentDidMount() {

        const el = findDOMNode(this);

        this.chart = new Force(el, {});

        this.chart.create(this.state.data);
    }

    componentDidUpdate() {
        this.chart.update(this.state.data);
    }

    componentWillUnmount() {
        this.chart.unmount();
    }

    getData(){
    	fetch('/json?file=test2.json')
            .then(response => response.json())
            .then(json => {
            	if(json.type){
            		this.setState({data:{
	                	nodes: json.data.nodes,
	                	links: json.data.edges
	                }});
            	}
            })
    }

    render() {
        return (<div className="chart"></div>);
    }
}


function mapStateToProps(state) {
  return {
    
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Gangs)
