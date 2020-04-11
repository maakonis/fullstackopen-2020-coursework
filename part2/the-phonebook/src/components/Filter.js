import React from 'react';

function Filter({handleFilter, value}) {
    return <div>filter shown with <input value={value} onChange={handleFilter} /></div>
}

export default Filter;