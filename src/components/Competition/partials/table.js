import React from 'react';

const Table = ({ data }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Time</th>
                    <th>Points</th>
                </tr>
            </thead>
            <tbody>
                {data.map(({ time, points }, i) => (
                    <tr key={i}>
                        <td>{time}s</td>
                        <td>{points}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
