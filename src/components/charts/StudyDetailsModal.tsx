import React from "react";
import "./StudyDetailsModal.css"
import { Modal, Button, Header } from "semantic-ui-react";
import { AirtableRecord } from "../../types";
import { Link } from "react-router-dom";

// TODO: Extract this into a modal service 

interface StudyDetailsModalProps {
  record: AirtableRecord
}
export default function StudyDetailsModal(props: StudyDetailsModalProps) {
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
    <Modal centered={true} size="large" style={inlineStyle.modal} trigger={<Button>Study Details</Button>}>
      <Modal.Header>Study Details</Modal.Header>
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
                <div className="col-12 p-0 secondary-text flex">
                  <div className="secondary-title">Summary: </div>{getPossibleNullString(summary)}
                </div>
                <div className="col-6 p-0 secondary-text flex">
                  <div className="secondary-title">Status: </div>{getPossibleNullString(study_status)}
                </div>
                <div className="col-6 p-0 secondary-text flex">
                  <div className="secondary-title">Study Type: </div>{getPossibleNullString(study_type)}
                </div>
              </div>
            </div>

            <div className="col-12 px-0 py-1">
              <div className="col-12 p-0 section-title">DEMOGRAPHICS</div>
              <div className="col-12 px-2 py-1 flex section-container modal-text-container">
                <div className="col-6 p-0 secondary-text flex">
                  <div className="secondary-title">Population: </div>{getPossibleNullStringArray(population_group)}
                </div>
                <div className="col-6 p-0 secondary-text flex">
                  <div className="secondary-title">Age Group: </div>{getPossibleNullStringArray(age)}
                </div>
                <div className="col-6 p-0 secondary-text flex">
                  <div className="secondary-title">Location: </div>{city ? `${city.join(", ")}, ` : ""}{state ? `${state.join(", ")}, ` : ""}{country ? country : ""}
                </div>
                <div className="col-6 p-0 secondary-text flex">
                  <div className="secondary-title">Sex: </div>{getPossibleNullString(sex)}
                </div>
              </div>
            </div>

            <div className="col-6 pl-0 pr-2 py-1">
              <div className="col-12 p-0 section-title">PREVALENCE</div>
              <div className="col-12 px-2 py-1 flex section-container modal-text-container">
                <div className="col-12 p-0 secondary-text flex">
                  <div className="secondary-title">Prevalence: </div>{seroprevalence?.toFixed(2)}%
                </div>
                <div className="col-12 p-0 secondary-text flex">
                  <div className="secondary-title">Sample Size: </div>{getPossibleNullString(denominator)}
                </div>
                <div className="col-12 p-0 secondary-text flex">
                  <div className="secondary-title">Risk of Bias: </div>{getPossibleNullString(risk_of_bias)}
                </div>
              </div>
            </div>

            <div className="col-6 pl-2 pr-0 py-1">
              <div className="col-12 p-0 section-title">SAMPLING</div>
              <div className="col-12 px-2 py-1 flex section-container modal-text-container">
                <div className="col-12 p-0 secondary-text flex">
                  <div className="secondary-title">Method: </div>{getPossibleNullString(sampling_method)}
                </div>
                <div className="col-12 p-0 secondary-text flex">
                  <div className="secondary-title">Start Date: </div>{getPossibleNullString(sampling_start_date)}
                </div>
                <div className="col-12 p-0 secondary-text flex">
                  <div className="secondary-title">End Date: </div>{getPossibleNullString(sampling_end_date)}
                </div>
              </div>
            </div>

            <div className="col-12 px-0 py-1">
              <div className="col-12 p-0 section-title">TEST DETAILS</div>
              <div className="col-12 px-2 py-1 flex section-container modal-text-container">
                <div className="col-6 p-0 secondary-text flex">
                  <div className="secondary-title">Test Used: </div>{getPossibleNullStringArray(test_type)}
                </div>
                <div className="col-6 p-0 secondary-text flex">
                  <div className="secondary-title">Isotypes: </div>{getPossibleNullStringArray(isotopes_reported)} 
                </div>
                <div className="col-6 p-0 secondary-text flex">
                  <div className="secondary-title">Sensitivity: </div>{getPossibleNullString(sensitivity?.toFixed(2))}
                </div>
                <div className="col-6 p-0 secondary-text flex">
                  <div className="secondary-title">Manufacturer: </div>{getPossibleNullString(manufacturer)}
                </div>
                <div className="col-6 p-0 secondary-text flex">
                  <div className="secondary-title">Specificity: </div>{getPossibleNullString(specificity?.toFixed(2))}
                </div>
                <div className="col-6 p-0 secondary-text flex">
                  <div className="secondary-title">Regulatory Approval: </div>{getPossibleNullString(approving_regulator)}
                </div>
              </div>
            </div>
          </div>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  )
} 