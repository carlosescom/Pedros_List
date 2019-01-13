import React, { Component } from 'react'
import { DrizzleContext } from 'drizzle-react'

// Components
import BalanceRange from '../components/BalanceRange.js'
import BalanceSelect from '../components/BalanceSelect.js'
import _ from 'lodash'

import logo from '../../logo.png'

class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      drizzle: props.drizzle,
      drizzleState: props.drizzleState,
      initialized: false
    }
  }
  
  componentDidMount() {
    var Home = this
    this.unsubscribe = this.props.drizzle.store.subscribe(function () {
      /**
      * It's important to refresh drizzleState by calling this method
      * from drizzle.store, otherwise, even though a change is observed
      * in drizzle.store drizzleState will remain the same.
      */
      var drizzle = Home.state.drizzle
      var drizzleState = drizzle.store.getState() 
      if (drizzleState.drizzleStatus.initialized) {        
        Home.setState({
          drizzle: drizzle,
          drizzleState: drizzleState,
          initialized: true
        })
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    if (_.isEmpty(this.state.drizzleState.accounts)) {
      return (
        <div>
          503 - Service unavailable - Home.js: _.isEmpty(this.state.drizzleState.accounts)
        </div>
      )
    }
    else {
      return (
        <div className="pure-g">
          
          <div className="pure-u-1 header">
            <div className="container">
              <img src={logo} alt="logo"/>
              <h1>Pedro Token</h1>
              <p>This is a QA testing application for Pedro ERC20 Token.</p>
              <br/><br/>
            </div>
          </div>

          <div className="pure-u-1-2">
              <BalanceRange
                drizzle={this.props.drizzle}
                drizzleState={this.props.drizzle.store.getState()}
                accountsToRetrieve={6} />
          </div>

          <div className="pure-u-1-2">
            <BalanceSelect
              drizzle={this.props.drizzle}
              drizzleState={this.props.drizzle.store.getState()}
            />
          </div>

        </div>
      )
    }
  }
  
}

export default () => (
  <DrizzleContext.Consumer>
    {
      drizzleContext => {
        var drizzle = drizzleContext.drizzle
        var drizzleState = drizzle.store.getState()
        return (
          <Home
            drizzle={drizzle}
            drizzleState={drizzleState} />
        )
      }
    }
  </DrizzleContext.Consumer >
)