import { faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {useContext} from "react";
import Translate from "../../../utils/translate/translateService";
import {Item, ItemContent} from "semantic-ui-react";
import { AppContext } from "../../../context";
import { LanguageType } from "../../../types";

export interface PublicationsItemProps {
    day?: string,
    month: string,
    year: string,
    titleKey1: string,
    titleKey2: string[],
    publicationName?: string,
    img?: string,
    url: string,
    authors?: string,
    italicize?: string
}

export function PublicationsItem(props: PublicationsItemProps) {
    const [state] = useContext(AppContext);
    return (
        <div className="py-2">
            <Item className={"publication-item"}>
                <Item.Content>
                    <Item.Meta className={"text-default"}>
                        {props.publicationName && props.publicationName}
                    </Item.Meta>
                    <Item.Header>
                        <h4 className={"m-0"}>
                            <a href={props.url} target="_blank" rel="noopener noreferrer" className="publication-link">
                                {props.italicize ? <i>{props.italicize}&nbsp;</i> : null}{Translate(props.titleKey1, props.titleKey2)}
                            </a>
                        </h4>
                    </Item.Header>
                    {
                        //Could potentially add a description in the hover state if we feel like we need it.
                    }
                    <Item.Meta>
                        <div className={"text-small"}>
                            {Translate("Published")}: {state.language === LanguageType.english ? `${props.month } ${props.day ? props.day + "," : ""} ` : `${props.day} ${Translate("Months", [props.month])} `}
                            {props.year}
                        </div>
                        <div className={"text-small"}>
                            {props.authors ? props.authors !== "" && Translate("Authors: ") + props.authors : ""}
                        </div>
                    </Item.Meta>
                </Item.Content>
            </Item>
        </div>
    )
}
