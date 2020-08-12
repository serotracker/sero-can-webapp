import _ from 'lodash';
import React, { useContext, useEffect, useState } from "react";
import { Dropdown, DropdownProps, Pagination, Table } from "semantic-ui-react";
import { AppContext } from "../../context";
import './Charts.css';
import StudyDetailsModal from './StudyDetailsModal';
import { mobileDeviceWidth } from '../../constants';
import { useMediaQuery } from 'react-responsive';
import { AirtableRecord } from '../../types';
import Translate from '../../utils/translate/translateService';
import StudiesTable from '../shared/StudiesTable';

export default function ReferencesTable() {
  const [state] = useContext(AppContext);
  
  return (
    <div className="container col-11 mt-3 top references">
      <div className="col-12 px-0 py-3 section-title">
        {Translate('References').toUpperCase()}
      </div>
       <StudiesTable dataRecords={state.airtableRecords} showAllStudies={false}></StudiesTable>
    </div>
  );
}
