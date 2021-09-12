import React from "react";
import Translate from "../../../utils/translate/translateService";
import InformationText from "../../shared/InformationText";

const MIN_DENOMINATOR = 100
export default function AnalysisMethods() {
    return (
        <div>
            <h3 className="py-2 center">
                {Translate("AnalysisMethods", ["Title"])}
            </h3>
            <div>
                <div>
                    {Translate("AnalysisMethods", ["FirstParagraph", "FirstSentence"], null, [false, true])}
                    <InformationText
                        tooltip={
                            <div>
                                <p>
                                    {Translate("AnalysisMethods", ["Tooltip"], { "MIN_DENOMINATOR": MIN_DENOMINATOR })}
                                </p>
                            </div>
                        }
                        text={Translate("Aggregating").toLowerCase()}
                        offset={-12}
                    />
                    {Translate("AnalysisMethods", ["FirstParagraph", "SecondSentence"], null, [true, false])}
                </div>
            </div>
            <p>
            {Translate("AnalysisMethods", ["SecondParagraph"], null)}
        </p>
            <p>
            {Translate("AnalysisMethods", ["ThirdParagraph"], null)}
        </p>
        </div>
    )
}