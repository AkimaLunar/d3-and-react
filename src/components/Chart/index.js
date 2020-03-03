import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import validate from './validate';
import useDebounce from '../../utils/hooks/useDebounce';

const Chart = ({ className, data, d3: D3 }) => {
    if (!D3 || !validate(D3)) {
        return <div />;
    }

    const debouncedData = useDebounce(data, 150);

    const chartRef = useRef(null);
    const chartClass = useRef(null);

    // Initialize chart svg container ==========================================
    useEffect(() => {
        if (!chartRef.current) {
            return false;
        }
        chartClass.current = new D3(chartRef.current);

        return () => {
            chartClass.current.destroy();
        };
    }, []);

    // Update chart on changes in data =========================================
    useEffect(() => {
        debouncedData &&
            chartClass.current &&
            chartClass.current.setData(debouncedData);

        chartClass.current && chartClass.current.render();
    }, [debouncedData]);

    // Resize chart on window.resize ===========================================
    const isClient = typeof window === 'object';
    useEffect(() => {
        if (!isClient) {
            return false;
        }
        const handleResize = () =>
            chartClass.current.resize &&
            chartClass.current.resize(chartRef.current);
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Render ==================================================================
    return <div className={className} ref={chartRef}></div>;
};

Chart.propTypes = {
    className: PropTypes.string,
    data: PropTypes.any,
    d3: PropTypes.func.isRequired,
};

export default Chart;
