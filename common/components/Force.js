import d3 from "d3";
import _ from "lodash";
import D3Base from "./D3Base";

const chartConfig = {
    color: (function(){
            var arr = [d3.scale.category20(),d3.scale.category20b(),d3.scale.category20c(),d3.scale.category20(),d3.scale.category20b(),d3.scale.category20c()];
            return function(key){
                var num = parseInt(key);
                // console.log(num,arr[Math.floor(num/20)](num%20));
                return arr[Math.floor(num/20)](num%20);
            }
        })(),
    zoomRange:[0.2, 4],
    zoomScale:[0.9,1.1],
    width: 800,
    height: 600,
    margin: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
    },
    zoom: true,
    drop: true
};

export default class Force extends D3Base {
	constructor(el, props) {
        super(props);

        this.el = el;
        this.props = props;

        Object.keys(chartConfig).forEach(configKey => {
            // If a prop is defined, let's just use it, otherwise
            // fall back to the default.
            if (this.props[configKey] !== undefined) {
                this[configKey] = this.props[configKey];
            } else {
                this[configKey] = chartConfig[configKey];
            }
        });

        // this.nodes = [{value:1,category:1},{value:2,category:4},{value:3,category:2}];
        // this.links = [{source:0,target:1},{source:0,target:2}];
        this.nodes = [];
        this.links = [];
    }

    create(data) {
        var that = this;
        const width = this.width + this.margin.left + this.margin.right;
        const height = this.height + this.margin.top + this.margin.bottom;
        this.width = width;
        this.height = height;

        this.svg = d3.select(this.el).append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
                .attr("transform", `translate(${this.margin.left}, ${this.margin.top})`);

        this.svgg = this.svg.append("svg:g").attr('class','outg');
        this.svgline = this.svgg.append("svg:g").attr('class','lines');
        this.svgnode = this.svgg.append("svg:g").attr('class','nodes');

        this.dataFormat(data);

        this.force = d3.layout.force()
            .nodes(this.nodes)
            .links(this.links)
            .linkDistance(150)
            .charge(-600)
            .size([width, height]);

        this.force.on("tick", function(e){    //对于每一个时间间隔
            //更新连线坐标
            that.svg_edges.attr("x1",function(d){ return d.source.x; })
                    .attr("y1",function(d){ return d.source.y; })
                    .attr("x2",function(d){ return d.target.x; })
                    .attr("y2",function(d){ return d.target.y; });
             //更新节点坐标
            that.svg_nodes.attr('transform',function(d){ return `translate(${d.x}, ${d.y})`});
        });

        if(this.drop){
            that.force.drag()
                .on("dragstart",function(d,i){
                    d3.event.sourceEvent.stopPropagation();
                })
                .on("drag", function(d) {  
                })
                .on("dragend",function(d){
                });
        }

        if(this.zoom){
            var zoomObj = d3.behavior.zoom()
                        .scaleExtent(that.zoomRange)
                        .on("zoom", function(){
                            that.svgg.attr("transform",
                                "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
                        })
                        .on('zoomend', function(){
                        });
        
            that.svg.call(zoomObj);
        }

        this.drew();
    }

    update(data) {
        // this.nodes = data.nodes;
        // this.links = [];
        this.dataFormat(data)

        this.drew();
    }

    dataFormat(data){
        var that = this;
        this.nodes.length = 0;
        this.links.length = 0;
        Object.assign(this.nodes,data.nodes);
        _.each(data.links,function(obj){
            var source = that.nodes.find(function(n){ return n.name == obj.source});
            var target = that.nodes.find(function(n){ return n.name == obj.target});
            if(source&&target){
                that.links.push({
                    source: source,
                    target: target
                });
            } 
        });
    }

    drew(){
        var that = this;

        //添加连线
        this.svg_edges = this.svgline.selectAll("line")
                                .data(this.links);
        this.svg_edges.exit().remove();
        this.svg_edges.enter()
                .append("line")
                .attr('class','line')
                .style('stroke-width',function(d){ return d.linkNum||1 });
        //添加节点
        this.svg_nodes = this.svgnode.selectAll(".node")
                                .data(this.nodes);
        this.svg_nodes.exit().remove();
        this.svg_nodes.enter()
            .append('g')
            .attr('class', 'node')
            .attr('transform', function(d) {
                return 'translate(' + (d.x||that.width/2) + ',' + (d.y||that.height/2) + ')';
            })
            .call(that.force.drag)
            .each(function(d){
                var _this = d3.select(this);
                _this.append('circle')
                        .attr("r", 10)
                        .style("fill", function(d) { return that.color(d.category)});
            });

        this.force.start();
    }
}
