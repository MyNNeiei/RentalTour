import React from 'react';
import './history.css';
import { useEffect, useState } from "react";
// Importing images directly
import searchIcon from './Image/search.png';
import pdfIcon from './Image/pdf.png';
import jsonIcon from './Image/json.png';
import csvIcon from './Image/csv.png';
import excelIcon from './Image/excel.png';

export default function History() {



const [history, setHistory] = useState([]);
  

  useEffect(() => {
      async function fetchData() {
          try {
              const response = await fetch('http://localhost:3333/getHistory');
              const data = await response.json();
              // console.log(data);
              setHistory(data);
          } catch (error) {
              console.error("Failed to fetch car:", error);
          }
      }

      fetchData();
  }, []);
    const name = localStorage.getItem("name")
    // const des = history
    // const date = localStorage.getItem("datestart")
    const final = localStorage.getItem("final_price")
    // console.log(history[0].end_point)
    function showHistory(){
        return history.map((item, index) => (
            <tr key={index}>
                <td>{index+1}</td>
                <td>{name}</td>
                <td>{item.end_point}</td>
                <td>{item.start_date}</td>
                <td><p>{item.all_price}</p></td>
                <td>{item.req_car_type}</td>
            </tr>
        ));
    }

    return (
        <main className="table">
            <section className="table__header">
                <h1>Car's Reservation</h1>
                <div className="input-group">
                    <input type="search" placeholder="Search Data..." />
                    <img src={searchIcon} alt="Search" />
                </div>
            </section>
            <section className="table__body">
                <table>
                    <thead>
                        <tr>
                            <th>Id <span className="icon-arrow"></span></th>
                            <th>Username <span className="icon-arrow"></span></th>
                            <th>ปลายทาง <span className="icon-arrow"></span></th>
                            <th>Reserve Date <span className="icon-arrow"></span></th>
                            <th>Amount <span className="icon-arrow"></span></th>
                            <th>Car Type <span className="icon-arrow"></span></th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {history.length > 0 ? showHistory() : <tr><td colSpan="6">No History</td></tr>}
                    </tbody>
                </table>
            </section>
        </main>
    );
    
}
