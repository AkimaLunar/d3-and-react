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

    // Initialize the canvas =====================================================
    init = () => {
        this.svg = d3
            .select(this.element)
            .append('svg')
            .attr('height', this.height + this.margin.top + this.margin.bottom)
            .attr('width', this.width + this.margin.left + this.margin.right)
            .style('font', '10px sans-serif');

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

    // Initialize the canvas =====================================================
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
            .scaleBand()
            .domain(this.data.map((d) => d.item))
            .range([0, this.width])
            .padding(0.25);

        const yScale = d3
            .scaleLinear()
            .domain([0, d3.max(this.data, (d) => d.quantity)])
            .range([this.height, 0]);

        const colorScale = d3
            .scaleLinear()
            .domain([0, d3.max(this.data, (d) => d.quantity)])
            .range(['#EBA861', '#FE2E3B']);

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

        const enter = (enter) =>
            enter
                .append('rect')
                .attr('x', (d) => xScale(d.item))
                .attr('width', xScale.bandwidth)
                .attr('y', (d) => yScale(d.quantity))
                .attr('height', (d) => this.height - yScale(d.quantity))
                .attr('fill', (d) => colorScale(d.quantity));

        const update = (update) =>
            update
                .transition()
                .duration(500)
                .attr('x', (d) => xScale(d.item))
                .attr('y', (d) => yScale(d.quantity))
                .attr('width', xScale.bandwidth)
                .attr('height', (d) => this.height - yScale(d.quantity));

        const exit = (exit) =>
            exit
                .transition()
                .duration(500)
                .attr('height', 0)
                .attr('y', this.height)
                .remove();

        console.log(
            'General Update Pattern',
            this.canvas.selectAll('rect').data(this.data)
        );

        this.canvas
            .selectAll('rect')
            .data(this.data)
            .join(enter, update, exit);
    };

    destroy = () => {
        this.svg.remove();
    };
}
