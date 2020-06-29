import _ from "lodash";
import React, { SyntheticEvent, useContext, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Bar, BarChart, CartesianGrid, ErrorBar, LabelList, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Dropdown, DropdownProps } from "semantic-ui-react";
import { mobileDeviceOrTabletWidth } from "../../constants";
import { AppContext } from "../../context";
import { getAggregateData } from "../../metaAnalysis";
import { AggregationFactor } from "../../types";
import InformationIcon from "../shared/InformationIcon";
import './Charts.css';
import ReferencesTable from "./ReferencesTable";
import Translate from "../../utils/translate/translateService";
import ReactGA from 'react-ga';

export default function Charts() {
  const [yAxisSelection, setYAxis] = useState(AggregationFactor.country);
  const [state] = useContext(AppContext);
  const { filtered_records, filters } = state;
  // Factor in "include_in_n" for population unfiltered geography estimates
  const must_include_in_n = yAxisSelection === AggregationFactor.country ? filters.population_group.size === 0 : false;
  const aggregatedRecords = getAggregateData(filtered_records, yAxisSelection, must_include_in_n);
  const [records, setRecords] = useState(aggregatedRecords);

  const yAxisOptions = [
    { key: 'Geographies', text: Translate('Geographies'), value: AggregationFactor.country },
    { key: 'Population', text: Translate('Population'), value: AggregationFactor.population_group },
    { key: 'Sex', text: Translate('Sex'), value: AggregationFactor.sex },
    { key: 'Age', text: Translate('Age'), value: AggregationFactor.age },
    { key: 'Study Status', text: Translate('StudyStatus'), value: AggregationFactor.study_status },
    { key: 'Test Type', text: Translate('TestType'), value: AggregationFactor.test_type },
    { key: 'Source Type', text: Translate('SourceType'), value: AggregationFactor.source_type },
    { key: 'Risk Of Bias', text: Translate('RiskOfBias'), value: AggregationFactor.risk_of_bias },
    { key: 'Isotypes Reported', text: Translate('IsotypesReported'), value: AggregationFactor.isotypes_reported },
  ]

  useEffect(() => {
    // Factor in "include_in_n" for population unfiltered geography estimates
    const must_include_in_n = yAxisSelection === AggregationFactor.country ? filters.population_group.size === 0 : false;
    const reAggregatedRecords = getAggregateData(filtered_records, yAxisSelection, must_include_in_n);
    const chartData = _.sortBy(reAggregatedRecords, 'seroprevalence').reverse();
    setRecords(chartData);
  }, [yAxisSelection, state, filtered_records, filters])

  const handleChange = (event: SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
    setYAxis(data.value as AggregationFactor);
    ReactGA.event({
      category: 'Independent Variable',
      action: 'selection',
      label:  data.text || "Unknown"
    })
  }

  const CustomTooltip = (e: any) => {
    const { active, payload, label } = e
    if (active && payload) {
      const seroprevalence = payload[0].value;
      const recordError = records.find(o => o.name === label)?.error || [0, 0];
      return (
        <div className="col flex popup">
          <div className="col-12 p-0 popup-header">{label}</div>
          <div className="col-12 p-0 popup-content">{Translate("Seroprevalence")}: {seroprevalence.toFixed(2)}%</div>
          <div className="col-12 p-0 popup-content">{Translate("95%ConfidenceInterval")}:  {(seroprevalence - recordError[0]).toFixed(2)}%-{(seroprevalence + recordError[1]).toFixed(2)}%</div>
          <div className="col-12 p-0 popup-content">{Translate('TotalTests')}: {payload[0].payload.n}</div>
          <div className="col-12 p-0 popup-content">{Translate('TotalEstimates')}: {payload[0].payload.num_studies}</div>
        </div>
      );
    }
    return null;
  };


  const renderCustomizedLabel = (props: any) => {
    const { x, y, width, height, value, index } = props;
    let recordError = records[index].error;
    const ratio = width / value;
    const error = Array.isArray(recordError) ? recordError[1] : recordError;
    const errorBarWidth = ratio * error;
    return (
      <g>
        <text x={x + width + 10 + (errorBarWidth as number)} y={y + height / 2 + 5} fill="#000" textAnchor="right" dominantBaseline="right">
          {value.toFixed(2)}
        </text>
      </g>
    );
  };

  const getYAxisWidth = (chartData: Record<string, string | number | number[]>[]) => {
    let longestWord = 0;
    chartData.filter(o => o.name)
      .forEach(o => {
        const country = o.name as string;
        longestWord = country.length > longestWord ? country.length : longestWord;
      })
    return longestWord;
  }

  const isMobileDeviceOrTablet = useMediaQuery({ maxWidth: mobileDeviceOrTabletWidth })

  return (
    <div className="charts-page">
      <div className={isMobileDeviceOrTablet ? "mobile-charts container col-11 center-item flex" : "charts container col-11 center-item flex"}>
        <div className="col-12 p-0 flex">
          <div className="col-sm-1 col-lg-3">
          </div>
          <div className="charts-title flex p-0 mt-2 p-lg-0 col-sm-8 col-lg-6">
            <div className="col-auto flex center-item">
              {Translate('SeroprevalenceBy')}
            </div>
            <Dropdown
              placeholder={Translate('Geographies')}
              fluid selection
              className="col large-dropdown"
              onChange={handleChange}
              options={yAxisOptions}
            >
            </Dropdown>
          </div>
          <div className="col-sm-6 col-lg-3 flex top right">
            95% CI
            <InformationIcon
              offset="10px"
              position="bottom right"
              color="#455a64"
              size="sm"
              tooltip={Translate("95%ConfidenceIntervalTooltip")}
              tooltipHeader={Translate("95%ConfidenceInterval")} />
          </div>
        </div>
        <ResponsiveContainer width="100%" height="80%">
          <BarChart data={records} layout='vertical' barGap={10}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" name={`${Translate("Seroprevalence")} (%)`} padding={{ left: 0, right: 30 }} />
            <YAxis dataKey="name" type="category" interval={0} width={getYAxisWidth(records) * 7} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="seroprevalence" name={`${Translate('Seroprevalence')} (%)`} fill="#55A6BA" maxBarSize={60} barSize={20}>
              <LabelList dataKey="seroprevalence" position="right" content={renderCustomizedLabel} />
              <ErrorBar dataKey="error" width={4} strokeWidth={2} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <ReferencesTable />
    </div>
  );
}
