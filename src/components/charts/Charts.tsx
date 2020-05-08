import React, { useState, useContext } from "react";
import { Card, Table, Dropdown } from "semantic-ui-react";
import './Charts.css'
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer, ErrorBar, LabelList } from 'recharts';
import ReferencesTable from "./ReferencesTable";
import { AppContext } from "../../context";
import { getAggregateData } from "../../metaAnalysis";

export default function Charts() {
  const [yAxisSelection, setYAxis] = useState('Population');
  const [state, dispatch] = useContext(AppContext);

  const { filtered_records } = state;
  
  const chartData = getAggregateData(filtered_records, 'country')

  const yAxisOptions = [
    { key: 'Population', text: 'Population', value: 'Population' },
    { key: 'Geographies', text: 'Geographies', value: 'Geographies' }
  ]

  const handleChange = (e: any) => {    
    setYAxis(e.value);
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
              defaultValue={yAxisOptions[0].text}
              fluid
              selection
              item={true}
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
          <BarChart data={chartData} layout='vertical'>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" name="Seroprevalence (%)" />
            <YAxis dataKey="name" type="category" />
            <Tooltip content={<CustomTooltip />}/>
            <Legend />
            <Bar dataKey="seroprevalence" name="Seroprevalence (%)" fill="#55A6BA">
              <LabelList dataKey="seroprevalence" position="right" content={renderCustomizedLabel} />
              <ErrorBar dataKey="error" width={0} strokeWidth={1} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
        <ReferencesTable />
    </div>
  );
}
