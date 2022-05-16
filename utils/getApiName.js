export const getApiName = (name) =>{
    const apisName = {
        getEtherBalanceForSingleAddress : 'Ether balance single address',
        getEtherBalanceForMultipleAddress: 'Ether balance multiple address',
        getTransactionsByAddress : 'Transactions by address',
        getInternalTransactionsListByAddress : 'Internal transactions list by address',
        getInternalTransactionsByTransactionHash: 'Internal transactions by transactions hash ',
        getNftErc726 : 'NFT ERC726',
        getListOfERC20TokenTransferEvents :'List of ERC20 token transfer events'
    }
    return apisName[name] || 'name not avaiable... X'
}