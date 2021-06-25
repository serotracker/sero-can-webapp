import { faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {useContext} from "react";
import Translate from "../../../utils/translate/translateService";
import { Card } from "semantic-ui-react";
import { AppContext } from "../../../context";
import { LanguageType } from "../../../types";

export interface InsightsCardProps {
  date: string,
  titleKey1: string,
  titleKey2: string[],
  img?: string,
  url: string,
  italicize?: string
}

export function InsightsCard(props: InsightsCardProps) {
  const [state] = useContext(AppContext);
  const splitDate = props.date.split(" ");
  return (
    <div className="py-4 px-2">
      <Card className={props.img ? "insights-card" : "insights-card-no-img"}> 
        {props.img && (
          <Card.Content>
            <div className="flex center-item insights-card-image mb-2">
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
          </Card.Content>
        )}
        <Card.Content>
          <div className="insights-card-title pb-1">
            <a href={props.url} target="_blank" rel="noopener noreferrer" className="">
              {props.italicize ? <i>{props.italicize}&nbsp;</i> : null}{Translate(props.titleKey1, props.titleKey2)}
            </a>
          </div>
          <div className="insights-card-date">
            {state.language === LanguageType.english ? props.date : `${splitDate[1].substring(0, splitDate[1].length - 1)} ${Translate("Months", [splitDate[0]])} ${splitDate[2]}`}
          </div>
        </Card.Content>
      </Card>
    </div>
  )
}
