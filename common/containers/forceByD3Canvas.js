import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import fetch from 'isomorphic-fetch'
import d3 from "d3";
import _ from "lodash";

import Force from '../components/Force.js'
import '../css/force.css'

class forceByD3Svg extends Component{
	constructor(props) {
        super(props);

        this.state = {
            width: 1400,
            height: 600,
            update: 0,
            color: (function(){
                var arr = [d3.scale.category20(),d3.scale.category20b(),d3.scale.category20c(),d3.scale.category20(),d3.scale.category20b(),d3.scale.category20c()];
                return function(key){
                    var num = parseInt(key);
                    // console.log(num,arr[Math.floor(num/20)](num%20));
                    return arr[Math.floor(num/20)](num%20);
                }
            })(),
        }
        this.nodes = [];
        this.links = [];
        this.getData();
    }

	componentDidMount() {
        var self = this;
        // el = findDOMNode(this);

        // this.chart = new Force(el, {});

        // this.chart.create(this.state.data);
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
        this.force.start();
    }

    drew(){
        var self = this;

        var ctx = self.refs.canvas.getContext('2d');
        ctx.clearRect(0, 0, 100000, 100000);

        ctx.beginPath();
        ctx.lineWidth = 1;
        self.links.forEach(function(d){
            ctx.strokeStyle = "#ccc";
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
