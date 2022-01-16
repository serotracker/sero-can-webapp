import React from "react";
import Translate, {TranslateDate} from "../../../utils/translate/translateService";
import {Item} from "semantic-ui-react";
import {PublicationProps} from "./PublicationsConstants"

export function PublicationsItem(props: PublicationProps) {
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
                        {props.date && (
                            <div className={"text-small"}>
                                {TranslateDate(props.date + "T00:00:00")}
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
