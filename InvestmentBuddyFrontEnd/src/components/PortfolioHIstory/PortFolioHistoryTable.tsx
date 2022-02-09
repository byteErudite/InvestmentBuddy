import React from 'react'
import { useEffect } from 'react'
import './portfolioHIstoryTable.css';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';
import ListIcon from '@material-ui/icons/List';
import PageButton from './PaginationButton'
import Loader from "react-loader-spinner";
import { investmentHistory, emptyPortfolioRow, InvestmentHistoryModel } from './PortfolioData'
import { useState } from 'react'
import { SERVER_URL, FORWARD_SLASH, INVESTEMENT, ALL } from '../../constants/NetworkData'
import Navbar from '../widgets/Navbar/Navbar';

const PortFolioHistoryTable = () => {
    const windowSize = 5;
    const [username, serUsername] = useState(localStorage.getItem('userName'));
    const [token, setToken] = useState(localStorage.getItem('accessToken'));
    const investmentHistoryUrl = SERVER_URL + FORWARD_SLASH + INVESTEMENT + FORWARD_SLASH + ALL + FORWARD_SLASH + username;
    const [investmentHistoryData, setInvestementHistoryData] = React.useState<InvestmentHistoryModel[]>([]);
    const [pages, setPages] = React.useState(1);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [windowShowing, setWindowShowing] = React.useState({
        startIndex: 0,
        endIndex: 5
    });
    const [loading, setLoading] = React.useState(true);
    const [currentWindowData, setCurrentWindowData] = React.useState(investmentHistory.slice(windowShowing.startIndex, windowShowing.endIndex));

    useEffect(() => {
        setLoading(true);
        populateHistory(investmentHistoryUrl, token);
        addPaddingToData();
        setWindowShowing({
            startIndex: 0,
            endIndex: 5
        })
        setLoading(false);
    }, []);

    const populateHistory = async (url: string, token: string) => {
        let history: InvestmentHistoryModel[] = [];
        await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).
            then((resp) => resp.json()).
            then((data) => {
                for (var object in data) {
                    let historyRow: InvestmentHistoryModel = {
                        id: data[object]['id'],
                        investedDate: data[object]['investedDate'],
                        pricePerUnit: data[object]['pricePerUnit'],
                        moneyInvested: data[object]['moneyInvested'],
                        fundName: data[object]['fundName'],
                        units: data[object]['units']
                    }
                    history.push(historyRow);
                }
                setInvestementHistoryData(history);
                setPages(Math.ceil(history.length / windowSize));
            });
    }

    const addPaddingToData = () => {
        const dataLength = investmentHistory.length;
        if (dataLength % windowSize !== 0) {
            let paddingSize = windowSize - (dataLength % windowSize);
            [...Array(paddingSize)].forEach((i) => { investmentHistory.push(emptyPortfolioRow) });
        }
    }

    const setCurrentPageHandler = (currentPageNumber: number) => {
        setCurrentPage(currentPageNumber);
        const start = (currentPageNumber - 1) * windowSize;
        const end = start + windowSize;
        setWindowShowing({
            startIndex: start,
            endIndex: end
        });
        setCurrentWindowData(investmentHistory.slice(windowShowing.startIndex, windowShowing.endIndex));
        if (windowShowing.endIndex - windowShowing.startIndex < windowSize) {
            [...Array(end - start)].forEach((i) => { currentWindowData.push(emptyPortfolioRow) });
        }
    }

    const getUnitsPurchased = (unit: number) => {
        return unit !== 0 ? `${unit} units` : "";
    }

    const getIndex = (index: number) => {
        return index !== 0 ? index : "";
    }



    const classes = makeStyles({
        AttachMoneyIcon: {
            color: 'yellow',
        },
        MoneyText: {
            color: 'lightgreen',
        },
        tableRow: {
            color: 'black',
        },
        headerIcon: {
            marginRight: 10,
            marginTop: 12
        },
    })();
    console.log(`pages: ${pages}  currentPage: ${currentPage}`)
    return (
        <div>
            {loading ? <div className="container portfolio-history-table-main"><Loader
                type='Watch'
                color="#00BFFF"
                height={100}
                width={100} //3 secs
            /><h2>loading....</h2></div> : <div className="container" >
                <div className="portfolio-histroy-header"><ListIcon className={classes.headerIcon} /><p>Portfolio History</p></div>
                <table>
                    <thead>
                        <tr>
                            <th>S.no</th>
                            <th>Date and Time</th>
                            <th>Portfolio Name</th>
                            <th>Money Invested</th>
                            <th>Units Purchased</th>
                        </tr>
                    </thead>
                    {!loading && investmentHistoryData.length === 0 && <div><br /><h3>No Investements yet </h3><br /></div>}
                    <tbody>
                        {investmentHistoryData.slice(windowShowing.startIndex, windowShowing.endIndex).map((investment) => {
                            return (
                                <tr>
                                    <td className={classes.tableRow}>{getIndex(investment.id)}</td>
                                    <td className={classes.tableRow}>{investment.investedDate}</td>
                                    <td className={classes.tableRow}>{investment.fundName}</td>
                                    <td>{investment.moneyInvested && <Button className={classes.MoneyText} startIcon={<AttachMoneyIcon className={classes.AttachMoneyIcon} />}>{investment.moneyInvested}</Button>}</td>
                                    <td className={classes.tableRow}>{getUnitsPurchased(investment.units)}</td>

                                </tr>
                            )
                        })}
                    </tbody>

                </table>
                <div className="pagination-layout">
                    {[...Array(pages)].map((e, i) => <PageButton setCurrentPage={setCurrentPageHandler} pageNumber={i + 1} currentPage={currentPage}></PageButton>)}
                </div>
            </div>}
        </div>
    )
}

export default PortFolioHistoryTable;