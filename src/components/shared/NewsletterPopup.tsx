import React, {useEffect, useState} from "react";
import {Button, Icon} from "semantic-ui-react";

export default function NewsletterPopup() {
    const [hidden, setHidden] = useState(true)

    useEffect(() => {
        if (!localStorage.getItem("SubscribePopupSeen")){
            if(localStorage.getItem("returnUser") === "true") {
                setTimeout(function () {
                    setHidden(false)
                }, 30000) // 30 seconds in ms
            }
        }
    }, [])

    const onClickHandle = () => {
        setHidden(true)
        localStorage.setItem("SubscribePopupSeen", "true")
    }

    return (
        <div className={"popup"} style={{visibility: hidden ? "hidden" : "visible"}}>
            <Button className={"popup-close-button"} icon onClick={onClickHandle}>
                <Icon className={"popup-close-button-icon"} name={"close"} />
            </Button>
            <iframe
                src="https://serotracker.substack.com/embed"
                width="480" height="320"
                className={"popup-content"}
                frameBorder="0"
                scrolling="no"
            />
        </div>
    )
}