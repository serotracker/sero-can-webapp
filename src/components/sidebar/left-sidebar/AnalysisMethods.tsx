import React from "react";
import InformationText from "../../shared/InformationText";
import { MIN_DENOMINATOR } from "../../../metaAnalysis"
import './AnalysisMethods.css';
import Translate from "../../../utils/translate/translateService";


export default function AnalysisMethods() {
  return (
    <div className="analysis-methods">
        <div className="section-title py-2 center">
            ANALYSIS METHODS
        </div>
        <p>
            <div>
                {'The seroprevalence shown for each country or factor is calculated by '}
                    <InformationText 
                        tooltip={
                            <div>
                            <p>
                                The aggregation technique used is fixed-effects, inverse-variance-weighted meta-analysis of prevalence, with the Freeman-Tukey double arcsin transform used to stabilize variance. Records over sample size {MIN_DENOMINATOR} considered.
                            </p>
                        </div>
                        }
                        text="aggregating"
                        offset={-12}
                    /> 
                {' all seroprevalence estimates that match the filters you specify.'}
            </div>
        </p>
        <p>
            Default filters: national and regional estimates, in the general population and blood donors. 
        </p>
        <p>
            These aggregated estimates should be interpreted with caution, especially if the studies that were aggregated did not include representative samples or were at high risk of bias. 
        </p>
    </div>
  )
}