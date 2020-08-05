import { faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Translate from "../../../utils/translate/translateService";

interface InsightsCardProps {
  identifier: string,
  date: string,
  title: string,
  img: string,
  url: string,
  italicize?: string
}


export default function InsightsCard(props: InsightsCardProps) {
  return (
    <div className="flex card column insights-card">
      <div className="flex space-between pb-1">
        <div className="section-title insights-card-identifier">
          {props.identifier.toUpperCase()}
        </div>
        <div className="insights-card-date">
          {props.date}
        </div>
      </div>
      <div className="flex center-item insights-card-image">
        <img src={props.img} alt="" className="fit insights-card-image"></img>
        <a href={props.url}
          target="_blank"
          rel="noopener noreferrer"
          className="overlay flex">
          <div className="insights-card-image-overlay flex fill center-item column">
            <div>{Translate('ViewFile')}</div>
            <div className="flex center-item">
              <FontAwesomeIcon
                icon={faFile}
                className={'icon'}
                color={'white'}
                size={"lg"} />

            </div>
          </div>
        </a>
      </div>
      <div className="fit insights-card-title">
        <a href={props.url} target="_blank" rel="noopener noreferrer" className="">
          {props.italicize ? <i>{props.italicize}&nbsp;</i> : null}{props.title}
        </a>
      </div>
    </div>
  )
}
