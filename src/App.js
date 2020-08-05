import React, { useEffect, useState } from 'react';
import { VictoryPie, VictoryBar, VictoryLabel, VictoryChart, VictoryTheme} from 'victory'
import { Select, MenuItem, InputLabel, GridList, GridListTile, GridListTileBar } from '@material-ui/core';


const ENV = 'prod';

const URL = {
  'prod': "https://damp-spire-15111.herokuapp.com/",
  "dev": "http://localhost:3001/"
}

const STATE_MAP = {
  "New Jersey": "nj",
  "Pennsylvania": "pa"
}

const DATA_TYPE_MAP = {
  "Online Revenue": "onlineRevTable",
  "Retail Revenue": "retailRevTable"
}




function App() {

  // filters
  const [month, setMonth] = useState('ALL');
  const [year, setYear] = useState('ALL');
  const [state, setState] = useState('New Jersey');
  const [dataType, setDataType] = useState("Online Revenue");
  const [stateData, setStateData] = useState({});
  const [metric, setMetric] = useState("Revenue")


  useEffect(() => {
    const getData = async () => {
      try {
        const abbrevState = STATE_MAP[state]
        const res = await fetch(`${URL[ENV]}data?states=${abbrevState}`)
        const data = await res.json();
        setStateData({
          ...stateData,
          [abbrevState]: data[abbrevState]
        });
      } catch (e) {
        console.log(e)
      }
    }

    getData()
  }, [state]);

  const stateFilter = () => {
    const STATES = ["New Jersey", "Pennsylvania"]
    const handleChange = (event) => {
      setState(event.target.value);
    };
    return (
      <div style={styles.filter}>
        <InputLabel id="state-filter">State</InputLabel>
        <Select
          onChange={handleChange}
          value={state}
          id="state-filter"
          autoWidth={true}>
            {
              STATES.map(ele => {
                return <MenuItem value={ele}>{ ele }</MenuItem>
              })
            }
        </Select>
      </div>
    )
  }

  const monthFilter = () => {
    const MONTHS = ["ALL", 'January', 'February', "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const handleChange = (event) => {
      setMonth(event.target.value)
    }
    return (
      <div style={styles.filter}>
        <InputLabel id="month-filter">Month</InputLabel>
        <Select
          id='month-filter' 
          onChange={handleChange}
          value={month}       
          autoWidth={true}>
          {
            MONTHS.map(ele => {
              return <MenuItem value={ele}>{ ele }</MenuItem>
            })
          }
        </Select>
      </div>
    )
  }

  const yearFilter = () => {
    const YEARS = ["ALL", '2021', '2020', '2019', '2018']
    const handleChange = (event) => {
      console.log('value', event)
      setYear(event.target.value)
    }
    return (
      <div style={styles.filter}>
        <InputLabel id="year-filter">Year</InputLabel>
        <Select
          id='year-filter'
          onChange={handleChange}
          value={year}
          autoWidth={true}>
          {
            YEARS.map(ele => {
              return <MenuItem value={ele}>{ ele }</MenuItem>
            })
          }
        </Select>
      </div>
    )
  }

  const dataTypeFilter = () => {
    const DATA_TYPES = ["Online Revenue", "Retail Revenue"];
    const handleChange = (event) => {
      setDataType(event.target.value)
    }
    return (
      <div style={styles.filter}>
        <InputLabel id="data-type-filter">Data Type</InputLabel>
        <Select
          id='data-type-filter'
          onChange={handleChange}
          value={dataType}
          autoWidth={true}>
          {
            DATA_TYPES.map(ele => {
              return <MenuItem value={ele}>{ ele }</MenuItem>
            })
          }
        </Select>
      </div>
    )
  }

  const metricFilter = () => {
    const METRICS = ["Handle", "Revenue", "Taxes Paid", "YTD Total Revenue"];
    const handleChange = (event) => {
      setMetric(event.target.value)
    }
    return (
      <div style={styles.filter}>
        <InputLabel id="metrics-filter">Metrics</InputLabel>
        <Select
          id='metrics-filter'
          onChange={handleChange}
          value={metric}
          autoWidth={true}>
          {
            METRICS.map(ele => {
              return <MenuItem value={ele}>{ ele }</MenuItem>
            })
          }
        </Select>
      </div>
    )
  }

  const pieCharts = () => {
    const data = stateData[STATE_MAP[state]]
    console.log(data)
    return <GridList cellHeight={400}cols={1}>
      {data && data.map((dataPoint) => {
        const tables = dataPoint[DATA_TYPE_MAP[dataType]]
        const table = tables.find(({ title }) => title === metric)
        const title = `${dataPoint.month} ${dataPoint.year}`
        return (
        <GridListTile cols={1}>
          <VictoryChart
              theme={VictoryTheme.grayscale}>
            <VictoryBar
              horizontal
              labels={({ datum }) => `${datum.y}`}
              data={table && table.data && table.data.slice(0, -1)}
              colorScale="qualitative"/>
          </VictoryChart>
          <GridListTileBar title={title} titlePosition='top'/>
        </GridListTile>
        )}
      )}
    </GridList>
  }


  return (
    <div style={styles.container}>
      <h1 style={styles.title}>
        SPORTS BOOK AND ONLINE CASINO DATA
      </h1>
      <div style={styles.filterDiv}>
        {
          stateFilter()
        }
        {
          monthFilter()
        }
        {
          yearFilter()
        }
        {
          dataTypeFilter()
        }
        {
          metricFilter()
        }
      </div>
      <div>
        {
          pieCharts()
        }
      </div>
    </div>
  );
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  title: {
    textAlign: "center"
  },
  filterDiv: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
}

export default App;
