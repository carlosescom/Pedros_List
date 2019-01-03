import React, { Component } from 'react'
import Balance from './Balance.js'
import _ from 'lodash'

class BalanceRange extends Component {

  render() {
    return <div>{
      _
      .range(0,this.props.accountsToRetrieve)
      .map(
        indexNum =>(
          <Balance key={indexNum} addressStr={this.props.passedAccounts[indexNum]}/>
        )
      )
    }</div>
  }
}

export default BalanceRange