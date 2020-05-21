import _ from "lodash";
import React, { useContext, useEffect, useState, SyntheticEvent } from "react";
import { Bar, BarChart, CartesianGrid, ErrorBar, LabelList, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Dropdown, DropdownProps } from "semantic-ui-react";
import { AppContext } from "../../context";
import { getAggregateData } from "../../metaAnalysis";
import './Charts.css';
import ReferencesTable from "./ReferencesTable";
import { AggregationFactor } from "../../types";
import InformationIcon from "../shared/InformationIcon";

export default function Charts() {
  const [yAxisSelection, setYAxis] = useState(AggregationFactor.country);
  const [state] = useContext(AppContext);
  const { filtered_records } = state;
  const aggregatedRecords = getAggregateData(filtered_records, yAxisSelection);
  const [records, setRecords] = useState(aggregatedRecords);

  const yAxisOptions = [
    { key: 'Population', text: 'Population', value: AggregationFactor.population_group },
    { key: 'Geographies', text: 'Geographies', value: AggregationFactor.country }
  ]

  useEffect(() => {
    const reAggregatedRecords = getAggregateData(filtered_records, yAxisSelection);
    const chartData = _.sortBy(reAggregatedRecords, 'seroprevalence').reverse();
    setRecords(chartData);
  }, [yAxisSelection, state, filtered_records])

  const handleChange = (event: SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
    setYAxis(data.value as AggregationFactor);
  }

  const CustomTooltip = (e: any) => {
    const { active, payload, label } = e
    if (active && payload) {
      const seroprevalence =  payload[0].value;
      const recordError = records.find(o => o.name === label)?.error || [0, 0];
      return (
        <div className="col flex popup">
          <div className="col-12 p-0 popup-header">{label}</div>
          <div className="col-12 p-0 popup-content">Seroprevalence: {seroprevalence.toFixed(2)}%</div>
          <div className="col-12 p-0 popup-content">95% Confidence Interval:  {(seroprevalence - recordError[0]).toFixed(2)}%-{(seroprevalence + recordError[1]).toFixed(2)}%</div>
          <div className="col-12 p-0 popup-content">Total Tests: {payload[0].payload.n}</div>
          <div className="col-12 p-0 popup-content">Total Estimates: {payload[0].payload.num_studies}</div>
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

  return (
    <div className="charts-page flex">
      <div className="charts container col-11 center-item flex">
        <div className="col-12 p-0 center-item flex">
          <div className="col-3">
          </div>
          <div className="charts-title flex col-6">
            <div className="col-auto flex center-item">
              Seroprevalence by
            </div>
            <Dropdown
              placeholder='Geographies'
              fluid selection
              className="col large-dropdown"
              onChange={handleChange}
              options={yAxisOptions}
            >
            </Dropdown>
          </div>
          <div className=" col-3 flex top right">
            95% CI
            <InformationIcon
            offset="10px"
            position="bottom right"
            color="#455a64"
            size="sm"
            tooltip={`Error bars are calculated using the formula for variance: \n prevalence * (1 - prevalence) / total tests`}
            tooltipHeader="95% Confidence Interval"/>
          </div>
        </div>
        <ResponsiveContainer width="100%" height="80%">
          <BarChart data={records} layout='vertical'>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" name="Seroprevalence (%)" />
            <YAxis dataKey="name" type="category" width={getYAxisWidth(records) * 7} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="seroprevalence" name="Seroprevalence (%)" fill="#55A6BA" maxBarSize={60}>
              <LabelList dataKey="seroprevalence" position="right" content={renderCustomizedLabel} />
              <ErrorBar dataKey="error" width={4} strokeWidth={2}/>
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <ReferencesTable />
    </div>
  );
}
