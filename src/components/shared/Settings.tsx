import React, { useState } from "react";
import { Dropdown, DropdownProps } from "semantic-ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import Translate from "../../utils/translate/translateService";
import LanguageSelector from "../sidebar/right-sidebar/LanguageSelector";
import { useMediaQuery } from "react-responsive";
import { mobileDeviceOrTabletWidth } from "../../constants";

export const Settings = () => {
  const [showSettings, setShowSettings] = useState(false);
  const isMobileDeviceOrTablet = useMediaQuery({ maxWidth: mobileDeviceOrTabletWidth })
  return (
    <Dropdown
      icon={null}
      trigger={isMobileDeviceOrTablet ?
        <FontAwesomeIcon icon={faCog} size="lg" onClick={() => setShowSettings(!showSettings)} /> :
        <div onClick={() => setShowSettings(!showSettings)}>{Translate('Settings')}</div>}
      open={showSettings}
      selectOnBlur={false}
      onChange={() => { }}
      onClose={(event: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
        if (!event || !event.nativeEvent) {
          setShowSettings(false);
        }
      }}
      style={{zIndex: 2000}}
      pointing={false}
      floating
    >
      <Dropdown.Menu direction="left">
        <Dropdown.Header icon='cog' content={Translate('ChangeSettings')} />
        <Dropdown.Divider />
        <Dropdown.Item onClick={(e, a) => e.preventDefault()}>
          <LanguageSelector />
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}