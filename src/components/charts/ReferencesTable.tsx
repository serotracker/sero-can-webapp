import _ from 'lodash';
import React, { useContext, useState, useEffect } from "react";
import { Table, Pagination } from "semantic-ui-react";
import { AppContext } from "../../context";
import './Charts.css';

export default function ReferencesTable() {
  const [column, setColumn] = useState('');
  const [state, dispatch] = useContext(AppContext);
  const [activePage, setActivePage] = useState(1);
  const [boundaryRange, setBoundaryRange] = useState(1);
  const [siblingRange, setSiblingRange] = useState(1);
  const [totalPages, setTotalPages] = useState(10);

  const handlePaginationChange = (e: any, event: any) => {
    const { activePage } = event;
    setActivePage(activePage)
  }


  const [direction, setDirection] = useState('ascending');
  const [data, setData] = useState(state.filtered_records);

  const handleSort = (clickedColumn: string) => () => {
    if (column !== clickedColumn) {
      setColumn(clickedColumn);
      setDirection('ascending');
      return
    }
    else {
      setDirection(direction === 'ascending' ? 'descending' : 'ascending');
    }
  }

  useEffect(() => {
    const newData = _.sortBy(state.filtered_records, [column]);
    setData(newData);
    if (direction === 'descending') {
      setData(newData.reverse());
    }

    const pageLength = 5;
    const splicedData = newData.splice((activePage - 1) * pageLength, pageLength);
    setData(splicedData);
    setTotalPages(Math.ceil(state.filtered_records.length / pageLength));
  }, [activePage, column, direction, state.filtered_records])

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
              sorted={column === 'country' ? direction as any : null}
              onClick={handleSort('country')}
            >
              Country
          </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'populations' ? direction as any : null}
              onClick={handleSort('populations')}
            >
              Populations
          </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'denominator' ? direction as any : null}
              onClick={handleSort('denominator')}
            >
              N
          </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'seroprevalence' ? direction as any : null}
              onClick={handleSort('seroprevalence')}
            >
              Prevalence (%)
          </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {_.map(data, ({ article_name, country, denominator, populations, seroprevalence, url }) => (
            <Table.Row key={Math.random()}>
              <Table.Cell><a href={url ? url : '#'} target="_blank">{article_name}</a></Table.Cell>              
              <Table.Cell>{country}</Table.Cell>
              <Table.Cell>{populations}</Table.Cell>
              <Table.Cell>{denominator}</Table.Cell>
              <Table.Cell>{seroprevalence ? (seroprevalence * 100).toFixed(2) : "No prevalence data"}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
        <Table.Footer>
          <Pagination
            activePage={activePage}
            boundaryRange={boundaryRange}
            onPageChange={handlePaginationChange}
            size='mini'
            siblingRange={siblingRange}
            totalPages={totalPages}
          />
        </Table.Footer>
      </Table>
    </div>
  );
}
