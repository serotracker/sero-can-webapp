import { faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {useContext} from "react";
import Translate from "../../../utils/translate/translateService";
import { Card } from "semantic-ui-react";
import { AppContext } from "../../../context";
import { LanguageType } from "../../../types";
import {PublicationProps} from "./PublicationsConstants"

export function PublicationsCard(props: PublicationProps) {
  const [state] = useContext(AppContext);

  const dateFormatsByLanguage = {
    "en": "",
    "fr": "",
    "de": ""
  }

  if (props.month && props.year) {
    dateFormatsByLanguage["en"] = `${props.month } ${props.day ? props.day + "," : ""} `;
    dateFormatsByLanguage["fr"] = `${props.day} ${Translate("Months", [props.month])} `;
    dateFormatsByLanguage["de"] = `${props.day ? props.day + "." : ""} ${Translate("Months", [props.month])} `;
  }

  return (
    <div className="py-4 px-2 flex justify-content-center">
      <Card className={"publications-card"}>
        {props.img && (
          <Card.Content>
            <div className="flex center-item publications-card-image mb-2">
              <img src={props.img} alt="" className="fit publications-card-image"/>
              <a href={props.url}
                target="_blank"
                rel="noopener noreferrer"
                className="overlay flex publication-link">
                <div className="publications-card-image-overlay flex fill center-item column">
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
          <div className="publications-card-title m-0">
            <a href={props.url} target="_blank" rel="noopener noreferrer" className="publication-link">
              {props.italicize ? <i>{props.italicize}&nbsp;</i> : null}{Translate(props.titleKey1, props.titleKey2)}
            </a>
          </div>
          {(props.month && props.year) && (
            <div className="publications-card-date">
              {dateFormatsByLanguage[state.language]}
              {props.year}
            </div>
          )}
        </Card.Content>
      </Card>
    </div>
  )
}
