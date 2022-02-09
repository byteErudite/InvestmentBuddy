
import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { TransactionModel } from '../TransHist/TransHistContainer/TransHistContainerModel'
import TransactionDetailRow from './TransactionDetailRow'
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'
import PageButton from '../../PortfolioHIstory/PaginationButton'
import Loader from "react-loader-spinner";
import ListIcon from '@material-ui/icons/List';
import { makeStyles } from '@material-ui/core/styles';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import Navbar from '../Navbar/Navbar'

const TransactionDetailPage = () => {
    const windowSize = 5;
    const [username, setUsername] = React.useState(localStorage.getItem('userName'));
    const [token, setToken] = React.useState(localStorage.getItem('accessToken'));
    const [pages, setPages] = React.useState(1);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [windowShowing, setWindowShowing] = React.useState({
        startIndex: 0,
        endIndex: 5
    });
    const [loading, setLoading] = React.useState(true);

    const [transactions, setTransactions] = React.useState<TransactionModel[]>([]);
    const url = 'http://localhost:8080/transaction/' + username;

    const history = useHistory();
    if (username == undefined || username == '') {
        history.push('/home')
    }

    const dashBoardRouterHandler = () => {
        history.push("/newDashboard")
    }
    useEffect(() => {
        setLoading(true);
        populateTransactionData(url, token);
        setWindowShowing({
            startIndex: 0,
            endIndex: 5
        })
        setLoading(false);
    }, []);

    const populateTransactionData = async (url: string, token: string) => {
        let transactionsData: TransactionModel[] = [];
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
                    let historyRow: TransactionModel = {
                        id: data[object]['id'],
                        cardNumber: data[object]['cardNumber'],
                        amountPaid: data[object]['amountPaid'],
                        paymentDate: data[object]['paymentDate'],
                        transactionType: data[object]['transactionType'],
                        rewardsEarned: data[object]['rewardsEarned'],
                        status: data[object]['status'],
                    }
                    console.log("transactionsData : ", transactionsData);
                    transactionsData.push(historyRow);
                    setPages(Math.ceil(transactionsData.length / windowSize));
                }
                setTransactions(transactionsData);
            });
    }

    const setCurrentPageHandler = (currentPageNumber: number) => {
        setCurrentPage(currentPageNumber);
        const start = (currentPageNumber - 1) * windowSize;
        const end = start + windowSize;
        setWindowShowing({
            startIndex: start,
            endIndex: end
        });
    }

    const classes = makeStyles({
        headerIcon: {
            marginRight: 10,
            marginTop: 12
        },
    })();

    return (
        loading ? <div className="container"><Loader
            type='Watch'
            color="#00BFFF"
            height={100}
            width={100} //3 secs
        /></div> :

            <div className="transaction-history-detail-card-outer">
                <Navbar page='payments'></Navbar>
                <Card className="transaction-history-detail-card">
                    {/* <Button startIcon={<KeyboardBackspaceIcon />} color="primary" onClick={dashBoardRouterHandler}>DashBoard</Button> */}
                    <div className="transaction-histroy-header"><ListIcon className={classes.headerIcon} /><p>Transactions Detailed History</p></div>
                    <div>{transactions.slice(windowShowing.startIndex, windowShowing.endIndex).map((transaction) => {
                        return <TransactionDetailRow transactionRowModel={transaction} />
                    })}
                        <div className="pagination-layout">
                            {[...Array(pages)].map((e, i) => <PageButton setCurrentPage={setCurrentPageHandler} pageNumber={i + 1} currentPage={currentPage}></PageButton>)}
                        </div>
                    </div>
                </Card>
            </div>
    )
}

export default TransactionDetailPage;