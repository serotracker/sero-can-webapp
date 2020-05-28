import { useContext } from "react";
import { AppContext } from "../../context";
import English from './en.json';
import French from './fr.json';
import { LanguageType } from "../../types";

interface TranslateStringProps {
  text: string;
}

const recursiveFind = (object: any, keys: string[], index: number): string => {
  const key = keys[index];
  const nextObj = object[key];

  if (index + 1 === keys.length) {
    return nextObj;
  }
  return recursiveFind(nextObj, keys, index + 1);

}

export default function Translate(text: string, specifier: string[] | null = null, substitution: Record<string, string | number> | null = null): string {
  const [{ language }] = useContext(AppContext)

  const translationDictionary: Record<string, string | Record<string, string>> = language === LanguageType.english ?
    English as Record<string, string | Record<string, string>> : French as Record<string, string | Record<string, string>>;

  try {
    let translatedString = translationDictionary[text];

    if (!translatedString) {
      return text + "*"
    }

    if (specifier) {
      translatedString = recursiveFind(translatedString, specifier, 0);
    }

    if (substitution) {
      Object.keys(substitution).forEach(key => {
        const value = substitution[key];
        const replace = new RegExp(key, "g");
        translatedString = (translatedString as string).replace(replace, `${value}`);
      });
    }
    return translatedString as string;
  }
  catch (e) {
    return `No translation for string ${text}`
  }
}