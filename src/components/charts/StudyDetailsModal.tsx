import React, { useState } from "react";
import "./StudyDetailsModal.css"
import { Modal, Button, Header } from "semantic-ui-react";
import { AirtableRecord } from "../../types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

// TODO: Extract this into a modal service 

interface StudyDetailsModalProps {
  record: AirtableRecord
}
export default function StudyDetailsModal(props: StudyDetailsModalProps) {
  const [open, setOpen] = useState(false);

  const inlineStyle = {
    modal: {
      marginTop: '0px !important',
      marginLeft: 'auto',
      marginRight: 'auto',
      top: 'auto',
      left: 'auto',
      height: 'auto'
    }
  };

  const getPossibleNullString = (nullString: string | number | null | undefined) => {
    if (nullString === null || nullString === undefined) {
      return "Not Reported"
    }
    return nullString
  }

  const getPossibleNullStringArray = (nullString: string[] | null | undefined) => {
    if (nullString === null || nullString === undefined) {
      return "Not Reported"
    }
    return nullString.join(", ")
  }

  const {
    source_name, first_author, lead_org, publish_date, publisher, url,
    summary, study_status, study_type,
    population_group, age, city, state, country, sex,
    seroprevalence, risk_of_bias, denominator,
    sampling_method, sampling_end_date, sampling_start_date,
    test_type, sensitivity, specificity, isotopes_reported, manufacturer, approving_regulator
  } = props.record
  return (
    <Modal
      centered={true}
      size="large"
      closeOnEscape={true}
      closeOnDimmerClick={true}
      onClose={() => {setOpen(false)}}
      open={open}
      style={inlineStyle.modal}
      trigger={
        <Button onClick={() => setOpen(true)} style={{ padding: '8px' }}>
          Details
      </Button>}>
      <Modal.Header>Prevalence Estimate Details
        <FontAwesomeIcon onClick={() => setOpen(false)} icon={faTimes} size={"sm"} className="float-right cursor" />
      </Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <div className="col-12 p-0 flex">
            <div className="col-12 px-0 py-1">
              <div className="col-12 p-0 section-title">SOURCE</div>
              <div className="col-12 px-2 py-1 section-container modal-text-container">
                <Link to={url || ""} className="col-12 p-0 name-text">
                  {source_name}
                </Link>
                <div className="col-12 p-0 secondary-text">
                  {`By ${first_author} `}{lead_org ? `at ${lead_org}` : ""}
                </div>
                <div className="col-12 p-0 tertiary-text">
                  {publish_date ? `Published ${publish_date} ` : ""}{publisher ? `by ${publisher}` : ""}
                </div>
              </div>
            </div>

            <div className="col-12 px-0 py-1">
              <div className="col-12 p-0 section-title">STUDY</div>
              <div className="col-12 px-2 py-1 flex section-container modal-text-container">
                <div className="col-12 p-0 secondary-text">
                  <div>
                    <span className="secondary-title">Summary: </span>
                    {getPossibleNullString(summary)}
                  </div>
                </div>
                <div className="col-6 p-0 secondary-text">
                  <div>
                    <span className="secondary-title">Status: </span>{getPossibleNullString(study_status)}
                  </div>
                </div>
                <div className="col-6 p-0 secondary-text">
                  <div>
                    <span className="secondary-title">Study Type: </span>{getPossibleNullString(study_type)}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 px-0 py-1">
              <div className="col-12 p-0 section-title">DEMOGRAPHICS</div>
              <div className="col-12 px-2 py-1 flex section-container modal-text-container">
                <div className="col-6 p-0 secondary-text">
                  <span className="secondary-title">Population: </span>{getPossibleNullStringArray(population_group)}
                </div>
                <div className="col-6 p-0 secondary-text">
                  <span className="secondary-title">Age Group: </span>{getPossibleNullStringArray(age)}
                </div>
                <div className="col-6 p-0 secondary-text">
                  <span>
                    <span className="secondary-title">Location: </span>{city ? `${city.join(", ")}, ` : ""}{state ? `${state.join(", ")}, ` : ""}{country ? country : ""}
                  </span>
                </div>
                <div className="col-6 p-0 secondary-text">
                  <span className="secondary-title">Sex: </span>{getPossibleNullString(sex)}
                </div>
              </div>
            </div>

            <div className="col-6 pl-0 pr-2 py-1">
              <div className="col-12 p-0 section-title">PREVALENCE</div>
              <div className="col-12 px-2 py-1 flex section-container modal-text-container">
                <div className="col-12 p-0 secondary-text">
                  <span className="secondary-title">Prevalence: </span>{seroprevalence ? (seroprevalence * 100).toFixed(2) : "Not Reported"}%
                </div>
                <div className="col-12 p-0 secondary-text">
                  <span className="secondary-title">Sample Size: </span>{getPossibleNullString(denominator)}
                </div>
                <div className="col-12 p-0 secondary-text">
                  <span className="secondary-title">Risk of Bias: </span>{getPossibleNullString(risk_of_bias)}
                </div>
              </div>
            </div>

            <div className="col-6 pl-2 pr-0 py-1">
              <div className="col-12 p-0 section-title">SAMPLING</div>
              <div className="col-12 px-2 py-1 flex section-container modal-text-container">
                <div className="col-12 p-0 secondary-text">
                  <div>
                    <span className="secondary-title">Sampling Method: </span>{getPossibleNullString(sampling_method)}
                  </div>
                </div>
                <div className="col-12 p-0 secondary-text">
                  <div>
                    <span className="secondary-title">Start Date: </span>{getPossibleNullString(sampling_start_date)}
                  </div>
                </div>
                <div className="col-12 p-0 secondary-text">
                  <div>
                    <span className="secondary-title">End Date: </span>{getPossibleNullString(sampling_end_date)}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 px-0 py-1">
              <div className="col-12 p-0 section-title">TEST DETAILS</div>
              <div className="col-12 px-2 py-1 flex section-container modal-text-container">
                <div className="col-6 p-0">
                  <div className="col-12 p-0 secondary-text">
                    <div>
                      <span className="secondary-title">Manufacturer: </span>{getPossibleNullString(manufacturer)}
                    </div>
                  </div>
                  <div className="col-12 p-0 secondary-text">
                    <div>
                      <span className="secondary-title">Test Used: </span>{getPossibleNullStringArray(test_type)}
                    </div>
                  </div>
                  <div className="col-12 p-0 secondary-text">
                    <div>
                      <span className="secondary-title">Isotypes: </span>{getPossibleNullStringArray(isotopes_reported)}
                    </div>
                  </div>
                </div>
                <div className="col-6 p-0">
                  <div className="col-12 p-0 secondary-text">
                    <div>
                      <span className="secondary-title">Specificity: </span>{specificity ? `${(specificity * 100).toFixed(2)}%` : "Not Reported"}
                    </div>
                  </div>
                  <div className="col-12 p-0 secondary-text">
                    <div>
                      <span className="secondary-title">Sensitivity: </span>{sensitivity ? `${(sensitivity * 100).toFixed(2)}%` : "Not Reported"}
                    </div>
                  </div>
                  <div className="col-126 p-0 secondary-text">
                    <div>
                      <span className="secondary-title">Regulatory Approval: </span>{getPossibleNullString(approving_regulator)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Description>
      </Modal.Content>
    </Modal >
  )
} 