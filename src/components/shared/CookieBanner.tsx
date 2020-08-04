import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Button, Header } from 'semantic-ui-react'
import { AppContext } from '../../context'
import Translate from '../../utils/translate/translateService'
import "./shared.scss"

export const CookieBanner = () => {
  const [state, dispatch] = useContext(AppContext)

  const acceptCookes = () => {
    localStorage.setItem('acceptedCookies', 'true');
    dispatch({ type: 'ACCEPT_COOKIES' })
  }

  return (
    state.showCookieBanner ?
      <div className="cookie-banner flex">
        <div className="fill flex center-item">
          <div className="col-md-6 p-3 flex column">
            <Header>
              {Translate('AcceptCookies')}
            </Header>
            <div>
              {Translate('CookiePolicyBody', null, null, [false, true])}
              <Link to="/CookiePolicy">{Translate('CookiePolicy')}</Link>
            </div>
            <div className="flex right">
              <Button color="blue" onClick={acceptCookes}>{Translate('Accept')}</Button>
            </div>
          </div>
          <FontAwesomeIcon
            icon={faTimes}
            className={'icon'}
            color={'#455a64'}
            onClick={() => dispatch({ type: 'CLOSE_COOKIE_BANNER' })}
            style={{ fontWeight: 300, position: 'absolute', zIndex: 3000, top: 10, right: 20 }}
            size={"lg"} />
        </div>
      </div>
      : null
  )
}