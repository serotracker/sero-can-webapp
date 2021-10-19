import { Location, LocationListener, UnregisterCallback } from 'history'
import { useEffect } from 'react'
import ReactGA from 'react-ga'
import { useHistory } from 'react-router-dom'
import _ from "lodash";
import { FiltersConfig, FilterType } from "../types";
import { getEmptyFilters } from "../context"

const sendPageView: LocationListener = (location: Location): void => {
  ReactGA.set({ page: location.pathname })
  ReactGA.pageview(location.pathname)
}
interface eventSenderProps {
  /** Typically the object that was interacted with (e.g. 'Video') */
  category: string,
  /** The type of interaction (e.g. 'play') */
  label: string,
  /** Useful for categorizing events (e.g. 'Fall Campaign') */
  action: string
}

export const sendAnalyticsEvent = (props: eventSenderProps) => {
  const cookieAcceptance = localStorage.getItem('acceptedCookies');
  if (cookieAcceptance) {
    ReactGA.event(props);
  }
}

// Send filters analytics event if filters have been updated
export const sendFiltersAnalyticsEvent = (newFilters: FiltersConfig) => {
  // Only send event if they are
  const defaultFilters = getEmptyFilters();
  if(!_.isEqual(newFilters, defaultFilters)){
    // Construct label string
    // Format: "FilterTypeA - OptionA,OptionB; FilterTypeB - OptionA,OptionB"
    // Filter types and options within filter types should be listed in alpha order
    // to ensure that the same filter combination always shows up as the same event on GA
    let labelString = "";
    Object.keys(newFilters).sort().forEach(key => {
      const filterOptions = newFilters[key as FilterType];
      // Handle single/multi select filters
      if(Array.isArray(filterOptions)){
        if(!_.isEqual(filterOptions, defaultFilters[key as FilterType])){
          labelString += `${key.toString()} - ${filterOptions.sort()};`
        }
      }
      // Handle checkbox filters
      // we only want to log that a checkbox filter was used 
      // if it = true (i.e. it was applied)
      else if(filterOptions === true){
        labelString += `${key.toString()};`
      }
    });
    sendAnalyticsEvent({
      category: 'Filter',
      action: 'selection',
      label: labelString
    })
  }
}

// `sendFilterAnalyticsEvent` will overreport the number of times 
// the Unity filter was applied (it gets called whenever any of the filters change)
// so we need to track when the Unity filter was hit specifically through another event
export const sendUnityAnalyticsEvent = () => {
  sendAnalyticsEvent({
    category: 'WHO Unity Filter',
    action: 'checked',
    label: ""
  })
}

interface Props {
  children: JSX.Element;
}
const GAListener = ({ children }: Props): JSX.Element => {
  const isDev = process.env.NODE_ENV === "development";
  const history = useHistory()
  useEffect((): UnregisterCallback | void => {
    sendPageView(history.location, 'REPLACE')
    return history.listen(sendPageView)
  }, [history, isDev])

  return children
}

export default GAListener