
import React, { useContext } from "react";
import { AppContext } from "context";
import { ANALYZE_URLS, PAGE_HASHES, mobileDeviceOrTabletWidth } from "../../constants";
import { useMediaQuery } from "react-responsive";
import TableauEmbed from "components/shared/TableauEmbed/TableauEmbed";
import "./static.css";

const ANALYZE_MOBILE_HEIGHT = 2900;
const ANALYZE_DESKTOP_HEIGHT = 5000;
const NUM_ANALYZE_CHARTS = 8;

export default function Analyze() {
  const isMobileDeviceOrTablet = useMediaQuery({
    maxWidth: mobileDeviceOrTabletWidth,
  });
  const [{ language }] = useContext(AppContext);

  // function to calculate the number of pixels from the top of the page
  // the nth chart (0-indexed) is
  // note: this assumes that charts are the same height
  const getOffsetForGraphNum = (n: number) => {
    return 20 + (isMobileDeviceOrTablet ? ANALYZE_MOBILE_HEIGHT/NUM_ANALYZE_CHARTS : ANALYZE_DESKTOP_HEIGHT/NUM_ANALYZE_CHARTS)*n;
  }

  return (
    <div className="page col-12">
      <TableauEmbed
        url={ANALYZE_URLS}
        key={`AnalyzeTableau${language}`}
        desktopOptions={{
          width: "82vw",
          height: "5000px"
        }}
        mobileOptions={{
          width: "90vw",
          height: "2900px"
        }}
        />
        {/* These sections are for letting the hash links know where the different sections are inside the embed*/}
        <section id={PAGE_HASHES.Analyze.ByCountry} style={{ position: 'absolute', top: getOffsetForGraphNum(0)}}></section>
        <section id={PAGE_HASHES.Analyze.ByPopulation} style={{ position: 'absolute', top: getOffsetForGraphNum(3)}}></section>
        <section id={PAGE_HASHES.Analyze.AdditionalGraphs} style={{ position: 'absolute', top: getOffsetForGraphNum(4)}}></section>
    </div>
  );
}
