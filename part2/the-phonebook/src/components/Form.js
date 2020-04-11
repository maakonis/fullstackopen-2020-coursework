import React from 'react';

function Form(props) {
    return (
        <form onSubmit={props.onSubmit}>
        <h2>add a new</h2>
        <div>
          name: <input value={props.name} onChange={props.changeName} />
        </div>
        <div>
          number: <input value={props.number} onChange={props.changeNumber} />
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
    );
}

export default Form;