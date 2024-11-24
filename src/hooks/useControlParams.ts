import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export type StringParamsType = {
  [key: string]: string;
};

export type SetParamsType = (value: StringParamsType, replace?: boolean) => StringParamsType;
export type GetParamsType = () => StringParamsType;
export type InitiateParamsType = () => void;
export type ResetParamsType = (replace: boolean) => void;

export const useControlParams = (paramStartValues: StringParamsType) => {
  const [searchParams, setSearchParams] = useSearchParams();
  // get params from url, and if there is no such a value in there, get it from paramStartValues
  const getParams: GetParamsType = () => {
    const paramObj: StringParamsType = {};
    for (const key in paramStartValues) {
      paramObj[key] = searchParams.get(key) || paramStartValues[key];
    }
    return paramObj;
  };
  const [query, setQuery] = useState<StringParamsType>(getParams());
  useEffect(() => {
    setQuery(getParams());
  }, [searchParams]);

  // if the url already has all of the parameters, do nothing; otherwise, set the absent parameters in the url
  const initiateParams: InitiateParamsType = () => {
    const modifiedSearchParams = new URLSearchParams(searchParams);
    let isModified = false;
    for (const key in paramStartValues) {
      if (modifiedSearchParams.has(key)) continue;
      modifiedSearchParams.set(key, paramStartValues[key]);
      isModified = true;
    }
    if (isModified) {
      setSearchParams(modifiedSearchParams, { replace: true });
    }
  };

  // set new values of parameters
  const setParams: SetParamsType = (value, replace) => {
    const modifiedSearchParams = new URLSearchParams(searchParams);
    for (const key in value) {
      if (!modifiedSearchParams.has(key)) {
        modifiedSearchParams.append(key, value[key]);
        continue;
      }
      modifiedSearchParams.set(key, value[key]);
    }
    setSearchParams(modifiedSearchParams, { replace });
    return value;
  };
  const resetParams: ResetParamsType = (replace) => {
    setSearchParams(paramStartValues, { replace });
  };

  useEffect(() => {
    initiateParams();
  }, []);

  return { initiateParams, getParams, setParams, resetParams, searchParams };
};
