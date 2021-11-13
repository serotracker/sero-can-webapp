import React, { useContext, useRef } from "react";
import { Dropdown, Button } from 'semantic-ui-react';
import { AppContext } from "../../../context";
import { FilterType, PageState, State } from '../../../types';
import { sendUnityAnalyticsEvent } from "../../../utils/analyticsUtils";
import { updateFilters, clearFilters } from "../../../utils/stateUpdateUtils";
import { toPascalCase } from "../../../utils/translate/caseChanger";
import Translate, { getCountryName } from "../../../utils/translate/translateService";
import InformationIcon from "../../shared/InformationIcon";
import SectionHeader from "./SectionHeader";
import Datepicker from './datepicker/Datepicker';
import "./Filters.css";
import { LanguageType } from "../../../types";

interface FilterProps {
  page: string,
}

interface PopulationGroupFilterOption {
  german: string;
  english: string,
  french: string
}

export default function Filters({ page }: FilterProps) {
  let unityAlignedOnlyItem: any = useRef(null);
  let sourceTypeItem: any = useRef(null);
  let overallRiskOfBiasItem: any = useRef(null);
  let populationGroupItem: any = useRef(null);
  let sexItem: any = useRef(null);
  let ageItem: any = useRef(null);
  let testTypeItem: any = useRef(null);
  let isotypesReportedItem: any = useRef(null);
  let antibodyTargetItem: any = useRef(null);
  const [state, dispatch] = useContext(AppContext);
  const filters = (state[page as keyof State] as PageState).filters;

  const formatOptions = (options: any, filter_type: FilterType) => {
    if (!options) {
      return
    }
    const formatted_options: Record<string, string>[] = [];
    const optionString = toPascalCase(filter_type.toString());
    const jsonObjectString = `${optionString}Options`;
    switch (filter_type) {
      case 'country':
        options.forEach((o: string) => {
          formatted_options.push({
            key: o,
            text: getCountryName(o, state.language, jsonObjectString),
            value: o
          })
        });
        break;
      case 'population_group':
         // This code block will be deprecated once as this becomes the standardized filter option logic
        options.forEach((o: PopulationGroupFilterOption) => {
          const optionString = state.language === LanguageType.english ? o.english : o.french;
          formatted_options.push({
            key: optionString,
            text: optionString,
            value: optionString
          })
        })
        break;
      default:
        options.forEach((o: string) => {     
            const translatedString = Translate(jsonObjectString, [toPascalCase(o as string)]);
            const alternativeString = Translate(jsonObjectString, [(o as string).replace(/ /g, '')]);
            let text = !alternativeString && !translatedString ? o as string : (translatedString ? translatedString : alternativeString);
            formatted_options.push({
              key: o as string,
              text: text,
              value: o as string
            })
        });
    };
    return formatted_options;
  }

  const addFilter = (data: any, filterType: FilterType) => {
    updateFilters(
      dispatch,
      filters,
      filterType,
      data,
      page)
  }

  const clearFilter = () => {
    clearFilters(
      dispatch,
      page
    )
  }

  const buildFilterDropdown = (filter_type: FilterType, placeholder: string) => {
    return (
      <div className="pb-3">
      
        <Dropdown
          text={placeholder}
          fluid
          multiple
          search
          clearable
          selection
          options={formatOptions(state.allFilterOptions[filter_type], filter_type)}
          onChange={(e: any, data: any) => {
            addFilter(data.value, filter_type)
          }}
          defaultValue={filters[filter_type] as string[]}
        />
 
      </div>
    )
  }

  const buildFilterCheckbox = (filter_type: FilterType, label: string, title?: string, link?: string) => {
    return(
      <div title={title ? title: label} className={"checkbox-item pb-3 " } id="National" onClick={(e: React.MouseEvent<HTMLElement>) => {
        if(filter_type === "unity_aligned_only" && filters[filter_type]){
          sendUnityAnalyticsEvent();
        }
        addFilter(
          !filters[filter_type], 
          filter_type
        )
      }}>
        <input className={"ui checkbox " + (state.pulsateUnityFilter ? "pulse" : "")} type="checkbox" onClick={() => {dispatch({type: "SET_UNITY_FILTER_PULSATE", payload: false})}} checked={filters[filter_type] as boolean} readOnly />
        <label><a href={link}
                  target="_blank" rel="noopener noreferrer">{label}</a></label>
      </div>
    )
  }

  return (
    <div className="col-12 p-0">
      <div className="py-3 center flex">
        <h3>
          {Translate("Filter")}
        </h3>
        <div className="tooltip-vert-adj">
          <InformationIcon
            offset={10}
            position="bottom right"
            color="#455a64"
            tooltipHeader={Translate("Filter")}
            popupSize="small"
            size="sm"
            tooltip={Translate('FilterTooltip')} />
        </div>
      </div>
      <div className="row justify-content-center mb-4">   
        <div className="col-10 col align-items-center p-0">
          <div className="pb-1">
            <div>
              {
                <SectionHeader 
                  header_text={Translate('StudyInformation')} 
                  tooltip_text={
                  <div>
                    <p>{Translate('StudyInformationTooltip', ['FirstParagraph'])}</p>
                    <p>
                      <b>{Translate('StudyInformationTooltip', ['SecondParagraph', 'PartOne'], null, [false, true])}</b>
                      {Translate('StudyInformationTooltip', ['SecondParagraph', 'PartTwo'])}
                    </p>
                    <p>
                      <b>{Translate('StudyInformationTooltip', ['ThirdParagraph', 'PartOne'], null, [false, true])}</b>
                      {Translate('StudyInformationTooltip', ['ThirdParagraph', 'PartTwo'], null, [false, true])}
                      <a href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/technical-guidance/early-investigations" 
                      target="_blank" rel="noopener noreferrer">
                        {Translate('StudyInformationTooltip', ['ThirdParagraph', 'PartThree'], null, [false, true])}
                      </a>
                      {Translate('StudyInformationTooltip', ['ThirdParagraph', 'PartFour'])}
                    </p>
                  </div>
                  }
                />
              }
            </div>
        
            <div ref={unityAlignedOnlyItem}>
              {buildFilterCheckbox('unity_aligned_only', Translate('UnityStudiesOnly'), Translate('UnityStudiesOnlyLong'), "https://www.who.int/emergencies/diseases/novel-coronavirus-2019/technical-guidance/early-investigations")}
            </div>
            <div ref={sourceTypeItem}>
              {buildFilterDropdown('source_type', Translate('SourceType'))}
            </div>
            <div ref={overallRiskOfBiasItem}>
              {buildFilterDropdown('overall_risk_of_bias', Translate('OverallRiskOfBias'))}
            </div>
          </div>
          <div className="pb-1">
            <div>
              <SectionHeader header_text={Translate('Demographics')} tooltip_text={Translate('DemographicsTooltip')}/>
            </div>
            <div ref={populationGroupItem}>
              {buildFilterDropdown('population_group', Translate('PopulationGroup'))}
            </div>
            <div ref={sexItem}>
              {buildFilterDropdown('sex', Translate('Sex'))}
            </div>
            <div ref={ageItem}>
              {buildFilterDropdown('age', Translate('Age'))}
            </div>
          </div>
          <div className="pb-1">
            <div>
              <SectionHeader header_text={Translate('TestInformation')} tooltip_text={Translate('TestInformationTooltip')}/>
            </div>
            <div ref={testTypeItem}>
              {buildFilterDropdown('test_type', Translate('TestType'))}
            </div>
            <div ref={isotypesReportedItem}>
              {buildFilterDropdown('isotypes_reported', Translate('IsotypesReported'))}
            </div>
            <div ref={antibodyTargetItem}>
              {buildFilterDropdown('antibody_target', Translate('AntibodyTarget'))}
            </div>
          </div>
        </div>
      </div>
      <Datepicker page={page}/>
      <Button color="grey" size="small" onClick={clearFilter}>Click Here</Button>
    </div>
  )
}