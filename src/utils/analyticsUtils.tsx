import { Location, LocationListener, UnregisterCallback } from 'history'
import { useEffect } from 'react'
import ReactGA from 'react-ga'
import { useHistory } from 'react-router-dom'
import _ from "lodash";
import { Filters, FilterType } from "../types";
import { getEmptyFilters } from "../context"

const sendPageView: LocationListener = (location: Location): void => {
  ReactGA.set({ page: location.pathname })
  ReactGA.pageview(location.pathname)
}
interface eventSenderProps {
  category: string,
  label: string,
  action: string
}

export const sendAnalyticsEvent = (props: eventSenderProps) => {
  const cookieAcceptance = localStorage.getItem('acceptedCookies');
  if (cookieAcceptance) {
    ReactGA.event(props);
  }
}

// Send filters analytics event if filters have been updated
export const sendFiltersAnalyticsEvent = (newFilters: Filters) => {
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
      else if(filterOptions === true){
        labelString += `${key.toString()};`
      }
    });
    sendAnalyticsEvent({
      /** Typically the object that was interacted with (e.g. 'Video') */
      category: 'Filter',
      /** The type of interaction (e.g. 'play') */
      action: 'selection',
      /** Useful for categorizing events (e.g. 'Fall Campaign') */
      label: labelString
      /** A numeric value associated with the event (e.g. 42) */
    })
  }
}

interface Props {
  children: JSX.Element;
  trackingId: string;
}
const GAListener = ({ children, trackingId }: Props): JSX.Element => {
  const isDev = process.env.NODE_ENV === "development";
  const history = useHistory()
  useEffect((): UnregisterCallback | void => {
    ReactGA.initialize(trackingId,
      {
        titleCase: false,
        debug: isDev,
        gaOptions: {
          cookieDomain: isDev ? 'none' : 'auto'
        }
      })
    sendPageView(history.location, 'REPLACE')
    return history.listen(sendPageView)
  }, [history, isDev, trackingId])

  return children
}

export default GAListener