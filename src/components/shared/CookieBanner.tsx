import React, { useContext } from 'react'
import { Advertisement, Header } from 'semantic-ui-react'
import "./shared.scss"
import Translate from '../../utils/translate/translateService'
import { AppContext } from '../../context'

export const CookieBanner = () => {
  const [state, dispatch] = useContext(AppContext)
  return (
    state.accepted_cookies ? null :
    <div className="cookie-banner flex">
      <Advertisement className="fill flex center" unit='panorama'>
        <div className="col-6 p-3">
          <Header>
            {Translate('CookiePolicy')}
          </Header>
          
          <div>
            {Translate('CookiePolicyBody')}
          </div>
          <button onClick={() => dispatch({type: 'ACCEPT_COOKIES'})}>{Translate('Accept and Continue')}</button>
        </div>
      </Advertisement>
    </div>
  )
}