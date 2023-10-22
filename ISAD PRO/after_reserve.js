import React from 'react';
import './after_reserve.css';

function Afterreserve() {

  const name = "john doe"
  

  return (
    <div id="card">
      <div className="profile-box">
        <div className="back-icon">
          <a href="./reserve.html">
            <i className="fa fa-backward" aria-hidden="true"></i>
          </a>
        </div>
        <div className="txt_field">
          <label>Username : {name}</label>
        </div>
        <div className="txt_field2">
          <label>Car-type : </label>
        </div>
        <div className="txt_field1">
          <label>Start : </label>
        </div>
        <div className="txt_field1">
          <label>Arrived: </label>
        </div>
        <div className="txt_field1">
          <label>Item: </label>
        </div>
        <div className="txt_field1">
          <label>Insurance: </label>
        </div>
        <form action="history" className="log">
          <button type="submit"> Back</button>
        </form>
      </div>
    </div>
  );
}

export default Afterreserve;
