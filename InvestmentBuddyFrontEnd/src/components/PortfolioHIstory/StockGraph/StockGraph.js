import Chart from "react-apexcharts";
import React, { useEffect } from 'react'
import { dateTimeData, dataTimeXaxis, simpleData, simpleDataXaxis, facebookUrl, options, amazonUrl, microsoftUrl, ibmUrl } from './GraphData'
import '../PortfolioHistoryContainer.css'
import ShowChartIcon from '@material-ui/icons/ShowChart';

const StockGraph = ({ graphWidth, graphHeight, calledFrom }) => {
    console.log("graphWidth",graphWidth)
    console.log("graphHeight", graphHeight)
    const [facebookDataStore, setFacebookDataStore] = React.useState([]);
    const [amazonDataStore, setAmazonDataStore] = React.useState([]);
    const [ibmDataStore, setibmDataStore] = React.useState([]);
    const [microSoftDataStore, setMicrosoftDataStore] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    const populateData = async (url, dataStoreName) => {
        let dataStore = [];
        await fetch(url)
            .then((response => response.json()))
            .then((data) => {
                for (var key in data['Time Series (Daily)']) {
                    dataStore.push({ x: new Date(key).getTime(), y: data['Time Series (Daily)'][key]['1. open'] })
                }
            });

        if (dataStoreName === 'FB') {
            setFacebookDataStore(dataStore);
        } else if (dataStoreName === 'IBM') {
            setibmDataStore(dataStore);
        } else {
            setMicrosoftDataStore(dataStore);
        }


    }

    useEffect(() => {
        if (facebookDataStore.length === 0) {
            populateData(facebookUrl, 'FB');
        }
        if (ibmDataStore.length === 0) {
            populateData(ibmUrl, 'IBM');
        }
        if (microSoftDataStore.length === 0) {
            populateData(microsoftUrl, "MSFT");
        }
        setLoading(false);
    }, [])
    
    const options = {
        chart: {
            height: 650,
            width: '400',
            type: 'datetime',
            background: '#f4f4f4',
            foreColor: '#333'
        },
        stroke: {
            curve: 'straight',
        },
        series: [
            {
                name: 'Facebook',
                data: facebookDataStore
            },
            {
                name: 'IBM',
                data: ibmDataStore
            },
            {
                name: 'Microsoft',
                data: microSoftDataStore
            }
        ],
        xaxis: dataTimeXaxis
        
    }

    populateData();
    return(
        <div className="graph">
            {calledFrom != 'dashboard' && <div className="portfolio-performance-header"><ShowChartIcon className="graph-icon" color="primary" /><p>Portfolio Performance</p></div>}
            <Chart
        options={options}
        series={options.series}
        type="line"
        width={graphWidth.toString()}
        stroke={options.chart.stroke}
        height={graphHeight.toString()}
    /></div>);
}

export default StockGraph;