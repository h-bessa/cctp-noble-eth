const formatBalance = (balance: string):number => {
    return Math.floor(parseFloat(balance) * 10000) / 10000;
}
export default formatBalance;