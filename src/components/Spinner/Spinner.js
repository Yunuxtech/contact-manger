import React from 'react';
import spinner from "../../images/spinner.gif";

function Spinner() {
  return (
    <React.Fragment>
      <div>
        <img src={spinner} alt="spinner" className="d-block m-auto" style={{width:'200px',borderRadius:'20%'}}/>
      </div>
    </React.Fragment>
  );
}

export default Spinner;
