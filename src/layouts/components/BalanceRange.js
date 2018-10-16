import React, { Component } from 'react'
import Balance from './Balance.js'
import _ from 'lodash'

class BalanceRange extends Component {

  render() {
    return <div>
      {_.range(0,this.props.accountsToRetrieve-1).map(index =>(
        <Balance account={index+1}/>
      ))}
    </div>
  }
}

export default BalanceRange