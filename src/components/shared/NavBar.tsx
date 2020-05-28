import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobeAmericas, faFileAlt, faUsers, faCog } from '@fortawesome/free-solid-svg-icons'
import { Dropdown, DropdownProps } from 'semantic-ui-react'
import LanguageSelector from '../sidebar/right-sidebar/LanguageSelector'
import { useMediaQuery } from 'react-responsive'
import { mobileDeviceOrTabletWidth } from '../../constants'
import MultiColorIcon from '../../assets/images/colored-icon.svg';


export const NavBar = () => {
  const [tab, setTab] = useState("");
  const [showSettings, setShowSettings] = useState(false);

  const getTabClass = (tabName: string) => {
    return tabName === tab ? 'bold col-auto h-100 flex center-item' : 'regular col-auto h-100 flex center-item';
  }

  const usePageViews = () => {
    let location = useLocation();
    useEffect(() => {
      setTab(location.pathname)
    }, [location]);
  }

  usePageViews()
  const isMobileDeviceOrTablet = useMediaQuery({ maxDeviceWidth: mobileDeviceOrTabletWidth })
  return (
    <header className="App-header col-12 px-sm-2">
      <div className="App-title col-auto py-3 px-0 flex left">
        <Link to="/" className="flex">
          <img src={MultiColorIcon} width={23} height={23} alt="" />
          <div className="col-auto px-2" >SeroTracker</div>
        </Link>
      </div>
      <div className="App-tabs h-100 p-0 col-auto space-evenly">
        <div className={getTabClass('/Dashboard')}>
          <Link to="/Dashboard">
            {isMobileDeviceOrTablet ?
              <FontAwesomeIcon icon={faGlobeAmericas} size="lg" /> :
              'Dashboard'}
          </Link>
        </div>
        <div className={getTabClass('/Data')}>
          <Link to="/Data">
            {isMobileDeviceOrTablet ?
              <FontAwesomeIcon icon={faFileAlt} size="lg" /> :
              'Data'}
          </Link>
        </div>
        <div className={getTabClass('/About')}>
          <Link to="/About">
            {isMobileDeviceOrTablet ?
              <FontAwesomeIcon icon={faUsers} size="lg" /> :
              'About'}
          </Link>
        </div>

        <div className={getTabClass('')}>
          <Dropdown
            icon={null}
            trigger={isMobileDeviceOrTablet ?
              <FontAwesomeIcon icon={faCog} size="lg" onClick={() => setShowSettings(!showSettings)} /> :
              <div onClick={() => setShowSettings(!showSettings)}>Settings</div>}
            open={showSettings}
            selectOnBlur={false}
            onChange={() => { }}
            onClose={(event: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
              if (!event || !event.nativeEvent) {
                setShowSettings(false);
              }
            }}
            pointing={false}
            floating
          >
            <Dropdown.Menu direction="left">
              <Dropdown.Header icon='cog' content='Change settings' />
              <Dropdown.Divider />
              <Dropdown.Item onClick={(e, a) => e.preventDefault()}>
                <LanguageSelector />
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </header >
  )
}