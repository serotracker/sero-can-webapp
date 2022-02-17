import React from "react";
import Translate from "../../../utils/translate/translateService";
import { Card } from "semantic-ui-react";
import {PublicationProps} from "./PublicationsConstants"

export function PrivateReportsCard(props: PublicationProps) {
    return (
        <div className="py-4 px-2 flex justify-content-center">
            <Card className={"private-reports-card"}>
                <Card.Content>
                    <div className="publications-card-title m-0 mb-2">
                        <a href={props.url} target="_blank" rel="noopener noreferrer" className="publication-link">
                            {props.italicize ? <i>{props.italicize}&nbsp;</i> : null}{Translate(props.titleKey1, props.titleKey2)}
                        </a>
                    </div>
                    <Card.Description className={"text-small mb-1"}>
                        authored by: {props.authors}
                    </Card.Description>
                    <Card.Description className={"text-small"}>
                        collected by: {props.collection}
                    </Card.Description>

                </Card.Content>
            </Card>
        </div>
    )
}
