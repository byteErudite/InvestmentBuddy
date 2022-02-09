import React from 'react'
import { useEffect } from 'react'
import PortfolioHistoryTable from './PortFolioHistoryTable'
import { useHistory } from 'react-router-dom'
import StockGraph from './StockGraph/StockGraph'
import IconInfoPallette from '../widgets/IconInfoPallete/IconInfoPallette'
import Card from '@material-ui/core/Card'
import './PortfolioHistoryContainer.css'
import EqualizerIcon from '@material-ui/icons/Equalizer';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import Button from '@material-ui/core/Button';
import { IconInfoPalletteModel } from "../widgets/IconInfoPallete/IconInfoPalletteModel";
import { earnedIconInfoPalletteModel, investedIconInfoPalletteModel, upcomingIconInfoPalletteModel, rewardModel } from './StockGraph/GraphData'
import { useState } from 'react'
import { SERVER_URL, FORWARD_SLASH, REWARDS } from '../../constants/NetworkData'
import Navbar from '../widgets/Navbar/Navbar'

const PortfolioHistoryContainer = () => {
    const [username, serUsername] = useState(localStorage.getItem('userName'));
    const [token, setToken] = useState(localStorage.getItem('accessToken'));
    const [earnedModel, setEarnedModel] = useState<IconInfoPalletteModel>(earnedIconInfoPalletteModel);
    const [investedModel, setInvestedModel] = useState<IconInfoPalletteModel>(investedIconInfoPalletteModel);
    const [upcomingModel, setUpcomingModel] = useState<IconInfoPalletteModel>(upcomingIconInfoPalletteModel);
    const graphHeight = 300;
    const graphWidth = 700;
    const history = useHistory();
    const dashBoardRouterHandler = () => {
        history.push("/newDashboard")
    }

    if (username == undefined || username == '') {
        history.push('/home')
    }

    useEffect(() => {
        populateRewardData(SERVER_URL + FORWARD_SLASH + REWARDS + FORWARD_SLASH + username, token);
    }, [])

    const populateRewardData = async (url: string, token: string) => {
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
                let rewardValue: rewardModel = {
                    id: data['id'],
                    nextMilestone: data['nextMilestone'],
                    totalPointsEarned: data['totalPointsEarned'],
                    userName: data['userName'],
                    totalPointsInvested: data['totalPointsInvested']
                }
                console.log("rewardValue : ", rewardValue)
                setEarnedModel({ ...earnedModel, mainText: rewardValue.totalPointsEarned === undefined ? "0" : rewardValue.totalPointsEarned.toString() });
                setInvestedModel({ ...investedModel, mainText: rewardValue.totalPointsInvested === undefined ? "0" : rewardValue.totalPointsInvested.toString() });
                setUpcomingModel({ ...upcomingModel, mainText: rewardValue.nextMilestone === undefined ? "0" : (200 - rewardValue.nextMilestone).toString() });

                console.log("earnedModel : ", earnedModel);
                console.log(" investedModel : ", investedModel);
                console.log("upcomingModel : ", upcomingModel);
            });
    }
    return (
        <div className="portfolio-wrapper">
            <Navbar page="portfolio"></Navbar>
            <div className="portfolio-history-container-outside">
                <div className="portfolio-history-container">
                    {/* <Button startIcon={<KeyboardBackspaceIcon />} color="primary" onClick={dashBoardRouterHandler}>Go Back</Button> */}
                    <div className="portfolio-page-header"><EqualizerIcon color="primary" className="portfolio-page-header-icon" /><p>Portfolio</p></div>
                    <p className="outset" id="border"></p>
                    <div className="info-pallette">
                        <div><IconInfoPallette iconInfoPalletteModel={earnedModel}></IconInfoPallette></div>
                        <div><IconInfoPallette iconInfoPalletteModel={investedModel}></IconInfoPallette></div>
                        <div><IconInfoPallette iconInfoPalletteModel={upcomingModel}></IconInfoPallette></div>
                    </div>
                    <div className="graph-comp"><Card className="graph-card"><StockGraph graphWidth={graphWidth} graphHeight={graphHeight} calledFrom="portfolioContainer" /></Card></div>
                    <p className="outset" id="border"></p>
                    <div><PortfolioHistoryTable /></div>
                </div>
            </div>
        </div>
    )
}

export default PortfolioHistoryContainer;