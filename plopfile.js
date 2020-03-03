const componentGenerator = require('./templates/component');
const d3ChartGenerator = require('./templates/d3-chart');

module.exports = function(plop) {
    plop.setGenerator('component', componentGenerator);
    plop.setGenerator('d3', d3ChartGenerator);
};
