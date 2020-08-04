import React, { useEffect, useState } from 'react';
import { VictoryPie } from 'victory'
import { Select, MenuItem } from '@material-ui/core';


function App() {

  // filters
  const [month, setMonth] = useState('january');
  const [year, setYear] = useState('2020');
  const [state, setState] = useState('nj');
  const [stateData, setStateData] = useState({});

  useEffect(() => {

    const getData = async () => {
      try {
        const res = await fetch(`http://localhost:3001/data?states=${state}`)
        const data = await res.json();
        setStateData({
          ...stateData,
          [state]: data[state]
        });
      } catch (e) {
        console.log(e)
      }
    }

    getData()
  }, [state]);

  const filterView = () => {
    return [state, month, year].map(ele => {
      return (
        <Select>
          
        </Select>
      )
    })
  }


  return (
    <div>
      {
        filterView()
      }
    </div>
  );
}

export default App;
