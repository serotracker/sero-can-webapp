import React, { useContext } from "react";
import { AppContext } from "../../../context";
import { Dropdown, DropdownProps, LabelProps } from 'semantic-ui-react'
import { FilterType } from '../../../types';
import InformationIcon from "../../shared/InformationIcon";
import Translate from "../../../utils/translate/translateService";
import { toPascalCase } from "../../../utils/translate/caseChanger";
import { getCountryName } from "../../../utils/mapUtils";
import ReactGA from 'react-ga';

export default function Filters() {
  const [state, dispatch] = useContext(AppContext);

  const formatOptions = (options: any, filter_type: FilterType) => {
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
      default:
        options.forEach((o: string) => {
          const translatedString = Translate(jsonObjectString, [toPascalCase(o)]);
          const alternativeString = Translate(jsonObjectString, [o.replace(/ /g, '')]);

          formatted_options.push({
            key: o,
            text: translatedString ? translatedString : alternativeString,
            value: o
          })
        });
    };
    return formatted_options;
  }

  const addFilter = (data: any, filter_type: string) => {
    dispatch({
      type: 'UPDATE_FILTER',
      payload: {
        filter_type,
        filter_value: data.value
      }
    });
  }

  const buildSectionHeader = (header_text: string, tooltip_text?: string | React.ReactNode, tooltip_header?: string) => {
    return (
      <div className="pb-2 flex">
        <div className="filter-section-header">{header_text}</div>
        {tooltip_text && (
          <div className="tooltip-vert-adj">
            <InformationIcon
              offset={10}
              position="bottom right"
              color="#455a64"
              tooltipHeader={tooltip_header ? tooltip_header : header_text}
              popupSize="small"
              size="sm"
              tooltip={tooltip_text} />
          </div>
        )}
      </div>
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
          options={formatOptions(state.filter_options[filter_type], filter_type)}
          onChange={(e: any, data: any) => {
            addFilter(data, filter_type)
            ReactGA.event({
              /** Typically the object that was interacted with (e.g. 'Video') */
              category: 'Filter',
              /** The type of interaction (e.g. 'play') */
              action: 'selection',
              /** Useful for categorizing events (e.g. 'Fall Campaign') */
              label: `${filter_type.toString()} - ${data.value}`
              /** A numeric value associated with the event (e.g. 42) */
            })
          }}
          defaultValue={Array.from(state.filters[filter_type])}
        />
      </div>
    )
  }

  return (
    <div className="col-12 p-0">
      <div className="py-3 center flex">
        <div className="section-title">
          {Translate("Filter").toUpperCase()}
        </div>
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
      <div className="row justify-content-center">
        <div className="col-10 col align-items-center p-0">
          <div className="pb-1">
            <div>
              {buildSectionHeader(Translate('Geography'), Translate('GeographyTooltip'))}
            </div>
            <div>
              {buildFilterDropdown('country', Translate('Country'))}
            </div>
          </div>
          <div className="pb-1">
            <div>
              {
                buildSectionHeader(Translate('StudyInformation'),
                  <div>
                    <p>
                      {Translate('StudyInformationTooltip', ['FirstParagraph'])}
                    </p>
                    <p>

                      {Translate('StudyInformationTooltip', ['SecondParagraph'])}
                    </p>
                  </div>)
              }
            </div>
            <div>
              {buildFilterDropdown('source_type', Translate('SourceType'))}
            </div>
            <div>
              {buildFilterDropdown('study_status', Translate('StudyStatus'))}
            </div>
            <div>
              {buildFilterDropdown('risk_of_bias', Translate('OverallRiskOfBias'))}
            </div>
          </div>
          <div className="pb-1">
            <div>
              {buildSectionHeader(Translate('Demographics'), Translate('DemographicsTooltip'))}
            </div>
            <div>
              {buildFilterDropdown('population_group', Translate('PopulationGroup'))}
            </div>
            <div>
              {buildFilterDropdown('sex', Translate('Sex'))}
            </div>
            <div>
              {buildFilterDropdown('age', Translate('Age'))}
            </div>
          </div>
          <div className="pb-1">
            <div>
              {buildSectionHeader(Translate('TestInformation'), Translate('TestInformationTooltip'))}
            </div>
            <div>
              {buildFilterDropdown('test_type', Translate('TestType'))}
            </div>
            <div>
              {buildFilterDropdown('isotypes_reported', Translate('IsotypesReported'))}
            </div>
            <div>
              {buildFilterDropdown('specimen_type', Translate('SpecimenType'))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}