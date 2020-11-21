import _ from 'lodash';
import React, { useContext, useEffect, useState } from "react";
import { useMediaQuery } from 'react-responsive';
import { mobileDeviceWidth } from '../../constants';
import { AppContext } from "../../context";
import { AirtableRecord } from '../../types';
import Translate from '../../utils/translate/translateService';
import StudiesTable from '../shared/StudiesTable';
import './Charts.css';

export default function ReferencesTable() {
  const [state,] = useContext(AppContext);
  const [activePage] = useState(1);
  const [, setTotalPages] = useState(10);
  const [pageLength, setPageLength] = useState(5);
  const [column, ] = useState('denominator');
  const [direction, ] = useState('descending');
  const initialDataState: AirtableRecord[] = [];
  const [, setData] = useState(initialDataState);
  const isMobileDevice = useMediaQuery({ maxWidth: mobileDeviceWidth })

  useEffect(() => {
    let newData = [];

    if (direction === 'descending') {
      newData = _.orderBy(state.records, [(o: any) => { return o[column] || '' }], ['desc']);
    }
    else {
      newData =  _.orderBy(state.records, [column], ['asc']);
    }

    const splicedData = newData.splice((activePage - 1) * pageLength, pageLength);
    setData(splicedData);

    if (isMobileDevice) {
      setPageLength(Math.ceil(state.records.length))
    }
    else {
      setTotalPages(Math.ceil(state.records.length / pageLength));
    }
  }, [activePage, column, direction, isMobileDevice, pageLength, state.records])


  return (
    <div className="container col-11 mt-3 top references">
      <div className="col-12 px-0 py-3 section-title">
        {Translate('References').toUpperCase()}
      </div>
       <StudiesTable dataRecords={state.records} showAllStudies={false}></StudiesTable>
    </div>
  );
}
