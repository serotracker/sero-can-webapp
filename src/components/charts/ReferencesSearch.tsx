import _ from 'lodash'
import React from 'react'
import { Search, Label } from 'semantic-ui-react'
//import { AirtableRecord } from '../../types';
                                                        

const initialState = {
  loading: false,
  results: [],
  value: '',
}

function searchReducer(state : any, action : any) {
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

const resultRenderer = ({ source_name } : any) => <Label content={source_name} />

function ReferenceSearch(props : any) {
  const { source } = props;
  const [state, dispatch] = React.useReducer(searchReducer, initialState)
  const { loading, results, value } = state

  const timeoutRef : any = React.useRef()

  const handleSearchChange = React.useCallback((e, data) => {
    clearTimeout(timeoutRef.current)
    dispatch({ type: 'START_SEARCH', query: data.value })

    timeoutRef.current = setTimeout(() => {
      if (data.value.length === 0) {
        dispatch({ type: 'CLEAN_QUERY' })
        return
      }

      const re = new RegExp(_.escapeRegExp(data.value), 'i')
      const isMatch = (result : any) => re.test(result.source_name)

      dispatch({ type: 'FINISH_SEARCH', results: _.filter(source, isMatch) })
    }, 800)
  }, [source])

  React.useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <Search
        loading={loading}
        onResultSelect={(e, data) =>
        dispatch({ type: 'UPDATE_SELECTION', selection: data.result.source_name })
        }
        onSearchChange={handleSearchChange}
        resultRenderer={resultRenderer}
        results={results}
        value={value}
    />
  )
}

export default ReferenceSearch