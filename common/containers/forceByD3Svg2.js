import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import fetch from "isomorphic-fetch";
import d3 from "d3-old";
import _ from "lodash";

import "../css/force.css";

class forceByD3Svg2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 1400,
      height: 600,
      update: 0,
      color: (function() {
        var arr = [
          d3.scale.category20(),
          d3.scale.category20b(),
          d3.scale.category20c(),
          d3.scale.category20(),
          d3.scale.category20b(),
          d3.scale.category20c()
        ];
        return function(key) {
          var num = parseInt(key);
          // console.log(num,arr[Math.floor(num/20)](num%20));
          return arr[Math.floor(num / 20)](num % 20);
        };
      })()
    };
    this.nodes = [];
    this.links = [];
    this.getData();
  }

  componentDidMount() {
    var self = this;
    // const el = findDOMNode(this);

    // this.chart = new Force(el, {});

    // this.chart.create(this.state.data);
    this.force = d3.layout
      .force()
      .nodes(this.nodes)
      .links(this.links)
      .linkDistance(60)
      .charge(-400)
      .size([this.state.width, this.state.height])
      .start();

    this.force.on("tick", function(e) {
      // self.setState({'update': self.state.update + 1});
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
    _.each(data.nodes, function(obj) {
      obj.x = self.state.width / 2;
      obj.y = self.state.height / 2;
    });
    _.each(data.edges, function(obj) {
      var source = self.nodes.find(function(n) {
        return n.name == obj.source;
      });
      var target = self.nodes.find(function(n) {
        return n.name == obj.target;
      });
      if (source && target) {
        self.links.push({
          source: source,
          target: target
        });
      }
    });
    self.setState({ update: self.state.update + 1 });
    this.force.start();
  }

  drew() {
    var self = this;

    var defaultWidth = this.state.width / 2,
      defaultHeight = this.state.height / 2;

    self.links.forEach(function(d) {
      var dom = self.refs["n" + d.source.name + d.target.name];
      if (dom) {
        dom.setAttribute("x1", d.source.x || defaultWidth);
        dom.setAttribute("y1", d.source.y || defaultHeight);
        dom.setAttribute("x2", d.target.x || defaultWidth);
        dom.setAttribute("y2", d.target.y || defaultHeight);
      }
    });

    self.nodes.forEach(function(d) {
      var dom = self.refs["n" + d.name];
      if (dom) {
        dom.setAttribute(
          "transform",
          "translate(" +
            (d.x || defaultWidth) +
            "," +
            (d.y || defaultHeight) +
            ")"
        );
      }
    });
  }

  render() {
    var defaultWidth = this.state.width / 2,
      defaultHeight = this.state.height / 2;

    return (
      <div className="chart" style={{ height: 1200 }}>
        <div>{this.state.update}</div>
        <svg width={this.state.width} height={this.state.height}>
          <g>
            <g className="outg">
              <g className="lines">
                {this.links.map(
                  function(link, index) {
                    return (
                      <line
                        ref={"n" + link.source.name + link.target.name}
                        key={index}
                        className="line"
                        style={{ strokeWidth: 1 }}
                      />
                    );
                  }.bind(this)
                )}
              </g>
              <g className="nodes">
                {this.nodes.map(
                  function(node, index) {
                    var radius = Math.min(node.score + 3, 30);
                    radius = radius < 15 ? radius : radius - 4;
                    return (
                      <g className="node" ref={"n" + node.name} key={index}>
                        <circle
                          r={radius}
                          style={{ fill: this.state.color(node.category) }}
                        />
                      </g>
                    );
                  }.bind(this)
                )}
              </g>
            </g>
          </g>
        </svg>
      </div>
    );
  }
}

export default forceByD3Svg2;
