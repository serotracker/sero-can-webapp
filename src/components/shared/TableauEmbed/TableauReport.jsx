import React from 'react';
import PropTypes from 'prop-types';
import url from 'url';
import { Promise } from 'es6-promise';
import shallowequal from 'shallowequal';
import Tableau from 'tableau-api';

function tokenizeUrl(_url, token) {
    const parsed = url.parse(_url, true);
    const { protocol, host, pathname } = parsed;

    return `${protocol}//${host}/trusted/${token}${pathname}`;
}

const propTypes = {
  filters: PropTypes.object,
  url: PropTypes.string,
  parameters: PropTypes.object,
  options: PropTypes.object,
  token: PropTypes.string,
  refreshSeconds: PropTypes.number,
  onLoad: PropTypes.func
};

const defaultProps = {
  loading: false,
  parameters: {},
  filters: {},
  options: {},
  refreshSeconds: 0,
  onLoad: function(date){}
};

class TableauReport extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filters: props.filters,
      parameters: props.parameters
    };
  }

  componentDidMount() {
    this.initTableau();
  }

  componentWillUnmount() {
    // stop refreshing Tableau
    if (this.refreshTimer)
    {
      clearInterval(this.refreshTimer);
      this.refreshTimer = null;
    }
  }

  componentWillReceiveProps(nextProps) {
    const isReportChanged = nextProps.url !== this.props.url;
    const isFiltersChanged = !shallowequal(this.props.filters, nextProps.filters, this.compareArrays);
    const isParametersChanged = !shallowequal(this.props.parameters, nextProps.parameters);
    const isLoading = this.state.loading;

    // Only report is changed - re-initialize
    if (isReportChanged) {
      this.initTableau();
    }

    // Only filters are changed, apply via the API
    if (!isReportChanged && isFiltersChanged && !isLoading) {
      this.applyFilters(nextProps.filters);
    }

    // Only parameters are changed, apply via the API
    if (!isReportChanged && isParametersChanged && !isLoading) {
      this.applyParameters(nextProps.parameters);
    }

    // token change, validate it.
    if (nextProps.token !== this.props.token) {
      this.setState({ didInvalidateToken: false });
    }

    // refresh rate change
    if (nextProps.refreshSeconds !== this.props.refreshSeconds)
    {
      // clear current refresh interval timer if it is set
      if (typeof(this.refreshTimer) !== "undefined")
      {
        clearInterval(this.refreshTimer);
      }

      // if the new refresh rate is > 0, set up the timer
      if (nextProps.refreshSeconds > 0)
      {
        this.refreshTimer = setInterval(this.refresh.bind(this), nextProps.refreshSeconds * 1000);
      }
    }
  }

  /**
   * Compares the values of filters to see if they are the same.
   * @param  {Array<Number>} a
   * @param  {Array<Number>} b
   * @return {Boolean}
   */
  compareArrays(a, b) {
    if (Array.isArray(a) && Array.isArray(b)) {
      return a.sort().toString() === b.sort().toString();
    }

    return undefined;
  }

  /**
   * Execute a callback when an array of promises complete, regardless of
   * whether any throw an error.
   */
  onComplete(promises, cb) {
    Promise.all(promises).then(() => cb(), () => cb())
  }

  /**
   * Returns a vizUrl, tokenizing it if a token is passed and immediately
   * invalidating it to prevent it from being used more than once.
   */
  getUrl() {
    const { token } = this.props;
    const parsed = url.parse(this.props.url, true);
    const query = '?:embed=yes&:comments=no&:toolbar=yes&:refresh=yes';

    if (!this.state.didInvalidateToken && token) {
      this.invalidateToken();
      return tokenizeUrl(this.props.url, token) + query;
    }

    return parsed.protocol + '//' + parsed.host + parsed.pathname + query;
  }

  invalidateToken() {
    this.setState({ didInvalidateToken: true });
  }

  /**
   * Asynchronously applies filters to the worksheet, excluding those that have
   * already been applied, which is determined by checking against state.
   * @param  {Object} filters
   * @return {void}
   */
  applyFilters(filters) {
    const REPLACE = Tableau.FilterUpdateType.REPLACE;
    const promises = [];

    this.setState({ loading: true });

    for (const key in filters) {
      if (
        !this.state.filters.hasOwnProperty(key) ||
        !this.compareArrays(this.state.filters[key], filters[key])
      ) {
        promises.push(
          this.sheet.applyFilterAsync(key, filters[key], REPLACE)
        );
      }
    }

    this.onComplete(promises, () => this.setState({ loading: false, filters }));
  }

  applyParameters(parameters) {
    const promises = [];

    for (const key in parameters) {
      if (
        !this.state.parameters.hasOwnProperty(key) ||
        this.state.parameters[key] !== parameters[key]
      ) {
        const val = parameters[key];
        promises.push(this.workbook.changeParameterValueAsync(key, val));
      }
    }

    this.onComplete(promises, () => this.setState({ loading: false, parameters }));
  }

  // refreshes the tableau visualization's data
  refresh() {
    if (typeof(this.viz) !== "undefined")
    {
      this.viz.refreshDataAsync();
    }
  }

  /**
   * Initialize the viz via the Tableau JS API.
   * @return {void}
   */
  initTableau() {
    const { filters, parameters, refreshSeconds } = this.props;
    const vizUrl = this.getUrl();

    const options = {
      ...filters,
      ...parameters,
      ...this.props.options,
      onFirstInteractive: () => {
        this.workbook = this.viz.getWorkbook();
        this.sheets = this.workbook.getActiveSheet().getWorksheets();
        this.sheet = this.sheets[0];

        this.props.onLoad(new Date());
      }
    };

    // cleanup
    if (this.viz) {
      this.viz.dispose();
      this.viz = null;
    }

    this.viz = new Tableau.Viz(this.container, vizUrl, options);

    // set up automatic refreshing if specified
    if (refreshSeconds > 0)
    {
      this.refreshTimer = setInterval(this.refresh.bind(this), refreshSeconds * 1000);
    }
  }

  render() {
    return <div ref={c => this.container = c} />;
  }
}

TableauReport.propTypes = propTypes;
TableauReport.defaultProps = defaultProps;

export default TableauReport;