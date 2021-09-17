import React, { useState, useEffect } from "react";
import Translate from "../../utils/translate/translateService";
import { sendAnalyticsEvent } from '../../utils/analyticsUtils';
import { Button } from "semantic-ui-react";
import { Icon } from 'semantic-ui-react';
interface DownloadButtonProps {
    buttonLabelKey?: string;
    downloadLink?: string;
    formLink?: string;
    buttonSize?: "mini" | "tiny" | "small" | "large" | "huge";
    buttonColour?: any;
  }

export default function DownloadButton(props: DownloadButtonProps) {
    const [letDownload, setLetDownload] = useState(false);

    const { buttonLabelKey = "DownloadCsv", 
            downloadLink = "https://airtable.com/shraXWPJ9Yu7ybowM/tbljN2mhRVfSlZv2d?backgroundColor=blue&viewControls=on",
            formLink = "https://docs.google.com/forms/d/e/1FAIpQLSdGd_wlq8YSyVPs2AOi1VfvxuLzxA8Ye5I3HkQwW_9yrumsCg/viewform",
            buttonSize = "large",
            buttonColour = "blue" } = props;
    
    useEffect(() => {
        const doneSurvey = localStorage.getItem("DownloadFormCompleted");
        if (doneSurvey) {
            setLetDownload(true);
        }
    }, [])

    const clickButton = async () => {
        sendAnalyticsEvent({ category: 'Data Link Click', action: 'click', label: buttonLabelKey })
        localStorage.setItem('DownloadFormCompleted', "true");
        // Only allow users to access download form 3 mins after they clicked the original link
        // to deter users from getting data without actually filling out the form
        await new Promise(resolve => { setTimeout(resolve, 60 * 3 * 1000) });
        setLetDownload(true);
    }


    const getButtonLink = () => {
        return letDownload ? downloadLink : formLink;
    }
    
    return (
        <Button key={buttonLabelKey} size={buttonSize} className="download-data-btn">
            <a
                onClick={() => clickButton()}
                target="_blank"
                rel="noreferrer"
                href={getButtonLink()}
                className='d-flex align-items-center'
            >
                <span className="button-text"> {Translate(buttonLabelKey)}</span>
                <Icon 
                name='download'
                size='large'
                className='ml-3'
                />
            </a>
        </Button>
    );
  }
  