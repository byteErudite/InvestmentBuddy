import { IconInfoPalletteModel } from "../../widgets/IconInfoPallete/IconInfoPalletteModel";
import RewardPointsEarnedImage from '../../../assets/images/rewardPoints/rewardPointsEarned.svg'
import RewardPointsInvestedImage from '../../../assets/images/rewardPoints/rewardPointsInvested.svg'
import RewardPointsUpcomingImage from '../../../assets/images/rewardPoints/rewardPointsUpcoming.svg'
import { COLORS } from "../../../constants/NewColorScheme";


export const dateTimeData = [{
    name:'facebook',
  data: [{
    x: new Date('2018-02-12').getTime(),
    y: 78
  }, {
    x: new Date('2018-02-13').getTime(),
    y: 65
  }
  ,{
      x: new Date('2018-02-14').getTime(),
      y: 60
    },{
      x: new Date('2018-02-15').getTime(),
      y: 52
    },{
      x: new Date('2018-02-16').getTime(),
      y: 93
    },{
      x: new Date('2018-02-17').getTime(),
      y: 85
    },]
}];

export const dataTimeXaxis = {
    type: 'datetime'
  }  


  export const simpleData = [
    {
        name:'Facebook',
        data: [852.71, 845, 745, 781, 796, 685,985,521]
    },
    {
        name:'Amazon',
        data:[652.71, 945, 845, 881, 596, 685,785,821]
    },
    {
        name:'Microsoft',
        data:[752.71, 645, 545, 481, 996, 885,685,621]
    }
]

export const simpleDataXaxis = {
    categories:['22/04/2021', '23/04/2021', '24/04/2021','25/04/2021','26/04/2021','27/04/2021','28/04/2021','29/04/2021']
}

export interface plottingData {
    x:number,
    y:number
}

export const amazonUrl = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=AMZN&outputsize=compact&apikey=CEGMSFBO6Z4U1N09';
export const facebookUrl = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=FB&outputsize=compact&apikey=CEGMSFBO6Z4U1N09';
export const microsoftUrl = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=MSFT&outputsize=compact&apikey=CEGMSFBO6Z4U1N09';
export const ibmUrl = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&outputsize=compact&apikey=CEGMSFBO6Z4U1N09';


export const options = {
    chart : {
        height: 450,
        width: '100%',
        type: 'datetime',
        background: '#f4f4f4',
        foreColor:'#333'
    },
    stroke: {
        curve: 'straight',
      },
      series: [
          {
              name:'Facebook',
              data:[]
          }
      ], 
    //   series: graphData, 
      xaxis: dataTimeXaxis
    // series : [
    //     {
    //         name:'Facebook',
    //         data:[852.71, 845, 745, 781, 796, 685,985,521]
    //     },
    //     {
    //         name:'Amazon',
    //         data:[652.71, 945, 845, 881, 596, 685,785,821]
    //     },
    //     {
    //         name:'Microsoft',
    //         data:[752.71, 645, 545, 481, 996, 885,685,621]
    //     }
    // ],
    // xaxis: {
    //     categories:['22/04/2021', '23/04/2021', '24/04/2021','25/04/2021','26/04/2021','27/04/2021','28/04/2021','29/04/2021']
    // }
}


export let earnedIconInfoPalletteModel: IconInfoPalletteModel = {
    backgroundColor: '#f38162',
    iconImage: RewardPointsEarnedImage,
    iconPosition: 'left',
    mainText: '24,700',
    subText: 'Points Earned',
    mainTextColor: '#85291c'
}

export let investedIconInfoPalletteModel: IconInfoPalletteModel = {
    backgroundColor: COLORS.blueLight,
    iconImage: RewardPointsInvestedImage,
    iconPosition: 'left',
    mainText: '22,300',
    subText: 'Points Invested',
    mainTextColor: '#515B9E'
}

export let upcomingIconInfoPalletteModel: IconInfoPalletteModel = {
    backgroundColor: COLORS.blueLight,
    iconImage: RewardPointsUpcomingImage,
    iconPosition: 'left',
    mainText: '5,000',
    subText: 'Upcoming Milestone',
    mainTextColor: '#515B9E'
}

export interface rewardModel {
    id: number,
    userName: string,
    totalPointsInvested: number,
    totalPointsEarned: number,
    nextMilestone: number
}

