import React, { useContext } from "react";
import { DropdownProps, Radio, CheckboxProps, Form } from "semantic-ui-react";
import { AppContext } from "../../../context";
import { LanguageType } from "../../../types";


export default function LanguageSelector() {
  const [, dispatch] = useContext(AppContext);

  const handleChange = (event: React.SyntheticEvent<HTMLElement, Event>, data: CheckboxProps) => {
    event.preventDefault();
    let newLanguage = data.checked ? LanguageType.french : LanguageType.english

    dispatch({
      type: 'SELECT_LANGUAGE',
      payload: newLanguage
    })
  }

  return (
    <div className="flex center-item">
      <div className="col-auto">English</div>
      < Radio toggle onChange={handleChange} onClick={(e, ea) => {e.preventDefault()}}></Radio >
      <div className="col-auto">French</div>
    </div>
  )
}