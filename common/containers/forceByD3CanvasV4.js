import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import fetch from 'isomorphic-fetch'
// import d3, { schemeCategory20, schemeCategory20b, schemeCategory20c, forceSimulation, select, event, forceLink, forceManyBody, forceCenter} from "d3";
import * as d3 from 'd3'
import _ from "lodash";

import Force from '../components/Force.js'
import '../css/force.css'

class forceByD3Svg extends Component{
	constructor(props) {
        super(props);
        console.log(d3.schemeCategory20);
        this.state = {
            width: 1400,
            height: 600,
            update: 0,
            color: (function(){
                var arr = [d3.schemeCategory20, d3.schemeCategory20b, d3.schemeCategory20c, d3.schemeCategory20, d3.schemeCategory20b, d3.schemeCategory20c];
                return function(key){
                    var num = parseInt(key);
                    // console.log(num,arr[Math.floor(num/20)](num%20));
                    return arr[Math.floor(num/20)][num%20];
                }
            })(),
        }
        this.nodes = [];
        this.links = [];
        this.getData();
    }

	componentDidMount() {
        var self = this;
        /*
        this.force = d3.layout.force()
            .nodes(this.nodes)
            .links(this.links)
            .linkDistance(60)
            .charge(-400)
            .size([this.state.width, this.state.height])
            .start();

        this.force.on("tick", function(e){
            self.setState({'update': self.state.update + 1});
            self.drew();
        });
        */

        self.force = d3.forceSimulation()
            .force("link", d3.forceLink().id(function(d) { return d.id; }))
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(self.state.width / 2, self.state.height / 2));
        
        self.force.nodes(this.nodes)
                .on("tick", function(){
                    self.drew()
                });

        self.force.force("link")
                .links(self.links);

        
        d3.select(self.refs.canvas).call(d3.drag()
              .container(self.refs.canvas)
              .subject(function() {
                return self.find(d3.event.x, d3.event.y);
              })
              .on("start", dragstarted)
              .on("drag", dragged)
              .on("end", dragended));


        function dragstarted() {
          if (!d3.event.active) simulation.alphaTarget(0.3).restart();
          d3.event.subject.fx = d3.event.subject.x;
          d3.event.subject.fy = d3.event.subject.y;
        }

        function dragged() {
          d3.event.subject.fx = d3.event.x;
          d3.event.subject.fy = d3.event.y;
        }

        function dragended() {
          if (!d3.event.active) simulation.alphaTarget(0);
          d3.event.subject.fx = null;
          d3.event.subject.fy = null;
        }
    }

    componentDidUpdate() {
        // this.chart.update(this.state.data);
    }

    componentWillUnmount() {
        // this.chart.unmount();
        this.force.stop();
    }

    getData(){
        var self = this;
    	fetch('/json?file=test2.json')
            .then(response => response.json())
            .then(json => {
            	if(json.type){
                    self.dataFormat(json.data);
            	}
            })
    }

    dataFormat(data){
        var self = this;
        this.nodes.length = 0;
        this.links.length = 0;
        Object.assign(self.nodes, data.nodes);
        _.each(data.nodes, function(obj){
            obj.x = self.state.width/2;
            obj.y = self.state.height/2;
        });
        _.each(data.edges, function(obj){
            var source = self.nodes.find(function(n){ return n.name == obj.source});
            var target = self.nodes.find(function(n){ return n.name == obj.target});
            if(source&&target){
                self.links.push({
                    source: source,
                    target: target
                });
            }
        });
        this.force.restart ();
    }

    drew(){
        var self = this;

        var ctx = self.refs.canvas.getContext('2d');
        ctx.clearRect(0, 0, 100000, 100000);

        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#ccc";
        self.links.forEach(function(d){
            ctx.moveTo(d.source.x, d.source.y);
            ctx.lineTo(d.target.x, d.target.y);
        });
        ctx.stroke();

        self.nodes.forEach(function(d){
            var radius = Math.min(d.score + 3, 30);
            radius = radius < 15 ? radius : (radius - 4);
            var color = self.state.color(d.category);
            ctx.beginPath();
            ctx.moveTo(d.x + radius, d.y);
            ctx.arc(d.x, d.y, radius, 0, 2 * Math.PI);
            ctx.fillStyle = color;
            ctx.fill();
            if (radius >= 15) {
                ctx.beginPath();
                ctx.strokeStyle = color;
                ctx.arc(d.x, d.y, radius + 4, 0, 2 * Math.PI);
                ctx.stroke();
            }
        });
    }

    render() {
        var defaultWidth = this.state.width/2,
            defaultHeight = this.state.height/2;

        return (<div className="chart" style={{ height: 1200}}>
                <div>{this.state.update}</div>
                <canvas width={ this.state.width } ref="canvas" height={ this.state.height }></canvas>
            </div>);
    }
}

export default forceByD3Svg
