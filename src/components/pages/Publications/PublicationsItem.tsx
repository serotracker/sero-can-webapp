import React, {useContext} from "react";
import Translate from "../../../utils/translate/translateService";
import {Item} from "semantic-ui-react";
import { AppContext } from "../../../context";
import { LanguageType } from "../../../types";
import {PublicationProps} from "./PublicationsConstants"
import { getformattedDate } from "utils/utils";

export function PublicationsItem(props: PublicationProps) {
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
                        {(props.month && props.year) && (
                            <div className={"text-small"}>
                                {getformattedDate(props.day, props.month, props.year, state.language)}
                            </div>
                        )}
                        <div className={"text-small"}>
                            {props.authors ? Translate("Authors: ") + props.authors : ""}
                        </div>
                    </Item.Meta>
                </Item.Content>
            </Item>
        </div>
    )
}
