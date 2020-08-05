import React from "react";
import CountryList from "./CountryList";
import TotalStats from "./TotalStats";
import "../sidebar.css"
import Translate from "../../../utils/translate/translateService";

export default function LeftSidebar() {
  return (
    <div className="sidebar-container flex">
      <TotalStats />
      <CountryList />
      <div className="col-12 pb-1 fit">
        <div className='col-12 p-0 center-item flex'>
          <div className="section-title">
            <i>{Translate("LancetArticle").toUpperCase()}</i>{Translate("Article", null, null, [true, false]).toUpperCase()}
          </div>
        </div>
        <div className="py-1 center"><a
          className="p-1 flex center-item"
          target="__blank"
          rel="noopener noreferrer"
          href="https://www.thelancet.com/journals/laninf/article/PIIS1473-3099(20)30631-9/fulltext#%20">{Translate('ViewHere')}</a>
        </div>
      </div>

    </div>
  )
}