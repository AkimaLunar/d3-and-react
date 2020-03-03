import React, { useState, useRef } from 'react';
import randomNumber from '../../../utils/helpers/randomNumber';

const Form = ({ onSubmit, onReset }) => {
    const timeInput = useRef();
    const [time, setTime] = useState(randomNumber(30, 120));
    const handleAgeChange = () => setTime(Number(timeInput.current.value));

    const pointsInput = useRef();
    const [points, setPoints] = useState(randomNumber(0, 20));
    const handlePointsChange = () =>
        setPoints(Number(pointsInput.current.value));

    const submit = (e) => {
        e.preventDefault();
        if (time === undefined || points === undefined) {
            return;
        }
        onSubmit && onSubmit({ time, points });
        setTime(randomNumber(30, 120));
        setPoints(randomNumber(0, 20));
    };

    const reset = (e) => {
        e.preventDefault();

        onReset && onReset();
        setTime(randomNumber(30, 120));
        setPoints(randomNumber(0, 20));
    };

    return (
        <div>
            <form>
                <label>Time</label>
                <input
                    value={time}
                    onChange={handleAgeChange}
                    type="number"
                    ref={timeInput}
                />
                <label>Points</label>
                <input
                    value={points}
                    onChange={handlePointsChange}
                    type="number"
                    ref={pointsInput}
                />
                <button onClick={submit}>Add</button>
                <button onClick={reset}>Reset</button>
            </form>
        </div>
    );
};

export default Form;
