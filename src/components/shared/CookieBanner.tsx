import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import { AppContext } from '../../context'
import Translate from '../../utils/translate/translateService'
import { withLocaleUrl } from '../../utils/utils'
import "sass/components/shared.scss"

export const CookieBanner = () => {
  const [state, dispatch] = useContext(AppContext)

  const acceptCookes = () => {
    localStorage.setItem('acceptedCookies', 'true');
    dispatch({ type: 'CLOSE_COOKIE_BANNER' })
  }

  if (!localStorage.getItem('acceptedCookies') && !state.showCookieBanner) {
    dispatch({ type: 'OPEN_COOKIE_BANNER' })
  }

  return (
    state.showCookieBanner ?
      <div className="cookie-banner flex">
        <div className="fill flex center-item">
          <div className="col-md-6 p-3 flex column">
            <div>
              {Translate('CookiePolicyBody', null, null, [false, true])}
              <Link to={withLocaleUrl("CookiePolicy")}>{Translate('CookiePolicy')}</Link>
            </div>
            <div className="flex right">
              <Button color="blue" onClick={acceptCookes}>{Translate('Accept')}</Button>
            </div>
          </div>
        </div>
      </div>
      : null
  )
}