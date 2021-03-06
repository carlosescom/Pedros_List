import Pedro_ERC20Token from './../build/contracts/Pedro_ERC20Token.json'
import Crowdsale from './../build/contracts/Crowdsale.json'

const drizzleOptions = {
  web3: {
    block: false,
    fallback: {
      type: 'ws',
      url: 'ws://127.0.0.1:9545'
    }
  },
  contracts: [
    Pedro_ERC20Token,
    Crowdsale
  ],
  events: {
  },
  polls: {
    accounts: 1500
  }
}

export default drizzleOptions