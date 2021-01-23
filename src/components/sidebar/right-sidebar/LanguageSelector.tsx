import React, { useContext, useState } from "react";
import { CheckboxProps, Radio } from "semantic-ui-react";
import { AppContext } from "../../../context";
import { LanguageType } from "../../../types";
import Translate from "../../../utils/translate/translateService";


export default function LanguageSelector() {
  const [state, dispatch] = useContext(AppContext);
  const [checked, setChecked] = useState(state.language === LanguageType.french)
  const handleChange = (event: React.SyntheticEvent<HTMLElement, Event>, data: CheckboxProps) => {
    event.preventDefault();
    let newLanguage = data.checked ? LanguageType.french : LanguageType.english
    setChecked(data.checked || false);
    dispatch({
      type: 'SELECT_LANGUAGE',
      payload: newLanguage
    })
  }

  return (
    <div className="flex center-item">
      <div className="col-auto mt-1">{Translate('English')}</div>
      < Radio toggle checked={checked} onChange={handleChange} onClick={(e, ea) => { e.preventDefault() }}></Radio >
      <div className="col-auto mt-1">{Translate('French')}</div>
    </div>
  )
}