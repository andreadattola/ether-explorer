const endpointURLs = {
  Mainnet: "https://api.etherscan.io",
  Goerli: "https://api-goerli.etherscan.io/",
  Kovan: "https://api-kovan.etherscan.io/",
  RInkeby: "https://api-rinkeby.etherscan.io/",
  Ropsten: "https://api-ropsten.etherscan.io/",
};
export const etherscanApiKey = "RXYC3E88FG1J5E4EW8557Y8H2FBWRREXGE"; // https://etherscan.io/myapikey 4 marzo
export const config = {
  homeApi: {
    getEtherHistoricalPrice: `${endpointURLs.Mainnet}/api?module=stats&action=ethdailymarketcap&startdate=2019-02-01&enddate=${new Date().toISOString().split('T')[0]}&sort=asc&apikey=${etherscanApiKey}`, //pro
    getEthLastPrice: `${endpointURLs.Mainnet}/api?module=stats&action=ethprice&apikey=${etherscanApiKey}`,
    getTotalNodesCount: `${endpointURLs.Mainnet}/api?module=stats&action=nodecount&apikey=${etherscanApiKey}`,
  },
  api: {

    getEtherBalanceForSingleAddress: (
      address = "0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae",
      tag = "latest",
      apiKey = etherscanApiKey
    ) =>
      `${endpointURLs.Mainnet}/api?module=account&action=balance&address=${address}&tag=${tag}&apikey=${apiKey}`,
    /**
     *
     * @param {string} etherscanApiKeyetherscanApiKey your apikey
     * @param {string} tag tag the string pre-defined block parameter, either earliest, pending or latest
     * @param {[string] } address the strings representing the addresses to check for balance, separated by , up to 20 addresses per call
     * @returns
     */
    getEtherBalanceForMultipleAddress: (
      address = [
        "0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a,0x63a9975ba31b0b9626b34300f7f627147df1f526,0x198ef1ec325a96cc354c7266a038be8b5c558f67",
      ].toLocaleString(),
      tag = "latest",
      apiKey = etherscanApiKey
    ) =>
      `${endpointURLs.Mainnet}/api?module=account&action=balancemulti&address=${address}&tag=${tag}&apikey=${apiKey}`,
    /**
     *
     * @param {string} basePath string basePath represents the base path, default is Mainnet https://api.etherscan.io
     * @param {string} address representing the addresses to check for balance address
     * @param {number} startBlock number to start searching for transactions
     * @param {number} endBlock number to stop searching for transactions
     * @param {number} page number, if pagination is enabled
     * @param {number} offset the number of transactions displayed per page
     * @param {'asc' | 'desc'} sort the sorting preference, use asc to sort by ascending and desc to sort by descendin Tip: Specify a smaller startblock and endblock range for faster search results.
     * @param {string} etherscanApiKey your apikey
     * @returns
     */
    getTransactionsByAddress: (
      address = "0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a",
      startBlock = 0,
      endBlock = 99999999,
      page = 1,
      offset = 10,
      sort = "asc",
      apiKey = etherscanApiKey
    ) =>
      `${endpointURLs.Mainnet}/api?module=account&action=txlist&address=${address}&startblock=${startBlock}&endblock=${endBlock}&page=${page}&offset=${offset}&sort=${sort}&apikey=${apiKey}`,
    /**
     * This API endpoint returns a maximum of 10000 records only.
     * @param {string} basePath string basePath represents the base path, default is Mainnet https://api.etherscan.io
     * @param {string} address representing the addresses to check for balance address
     * @param {number} startBlock number to start searching for transactions
     * @param {number} endBlock number to stop searching for transactions
     * @param {number} page number, if pagination is enabled
     * @param {number} offset the number of transactions displayed per page
     * @param {'asc' | 'desc'} sort the sorting preference, use asc to sort by ascending and desc to sort by descendin Tip: Specify a smaller startblock and endblock range for faster search results.
     * @param {string} etherscanApiKey your apikey
     * @returns
     */
    getInternalTransactionsListByAddress: (
      address = "0x2c1ba59d6f58433fb1eaee7d20b26ed83bda51a3",
      startBlock = 0,
      endBlock = 2702578,
      page = 1,
      offset = 10,
      sort = "asc",
      apiKey = etherscanApiKey
    ) =>
      `${endpointURLs.Mainnet}/api?module=account&action=txlistinternal&address=${address}&startblock=${startBlock}&endblock=${endBlock}&page=${page}&offset=${offset}&sort=${sort}&apikey=${apiKey}`,
    getInternalTransactionsByTransactionHash: (
      txhash = "0x40eb908387324f2b575b4879cd9d7188f69c8fc9d87c901b9e2daaea4b442170",
      apiKey = etherscanApiKey
    ) =>
      `${endpointURLs.Mainnet}/api?module=account&action=txlistinternal&txhash=${txhash},&apikey=${apiKey}`,
    getNftErc726: (
      contractaddress = '0x06012c8cf97bead5deae237070f9587f8e7a266d',
      address = '0x6975be450864c02b4613023c2152ee0743572325',
      page = 1,
      offset = 100,
      startblock = 0,
      endblock = 27025780,
      sort = 'asc',
      apikey = etherscanApiKey) => `${endpointURLs.Mainnet}/api?module=account&action=tokennfttx&contractaddress=${contractaddress}&address=${address}&page=${page}&offset=${offset}&startblock=${startblock}&endblock=${endblock}&sort=${sort}&apikey=${apikey}`
    ,
    getListOfERC20TokenTransferEvents: (
      contractaddress = '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2',
      address = '0x4e83362442b8d1bec281594cea3050c8eb01311c',
      page = 1,
      offset = 10,
      startblock = 0,
      endblock = 27025780,
      sort = 'asc',
      apikey = etherscanApiKey) => `${endpointURLs.Mainnet}/api?module=account&action=tokentx&contractaddress=${contractaddress}&address=${address}&page=${page}&offset=${offset}&startblock=${startblock}&endblock=${endblock}&sort=${sort}&apikey=${apikey}`,
    /*   getListOfBlocksMinedByAddress: (
        address = '0x4e83362442b8d1bec281594cea3050c8eb01311c',
        blockType = 'blocks',
        page = 1,
        offset = 100,
        apikey = etherscanApiKey) => `${endpointURLs.Mainnet}/api?module=account&action=getminedblocks&address=${address}&blocktype=${blockType}&page=${page}&offset=${offset}&apikey=${apikey}`,
        //contracts
    
        getContractABIforVerifiedContractSource : (address='0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413',apikey = etherscanApiKey) => `${endpointURLs.Mainnet}/api?module=contract&action=getabi&address=${address}&apikey=${apikey}`
  */ },
};
