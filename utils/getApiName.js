export const getApiName = (name) =>{
    const apisName = {
        getEtherBalanceForSingleAddress : 'Ether balance single address',
        getEtherBalanceForMultipleAddress: 'Ether balance multiple address',
        getTransactionsByAddress : 'Transactions by address',
        getInternalTransactionsListByAddress : 'Internal transactions list by address',
        getInternalTransactionsByTransactionHash: 'Internal transactions by transactions hash ',
        getNftErc726 : 'NFT ERC726',
        getListOfERC20TokenTransferEvents :'List of ERC20 token transfer events',
        getListOfBlocksMinedByAddress : 'List of mined block by address',
        getContractABIforVerifiedContractSource: 'ABI contract for verified contract'

    }
    return apisName[name] || 'name not avaiable... X'
}