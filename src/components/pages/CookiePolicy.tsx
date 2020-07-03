import React, { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { mobileDeviceOrTabletWidth } from "../../constants";
import Translate from "../../utils/translate/translateService";
import './static.css';

export default function CookiePolicy() {
  const isMobileDeviceOrTablet = useMediaQuery({ maxDeviceWidth: mobileDeviceOrTabletWidth })

  useEffect(() => {
    const script = document.createElement('script');

    script.text = "(function(d, s, id) { var js, tjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) return; js = d.createElement(s); js.id = id; js.src = 'https://app.termly.io/embed-policy.min.js'; tjs.parentNode.insertBefore(js, tjs); }(document, 'script', 'termly-jssdk'));"

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, []);

  return (
    <div className="col-12 page">
      <div className={isMobileDeviceOrTablet ? "pb-2 policy-container flex fill" : "policy-container static-content pb-2 flex fill"}>
        <h1 className="col-12 p-0 fit">
          {Translate('CookiePolicy')}
        </h1>
        <iframe title="CookiePolicy" className="fill policy-iframe" src="https://app.termly.io/embed/terms-of-use/4cfb8f90-983a-40b4-bea2-2cdd373f14b5"></iframe>
      </div>
    </div>
  )
}
