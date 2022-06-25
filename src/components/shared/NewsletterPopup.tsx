import React, {useEffect, useState} from "react";
import {Button, Icon} from "semantic-ui-react";
import {useMediaQuery} from "react-responsive";
import {mobileDeviceOrTabletWidth} from "../../constants";

export default function NewsletterPopup() {
    const [hidden, setHidden] = useState(true)
    const isMobileDeviceOrTablet = useMediaQuery({maxDeviceWidth: mobileDeviceOrTabletWidth})

    useEffect(() => {
        if (!localStorage.getItem("SubscribePopupSeen")){
            if(localStorage.getItem("returnUser") === "true") {
                setTimeout(function () {
                    setHidden(false)
                    localStorage.setItem("SubscribePopupSeen", "true")
                }, 30000) // 30 seconds in ms
            }
        }
    }, [])

    const onClickHandle = () => {
        setHidden(true)
    }

    return (
        <div className={"newsletter-popup"} onClick={onClickHandle} style={{visibility: hidden ? "hidden" : "visible"}}>
            <Button className={isMobileDeviceOrTablet ? "newsletter-popup-close-button-mobile" : "newsletter-popup-close-button"} icon onClick={onClickHandle}>
                <Icon className={"newsletter-popup-close-button-icon"} name={"close"} />
            </Button>
            <iframe
                src="https://serotracker.substack.com/embed"
                width={isMobileDeviceOrTablet ? "75%" : "480"}
                height="320"
                className={isMobileDeviceOrTablet ? "newsletter-popup-content-mobile" : "newsletter-popup-content"}
                frameBorder="0"
                scrolling="no"
            />
        </div>
    )
}