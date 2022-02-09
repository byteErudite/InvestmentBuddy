export const investmentHistory =[ {
    index:1,
    DateTime:"26th May 21 12:45 PM",
    pName:"Larsen",
    moneyInvested:"500",
    unitPurchased:"15"
},
{
    index:2,
    DateTime:"21st June 21 12:45 PM",
    pName:"Bensen Pvt Ltc",
    moneyInvested:"500",
    unitPurchased:"15"
},
{
    index:3,
    DateTime:"26th May 21 12:45 PM",
    pName:"Larsen",
    moneyInvested:"500",
    unitPurchased:"15"
},
{
    index:4,
    DateTime:"26th May 21 12:45 PM",
    pName:"Larsen ",
    moneyInvested:"500",
    unitPurchased:"15"
},
{
    index:5,
    DateTime:"26th May 21 12:45 PM",
    pName:"Larsen",
    moneyInvested:"500",
    unitPurchased:'15'
},
{
    index:6,
    DateTime:"26th May 21 12:45 PM",
    pName:"Larsen",
    moneyInvested:"500",
    unitPurchased:"15"
},
{
    index:7,
    DateTime:"26th May 21 12:45 PM",
    pName:"Larsen",
    moneyInvested:"500",
    unitPurchased:"15"
},
{
    index:8,
    DateTime:"26th May 21 12:45 PM",
    pName:"Larsen",
    moneyInvested:"500",
    unitPurchased:"15"
},
{
    index:9,
    DateTime:"26th May 21 12:45 PM",
    pName:"Larsen",
    moneyInvested:"500",
    unitPurchased:"15"
},
{
    index:10,
    DateTime:"26th May 21 12:45 PM",
    pName:"Larsen",
    moneyInvested:"500",
    unitPurchased:"15"
},
{
    index:11,
    DateTime:"26th May 21 12:45 PM",
    pName:"Larsen",
    moneyInvested:"500",
    unitPurchased:"15"
},
{
    index:12,
    DateTime:"26th May 21 12:45 PM",
    pName:"Larsen",
    moneyInvested:"500",
    unitPurchased:"15"
},
{
    index:13,
    DateTime:"26th May 21 12:45 PM",
    pName:"Larsen",
    moneyInvested:"500",
    unitPurchased:"15"
},]

export const emptyPortfolioRow = {
    index:0,
    DateTime:"",
    pName:"",
    moneyInvested:"",
    unitPurchased:""
}

export interface InvestmentHistoryModel {
    id:number,
    investedDate:string,
    fundName:string,
    pricePerUnit:number,
    moneyInvested:number,
    units:number
}
