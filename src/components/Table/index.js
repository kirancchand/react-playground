import React from 'react';
import './style.css';
function Table(props){
	// console.log(props.data);
	console.log(props);
	 // {props.data.map((data, index) => (
  //     	<tr key={index}>
  //       <td>{data.name}</td>
  //       <td>{data.capital}</td>
  //     </tr>
  //  	  ))}

  return (


    <table id="countries">
    <thead>
      <tr>
        <th>Country</th>
        <th>capital</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>India</td>
        <td>delhi</td>
      </tr>
   	  {(props.data||[]).map((data, index) => (
      	<tr key={index}>
        <td>{data.name}</td>
        <td>{data.capital}</td>
      </tr>
   	  ))}
    </tbody>
  </table>
    );
}
export default Table;

