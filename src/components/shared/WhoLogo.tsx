import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "context";
import { LanguageType } from "types";
import WhoLogoEn from "assets/images/WHO-EN-C-H.png";
import WhoLogoFr from "assets/images/WHO-FR-C-H.png";

// Note: Consider abstracting this component into a generic TranslationImage and passing the image resource in as props if 
// more images need to be translated in the future.

interface WhoLogoProps {
    className?: string | undefined;
    height: string;
}

const WhoLogo = (props :  WhoLogoProps) => {
  const [state] = useContext(AppContext);
  const [imgLanguageResource, setImgLanguageResource] = useState<string | undefined>(undefined);

  useEffect(() => {
    // uses a switch statement so we can support more languages in the future if needed
    switch (state.language) {
      case LanguageType.english:
            setImgLanguageResource(WhoLogoEn);
        break;
      case LanguageType.french:
            setImgLanguageResource(WhoLogoFr);
        break;
      default:
        setImgLanguageResource(WhoLogoEn);
    }
  }, [state.language]);

  return <img src={imgLanguageResource} className={props?.className} alt="World Health Organization" height={props.height}></img>;
};

export default WhoLogo;
