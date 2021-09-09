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
    publicationName: string,
    img?: string,
    url: string,
    authors: string,
    italicize?: string
}

export function PublicationsItem(props: PublicationsItemProps) {
    const [state] = useContext(AppContext);
    return (
        <div className="py-2 px-2">
            <Item className={"publication-item"}>
                <Item.Content>
                    <Item.Meta>
                        {props.publicationName !== "" && props.publicationName}
                    </Item.Meta>
                    <Item.Header>
                        <a href={props.url} target="_blank" rel="noopener noreferrer" className="">
                            {props.italicize ? <i>{props.italicize}&nbsp;</i> : null}{Translate(props.titleKey1, props.titleKey2)}
                        </a>
                    </Item.Header>
                    {
                        //Could potentially add a description in the hover state if we feel like we need it.
                    }
                    <Item.Meta>
                        <div>
                            {Translate("Published")}: {state.language === LanguageType.english ? `${props.month } ${props.day ? props.day + "," : ""} ` : `${props.day} ${Translate("Months", [props.month])} `}
                            {props.year}
                        </div>
                        <div>
                            {props.authors !== "" && Translate("Authors") + props.authors}
                        </div>
                    </Item.Meta>
                </Item.Content>
            </Item>
        </div>
    )
}
