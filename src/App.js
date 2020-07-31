import React, { useEffect, useState } from 'react';
import { VictoryPie } from 'victory'



function App() {

  const [pie, setPie] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch("http://localhost:3001/data?states=nj")
        const { 
          nj = []
        } = await res.json();

        const operators = nj[0].onlineRevTable[0].slice(1);
        const rev = nj[0].onlineRevTable[2].slice(1);
        
        setPie(operators.map((op, idx) => {
          return {
            x: op,
            y: rev[idx]
          }
        }))
      } catch (e) {
        console.log(e)
      }
    }

    getData()
    // const data = getData();
    // console.log(data)
  }, [])
  return (
    <div>
      <VictoryPie
        data={pie}
        animate={true}
        colorScale="qualitative"
      />
    </div>
  );
}

export default App;
