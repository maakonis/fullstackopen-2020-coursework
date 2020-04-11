import React from 'react';

function Counter({parts}) {
    const exerciseSum = parts.map(part => part.exercises)
        .reduce((a,b) => a+b)
    
    return (
        <p><strong>total of {exerciseSum} exercises </strong></p>
    );
}

export default Counter;