import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import fetch from "isomorphic-fetch";
// import d3, { schemeCategory20, schemeCategory20b, schemeCategory20c, forceSimulation, select, event, forceLink, forceManyBody, forceCenter} from "d3";
import * as d3 from "d3";
import _ from "lodash";

import Force from "../components/Force.js";
import "../css/force.css";

class forceByD3Svg extends Component {
  constructor(props) {
    super(props);
    console.log(d3.schemeCategory20);
    this.state = {
      width: 1400,
      height: 600,
      update: 0,
      color: d3.scaleOrdinal(d3.schemeCategory20)
    };
    this.nodes = [];
    this.links = [];
    this.transform = {
      x: 0,
      y: 0,
      k: 1
    };
    this.getData();

    this.start = this.start.bind(this);
  }

  start() {
    var self = this;

    self.force = d3
      .forceSimulation(self.nodes)
      .force(
        "link",
        d3.forceLink(self.links).id(function(d) {
          return d.name;
        })
      )
      .force("charge", d3.forceManyBody())
      .force(
        "center",
        d3.forceCenter(self.state.width / 2, self.state.height / 2)
      )
      .on("tick", function() {
        self.drew();
      });
    // drag
    d3.select(self.refs.canvas).call(
      d3
        .drag()
        .container(self.refs.canvas)
        .subject(function() {
          var node = self.force.find(d3.event.x, d3.event.y);
          var length = Math.sqrt(
            (node.x - d3.event.x) * (node.x - d3.event.x) +
              (node.y - d3.event.y) * (node.y - d3.event.y)
          );
          console.log(length);
          if (length > 5) {
            return undefined;
          } else {
            return node;
          }
        })
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
    );

    function dragstarted() {
      if (!d3.event.active) self.force.alphaTarget(0.3).restart();
      d3.event.subject.fx = d3.event.subject.x;
      d3.event.subject.fy = d3.event.subject.y;
    }

    function dragged() {
      d3.event.subject.fx = d3.event.x;
      d3.event.subject.fy = d3.event.y;
    }

    function dragended() {
      if (!d3.event.active) self.force.alphaTarget(0);
      d3.event.subject.fx = null;
      d3.event.subject.fy = null;
    }
    // zoom
    d3.select(self.refs.canvas).call(
      d3
        .zoom()
        .scaleExtent([0.3, 2])
        .on("zoom", function() {
          var transform = d3.zoomTransform(this);
          // console.log(transform)
          self.transform = transform;
          self.drew();
        })
    );
  }

  componentDidUpdate() {
    // this.chart.update(this.state.data);
  }

  componentWillUnmount() {
    // this.chart.unmount();
    this.force.stop();
  }

  getData() {
    var self = this;
    fetch("/json?file=test2.json")
      .then(response => response.json())
      .then(json => {
        if (json.type) {
          self.dataFormat(json.data);
        }
      });
  }

  dataFormat(data) {
    var self = this;
    this.nodes.length = 0;
    this.links.length = 0;
    Object.assign(self.nodes, data.nodes);
    Object.assign(self.links, data.edges);
    this.start();
  }

  zoom(transform) {
    var self = this;

    var ctx = self.refs.canvas.getContext("2d");

    ctx.translate(transform.x, transform.y);
    ctx.scale(transform.k, transform.k);
  }

  drew() {
    var self = this;

    var ctx = self.refs.canvas.getContext("2d");

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, 100000, 100000);
    ctx.translate(self.transform.x, self.transform.y);
    ctx.scale(self.transform.k, self.transform.k);

    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#ccc";
    self.links.forEach(function(d) {
      ctx.moveTo(d.source.x, d.source.y);
      ctx.lineTo(d.target.x, d.target.y);
    });
    ctx.stroke();

    self.nodes.forEach(function(d) {
      var radius = Math.min(d.score + 3, 30);
      radius = radius < 15 ? radius : radius - 4;
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
    var defaultWidth = this.state.width / 2,
      defaultHeight = this.state.height / 2;

    return (
      <div className="chart" style={{ height: 1200 }}>
        <div>{this.state.update}</div>
        <canvas
          width={this.state.width}
          ref="canvas"
          height={this.state.height}
        />
      </div>
    );
  }
}

export default forceByD3Svg;
