import _ from 'lodash';
import React, { useContext, useEffect, useState } from "react";
import { useMediaQuery } from 'react-responsive';
import { mobileDeviceWidth } from '../../constants';
import { AppContext } from "../../context";
import { AirtableRecord } from '../../types';
import Translate from '../../utils/translate/translateService';
import StudiesTable from '../shared/StudiesTable';
import './Charts.css';
import httpClient from "../../httpClient";

export default function ReferencesTable() {
  const [state, dispatch] = useContext(AppContext);
  const [activePage] = useState(1);
  const [, setTotalPages] = useState(10);
  const [pageLength, setPageLength] = useState(5);
  const [column, ] = useState('denominator');
  const [direction, ] = useState('descending');
  const initialDataState: AirtableRecord[] = [];
  const [, setData] = useState(initialDataState);
  const isMobileDevice = useMediaQuery({ maxWidth: mobileDeviceWidth })

  useEffect(() => {
    const api = new httpClient()
    // TODO: leverage pagination
    const getAirtableRecords = async () => {
      const response = await api.getAirtableRecords(state.filters)
      dispatch({
        type: 'GET_AIRTABLE_RECORDS',
        payload: response
      });
    }
    getAirtableRecords()
  }, [state.filters])

  useEffect(() => {
    let newData = [];

    if (direction === 'descending') {
      newData = _.orderBy(state.filteredRecords, [(o: any) => { return o[column] || '' }], ['desc']);
    }
    else {
      newData =  _.orderBy(state.filteredRecords, [column], ['asc']);
    }

    const splicedData = newData.splice((activePage - 1) * pageLength, pageLength);
    setData(splicedData);

    if (isMobileDevice) {
      setPageLength(Math.ceil(state.filteredRecords.length))
    }
    else {
      setTotalPages(Math.ceil(state.filteredRecords.length / pageLength));
    }
  }, [activePage, column, direction, isMobileDevice, pageLength, state.filteredRecords])


  return (
    <div className="container col-11 mt-3 top references">
      <div className="col-12 px-0 py-3 section-title">
        {Translate('References').toUpperCase()}
      </div>
       <StudiesTable dataRecords={state.filteredRecords} showAllStudies={false}></StudiesTable>
    </div>
  );
}
