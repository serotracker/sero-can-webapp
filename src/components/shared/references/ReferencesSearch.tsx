import _ from 'lodash'
import React from 'react'
import { Search } from 'semantic-ui-react'
import { AirtableRecord } from '../../../types';
import Translate from "../../../utils/translate/translateService";
                                                        
const initialState = {
  loading: false,
  results: [],
  value: '',
}

interface state {
  loading: boolean,
  results: AirtableRecord[] | undefined,
  value: string
}

const MAX_SUGGESTIONS = 5

function searchReducer(state : state, action : any) {
  switch (action.type) {
    case 'CLEAN_QUERY':
      return initialState
    case 'START_SEARCH':
      return { ...state, loading: true, value: action.query }
    case 'FINISH_SEARCH':
      return { ...state, loading: false, results: action.results }
    case 'UPDATE_SELECTION':
      return { ...state, value: action.selection }

    default:
      throw new Error()
  }
}

const resultRenderer = ({ source_name, publish_date } : any) => {
  return (<React.Fragment>
            <div>{source_name}</div>
            <span className="text-muted">{Translate('Published')}: {publish_date}</span>
          </React.Fragment>)
}

function ReferenceSearch(props : any) {
  const { source, onSearchResultChange } = props;
  const [state, dispatch] = React.useReducer(searchReducer, initialState)
  const { loading, results, value } = state

  const timeoutRef : any = React.useRef()

  const handleSearchChange = React.useCallback((e, data) => {
    clearTimeout(timeoutRef.current)
    dispatch({ type: 'START_SEARCH', query: data.value })

    timeoutRef.current = setTimeout(() => {
      
      if (data.value.length === 0) {
        onSearchResultChange(undefined)
        dispatch({ type: 'CLEAN_QUERY' })
        return
      }

      const re = new RegExp(_.escapeRegExp(data.value), 'i');
      const searchResults : AirtableRecord[] = _.filter(source, (result : any) => re.test(result.source_name))

      onSearchResultChange(searchResults)
      dispatch({ type: 'FINISH_SEARCH', results: searchResults})
    }, 800)
  }, [onSearchResultChange, source])

  React.useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current)
    }
  }, [])

  // Limit suggested results to avoid massive query result rendered
  const suggestedResults = results.slice(0, ((results.length < MAX_SUGGESTIONS) ? results.length : MAX_SUGGESTIONS))

  return (
    <Search
        loading={loading}
        onResultSelect={(e, data) => dispatch({ type: 'UPDATE_SELECTION', selection: data.result.source_name })}
        onSearchChange={handleSearchChange}
        resultRenderer={resultRenderer}
        results={suggestedResults}
        value={value}
    />
  )
}

export default ReferenceSearch