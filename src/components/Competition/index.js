import React, { useState, useCallback } from 'react';
import randomNumber from '../../utils/helpers/randomNumber';
import './styles.css';

import BarChart from './d3/scatter';
import Chart from '../Chart';
import Form from './partials/form';
import Table from './partials/table';

const DATA = Array.from(Array(3)).map(() => ({
    time: randomNumber(30, 120),
    points: randomNumber(0, 20),
}));

const Competition = () => {
    const [data, setData] = useState(DATA);

    const reset = useCallback(() => setData([]), []);
    const add = useCallback((item) => setData([...data, item]), [data]);

    return (
        <div className="competition">
            <h1 className="competition__title">Competition</h1>
            <Chart data={data} d3={BarChart} />
            <Form onSubmit={add} onReset={reset}></Form>
            <Table data={data}></Table>
        </div>
    );
};

export default Competition;
