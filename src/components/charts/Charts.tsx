import _ from "lodash";
import React, { useContext, useEffect, useState, SyntheticEvent } from "react";
import { Bar, BarChart, CartesianGrid, ErrorBar, LabelList, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Dropdown, DropdownProps } from "semantic-ui-react";
import { AppContext } from "../../context";
import { getAggregateData } from "../../metaAnalysis";
import './Charts.css';
import ReferencesTable from "./ReferencesTable";
import { AggregationFactor } from "../../types";

export default function Charts() {
  const [yAxisSelection, setYAxis] = useState(AggregationFactor.country);
  const [state] = useContext(AppContext);
  const { filtered_records } = state;
  const aggregatedRecords = getAggregateData(filtered_records, yAxisSelection);
  const [records, setRecords] = useState(aggregatedRecords);

  const yAxisOptions = [
    { key: 'Population', text: 'Population', value: AggregationFactor.population },
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

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label} : ${payload[0].value.toFixed(2)}`}</p>
        </div>
      );
    }
    return null;
  };


  const renderCustomizedLabel = (props: any) => {
    const { x, y, width, height, value } = props;
    return (
      <g>
        <text x={x + width + 10} y={y + height / 2} fill="#000" textAnchor="right" dominantBaseline="right">
          {value.toFixed(2)}
        </text>
      </g>
    );
  };

  const getYAxisWidth = (chartData: Record<string, string | number>[]) => {
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
      <div className="charts container col-10 center-item flex">
        <div className="col-12 p-0 center-item flex">
          <div className="col-3">
          </div>
          <div className="charts-title flex col-6">
            <div className="col-auto flex center-item">
              Seroprevalence by
            </div>
            <Dropdown
              placeholder='Select Independent Variable'
              defaultValue={'1'}
              fluid selection
              className="col large-dropdown"
              onChange={handleChange}
              options={yAxisOptions}
            >
            </Dropdown>
          </div>
          <div className=" col-3 flex top right">
            95% CI
          </div>
        </div>
        <ResponsiveContainer width="80%" height="80%">
          <BarChart data={records} layout='vertical'>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" name="Seroprevalence (%)" />
            <YAxis dataKey="name" type="category" width={getYAxisWidth(records) * 7} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="seroprevalence" name="Seroprevalence (%)" fill="#55A6BA">
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
