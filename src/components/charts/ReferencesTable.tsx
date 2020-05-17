import _ from 'lodash';
import React, { useContext, useState, useEffect } from "react";
import { Table, Pagination } from "semantic-ui-react";
import { AppContext } from "../../context";
import './Charts.css';

export default function ReferencesTable() {
  const [state] = useContext(AppContext);
  const [activePage, setActivePage] = useState(1);
  const [boundaryRange] = useState(1);
  const [siblingRange] = useState(1);
  const [totalPages, setTotalPages] = useState(10);

  const [column, setColumn] = useState('denominator');
  const [direction, setDirection] = useState('descending');
  const [data, setData] = useState(state.filtered_records);

  const handlePaginationChange = (e: any, event: any) => {
    const { activePage } = event;
    setActivePage(activePage)
  }

  const handleSort = (clickedColumn: string) => () => {
    if (column !== clickedColumn) {

      setActivePage(1);
      setColumn(clickedColumn);
      setDirection('ascending');
      return
    }
    else {
      setDirection(direction === 'ascending' ? 'descending' : 'ascending');
    }
  }

  useEffect(() => {
    let newData = _.orderBy(state.filtered_records, [column], ['asc']);

    if (direction === 'descending') {
      newData = _.orderBy(state.filtered_records, [(o: any) => { return o[column] || '' }], ['desc']);
    }

    const pageLength = 5;
    const splicedData = newData.splice((activePage - 1) * pageLength, pageLength);
    setData(splicedData);
    setTotalPages(Math.ceil(state.filtered_records.length / pageLength));
  }, [activePage, column, direction, state.filtered_records])

  return (
    <div className="container col-11 m-4 center-item flex">
      <div className="col-12 px-0 py-3 section-title">
        REFERENCES
      </div>
      <Table celled sortable fixed striped className="table mb-3 mt-0">
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
        <Table.Body className="col-12 p-0">
          {_.map(data, ({ article_name, country, denominator, populations, seroprevalence, url }) => (
            <Table.Row key={Math.random()}>
              <Table.Cell><a href={url ? url : '#'} target="_blank" rel="noopener noreferrer">{article_name}</a></Table.Cell>
              <Table.Cell>{country ? country : "Not Reported"}</Table.Cell>
              <Table.Cell>{populations ? populations : "Not Reported"}</Table.Cell>
              <Table.Cell>{denominator ? denominator : "Not Reported"}</Table.Cell>
              <Table.Cell>{seroprevalence ? `${(seroprevalence * 100).toFixed(2)}` : "Not Reported"}</Table.Cell>
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
