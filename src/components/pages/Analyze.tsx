
import React, { useContext } from "react";
import { AppContext } from "context";
import { ANALYZE_URLS, PAGE_HASHES } from "../../constants";
import TableauEmbed from "components/shared/TableauEmbed";
import "./static.css";

export default function Analyze() {

  const [{ language }] = useContext(AppContext);

  return (
    <div className="page col-12">
      <TableauEmbed
        url={ANALYZE_URLS}
        key={`AnalyzeTableau${language}`}
        desktopOptions={{
            width: "82vw",
            height: "4030px"
        }}
        mobileOptions={{
            width: "90vw",
            height: "2900px"
        }}
        />
        {/* These sections are for letting the hash links know where the different sections are inside the embed*/}
        <section id={PAGE_HASHES.Analyze.ByCountry} style={{ position: 'absolute', top: 20}}></section>
        <section id={PAGE_HASHES.Analyze.ByPopulation} style={{ position: 'absolute', top: 780}}></section>
        <section id={PAGE_HASHES.Analyze.AdditionalGraphs} style={{ position: 'absolute', top: 1500}}></section>
    </div>
  );
}
