import { useContext } from "react";
import { AppContext } from "../../context";
import English from './en.json';
import French from './fr.json';
import { LanguageType } from "../../types";

interface TranslateStringProps {
  text: string;
}

// Recursive Typings for nested JSON objects
type JsonRecord<T> = Record<string, T | string>;
interface Json extends JsonRecord<Json> { };

const recursiveFind = (object: any, keys: string[], index: number): string => {
  const key = keys[index];
  const nextObj = object[key];

  if (index + 1 === keys.length) {
    return nextObj;
  }
  return recursiveFind(nextObj, keys, index + 1);

}

let language: LanguageType = LanguageType.english;

export const setLanguageType = (newLanguage: LanguageType) => {
  language = newLanguage;
}

export default function Translate(
  text: string,
  specifier: string[] | null = null,
  substitution: Record<string, string | number> | null = null,
  addSpaces: [boolean, boolean] | null = null
): string {
  const translationDictionary: Json = language === LanguageType.english ?
    English as Json : French as Json;

  try {
    let translatedString = translationDictionary[text];

    if (!translatedString) {
      return (specifier ? specifier[specifier.length - 1] : text) + "*";
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

    if (addSpaces && addSpaces[0]) {
      translatedString = " " + translatedString;
    }

    if (addSpaces && addSpaces[1]) {
      translatedString += " ";
    }
    return translatedString as string;
  }
  catch (e) {
    return `No translation for string ${text}`
  }
}