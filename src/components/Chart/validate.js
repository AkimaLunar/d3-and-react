export default function(chart) {
    const _c = new chart();
    const errors = [];
    !_c.setData &&
        errors.push({
            method: 'setData',
            info: 'Required to set data on a chart.',
        });
    !_c.render &&
        errors.push({
            method: 'render',
            info:
                'Required for to render the chard with the data and to update the chart when data changes.',
        });
    !_c.destroy &&
        errors.push({
            method: 'destroy',
            info: 'Required for cleanup when component unmounts.',
        });
    !_c.canvas &&
        errors.push({
            method: 'canvas',
            info: 'Required svg canvas to render the chart on.',
        });

    if (errors.length > 0) {
        console.error(`Methods and/or properties missing on the chart:`, chart);
        console.table(errors);
        return false;
    }
    return true;
}
