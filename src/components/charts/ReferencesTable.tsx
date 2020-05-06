import React, { useState, useContext } from "react";
import { Icon, Table } from "semantic-ui-react";
import './Charts.css';
import { AppContext } from "../../context";
import _ from 'lodash';
import { AirtableRecord } from "../../types";

export default function ReferencesTable() {
  const [column, setColumn] = useState('');
  const [state, dispatch] = useContext(AppContext);


  const [direction, setDirection] = useState('ascending');
  const [data, setData] = useState(state.filtered_records);

  const handleSort = (clickedColumn: string) => () => {
    if (column !== clickedColumn) {
      setColumn(clickedColumn);
      const newData = _.sortBy(data, [clickedColumn]);
      setData(newData);
      setDirection('ascending');
      return
    }

    setData(data.reverse());
    setDirection(direction === 'ascending' ? 'descending' : 'ascending');
  }

  return (
    <div className="container col-10 m-4 center-item flex">
      <div className="col-12 px-0 py-3 section-title">
        REFERENCES
      </div>
      <Table celled sortable fixed className="mb-3 mt-0">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={column === 'title' ? direction as any : null}
              onClick={handleSort('title')}
            >
              Name
          </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'numerator' ? direction as any : null}
              onClick={handleSort('numerator')}
            >
              N
          </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'seroprevalence' ? direction as any : null}
              onClick={handleSort('seroprevalence')}
            >
              Prevalence
          </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'populations' ? direction as any : null}
              onClick={handleSort('populations')}
            >
              Populations
          </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {_.map(data, ({ name, numerator, populations, seroprevalence }) => (
            <Table.Row key={Math.random()}>
              <Table.Cell>{name}</Table.Cell>
              <Table.Cell>{numerator}</Table.Cell>
              <Table.Cell>{seroprevalence}</Table.Cell>
              <Table.Cell>{populations}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
