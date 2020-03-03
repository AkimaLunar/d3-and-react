import * as d3 from 'd3';

const HEIGHT = 300;

export default class Chart {
    constructor(element) {
        this.element = element;
        this.data = null;
        this.margin = {
            top: 40,
            right: 60,
            bottom: 40,
            left: 60,
        };
        this.size = element ? element.getBoundingClientRect() : {};
        this.init();
    }

    get height() {
        return HEIGHT - this.margin.top - this.margin.bottom;
    }

    get width() {
        return this.size.width - this.margin.left - this.margin.right;
    }

    init = () => {
        this.svg = d3
            .select(this.element)
            .append('svg')
            .attr('height', this.height + this.margin.top + this.margin.bottom)
            .attr('width', this.width + this.margin.left + this.margin.right);

        this.canvas = this.svg
            .append('g')
            .attr(
                'transform',
                `translate(${this.margin.left}, ${this.margin.top})`
            );

        this.xAxis = this.canvas
            .append('g')
            .attr('transform', `translate(0, ${this.height})`);
        this.yAxis = this.canvas.append('g');
    };

    setData = (data) => {
        this.data = data;
    };

    resize = (element) => {
        this.destroy();
        this.size = element.getBoundingClientRect();
        this.init();
        this.render();
    };

    render = () => {
        if (!this.data) {
            return;
        }

        // Set scales ==========================================================
        const xScale = d3
            .scaleLinear()
            .domain([0, d3.max(this.data, (d) => d.time)])
            .range([0, this.width]);

        const yScale = d3
            .scaleLinear()
            .domain([0, d3.max(this.data, (d) => d.points)])
            .range([this.height, 0]);

        // Set axis ============================================================
        this.xAxis
            .transition()
            .duration(500)
            .ease(d3.easePoly)
            .call(d3.axisBottom(xScale));

        this.yAxis
            .transition()
            .duration(500)
            .ease(d3.easePoly)
            .call(d3.axisLeft(yScale));

        // Data enters the chart ===============================================
        const enter = (enter) =>
            enter
                .append('circle')
                .attr('cx', (d) => xScale(d.time))
                .attr('cy', (d) => yScale(d.points))
                .attr('r', 0)
                .attr('fill', '#FE2E3B')
                .call((enter) =>
                    enter
                        .transition()
                        .duration(250)
                        .ease(d3.easePoly)
                        .attr('r', 15)
                        .transition()
                        .duration(250)
                        .ease(d3.easePoly)
                        .attr('r', 5)
                        .attr('fill', '#E07B9B')
                );

        // Data updates ========================================================
        const update = (update) =>
            update
                .transition()
                .duration(500)
                .ease(d3.easePoly)
                .attr('cx', (d) => xScale(d.time))
                .attr('cy', (d) => yScale(d.points))
                .attr('r', 5)
                .attr('fill', '#E07B9B');

        // Data leaves the chart ===============================================
        const exit = (exit) =>
            exit
                .transition()
                .duration(500)
                .ease(d3.easePoly)
                .attr('r', 0)
                .remove();

        // General update pattern ==============================================
        this.canvas
            .selectAll('circle')
            .data(this.data)
            .join(enter, update, exit);
    };

    destroy = () => {
        this.svg.remove();
    };
}
