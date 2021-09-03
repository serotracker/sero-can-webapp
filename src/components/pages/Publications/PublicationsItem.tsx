import { faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {useContext} from "react";
import Translate from "../../../utils/translate/translateService";
import {Item, ItemContent} from "semantic-ui-react";
import { AppContext } from "../../../context";
import { LanguageType } from "../../../types";

export interface PublicationsCardProps {
    day?: string,
    month: string,
    year: string,
    titleKey1: string,
    titleKey2: string[],
    description: string,
    img?: string,
    url: string,
    italicize?: string
}

export function PublicationsItem(props: PublicationsCardProps) {
    const [state] = useContext(AppContext);
    return (
        <div className="py-2 px-2">
            <Item className={"publication-item"}>
                <Item.Content>
                    <Item.Meta>
                        Publication Name
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
                        <div className='publication-meta'>
                            <div>
                                Authors:
                            </div>
                            <div>
                                {state.language === LanguageType.english ? `${props.month } ${props.day ? props.day + "," : ""} ` : `${props.day} ${Translate("Months", [props.month])} `}
                                {props.year}
                            </div>
                        </div>
                    </Item.Meta>
                    {/*<div>
                        Authors:
                    </div>
                    <div>
                        Published: {state.language === LanguageType.english ? `${props.month } ${props.day ? props.day + "," : ""} ` : `${props.day} ${Translate("Months", [props.month])} `}
                        {props.year}
                    </div>*/}
                </Item.Content>
            </Item>
        </div>
    )
}
