import React, {useEffect, useState} from "react";
import {Button, Icon} from "semantic-ui-react";

export default function NewsletterPopup() {
    const [hidden, setHidden] = useState(true)

    useEffect(() => {
        setTimeout(function () {
            setHidden(false)
        }, 30000) // 1 minute in ms
    }, [])

    return (
        <div className={"popup"} style={{visibility: hidden ? "hidden" : "visible"}}>
            <Button className={"popup-close-button"} icon onClick={() => {setHidden(true)}}>
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