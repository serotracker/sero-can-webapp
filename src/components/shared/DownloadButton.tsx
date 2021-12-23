import React, { useState, useEffect } from "react";
import Translate from "../../utils/translate/translateService";
import { sendAnalyticsEvent } from '../../utils/analyticsUtils';
import { Button, Popup } from "semantic-ui-react";
import { Icon } from 'semantic-ui-react';
import { SemanticICONS } from "semantic-ui-react/dist/commonjs/generic";
import airtableLogo from '../../assets/images/airtable-icon.svg';
interface DownloadButtonProps {
    buttonLabelKey?: string;
    downloadLink?: string;
    formLink?: string;
    iconName: string;
    popupText: string;
    id?: string;
  }

export default function DownloadButton(props: DownloadButtonProps) {
    const [letDownload, setLetDownload] = useState(false);
    const { buttonLabelKey,
            downloadLink ,
            formLink,
        iconName, popupText} = props;
    
    useEffect(() => {
        const doneSurvey = localStorage.getItem("DownloadFormCompleted");
        if (doneSurvey) {
            setLetDownload(true);
        }
    }, [])

    const clickButton = async () => {
        sendAnalyticsEvent({ category: 'Data Link Click', action: 'click', label: buttonLabelKey as string})
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
        iconName === "" ?       
        <Popup content={Translate(popupText)} style={{textAlign: "left"}} position="top right" trigger={
            <Button key={buttonLabelKey} size="large" iconName={iconName} className="download-data-btn mb-2 mr-2" id={props.id} >
                <a
                    onClick={() => clickButton()}
                    target="_blank"
                    rel="noreferrer"
                    href={getButtonLink()}
                    className='d-flex align-items-center'
                >
                    <span className="button-text"> {Translate(buttonLabelKey as string)}</span>
                    <img className="ml-3" src={airtableLogo} alt="airtable-logo" width="24" height="24"/>
                </a>
            </Button>
        }/>
  
    :  

    <Popup id={props.id} offset={-10} style={{textAlign: "left"}}content={Translate(popupText)} position="top right" trigger={
        <Button id={props.id} key={buttonLabelKey} size="large" iconName={iconName} className="download-data-btn mb-2 mr-2">
            <a
                onClick={() => clickButton()}
                target="_blank"
                rel="noreferrer"
                href={getButtonLink()}
                className='d-flex align-items-center'
            >
                <span className="button-text"> {Translate(buttonLabelKey as string)}</span>
                <Icon
                    name={iconName as SemanticICONS}
                    size="large"
                    className="ml-3"
                />
            </a>
        </Button>
    }/>
    );
  }
  