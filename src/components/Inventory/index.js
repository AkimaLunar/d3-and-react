import React, { useState } from 'react';
import Chart from '../Chart';
import fruitsBar from './d3/fruitsBar.d3';
import './styles.css';

const MOCK_DATA = [
    { item: 'apples', quantity: 20 },
    { item: 'oranges', quantity: 12 },
    { item: 'kiwis', quantity: 6 },
    { item: 'bananas', quantity: 4 },
];

const Inventory = () => {
    const [data, setData] = useState(MOCK_DATA);

    return (
        <div className="inventory">
            <h2 className="inventory__title">Fruits Inventory</h2>
            <Chart data={data} d3={fruitsBar} />
        </div>
    );
};

export default Inventory;
