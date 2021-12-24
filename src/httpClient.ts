import { AirtableRecord, FiltersConfig, StudiesFilters } from "./types";
import { formatDates } from "./utils/utils";
import {parseISO, format } from "date-fns";

const RECORDS_URL = "/data_provider/records";
const RECORD_DETAILS_URL = "/data_provider/record_details";
const FILTER_OPTIONS_URL = "/data_provider/filter_options";

// Making this a global constant so that we can easily change this
// in case our estimate selection strategy changes in the future
const ESTIMATES_SUBGROUP = "primary_estimates";


export default class httpClient {

    async httpGet(url: string, useAppRoute: boolean) {
        let url_full = url;
        if (useAppRoute && process.env.REACT_APP_ROUTE) {
            url_full = process.env.REACT_APP_ROUTE + url_full;
        }
        const res = await fetch(url_full);
        if (res.status !== 200) {
            const error_msg = res.json();
            console.error(error_msg);
            return;
        }
        else {
            const response_json = await res.json();
            return response_json;
        }
    }

    async httpPost(url: string, data: Record<string, any>) {
        let url_full = url;
        if (process.env.REACT_APP_ROUTE) {
            url_full = process.env.REACT_APP_ROUTE + url_full;
        }
        const res = await fetch(url_full, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        if (res.status !== 200) {
            const error_msg = res.json();
            console.error(error_msg);
            return;
        }
        else {
            const response_json = await res.json();
            return response_json;
        }
    }

    async getStyles(url: string) {

        const res = await fetch(url);
        if (res.status !== 200) {
            const error_msg = res.json();
            console.error(error_msg);
            return;
        }
        else {
            const response_json = await res.json();
            return response_json;
        }
    }

    async getRecordDetails(source_id : string) {
        const response = await this.httpGet(`${RECORD_DETAILS_URL}/${source_id}`, true);
        if (!response) {
            return null;
        }
        const record: AirtableRecord = response as AirtableRecord;
        return record;
    }

    async getAllFilterOptions() {
        const response = await this.httpGet(FILTER_OPTIONS_URL, true);

        const options: Record<string, any> = response;
        // We know that only these 3 isotypes will ever be reported, thus we can hardcode
        options.isotypes_reported = ["IgG", "IgA", "IgM"];
        const updatedAt = format(parseISO(response.updated_at), "yyyy/MM/dd");

        const maxDate = parseISO(response.max_publication_end_date);
        const minDate = parseISO(response.min_publication_end_date);
        delete options.min_date;
        delete options.max_date;

        return { options, updatedAt, maxDate, minDate };
    }


    preparePostBody(filters: FiltersConfig){
        const reqBodyFilters = {...filters} as Record<string, any>;
        const date = filters.publish_date as Array<Date>;
        const unity_aligned_only = filters.unity_aligned_only;
        const [startDate, endDate] = formatDates(date);
        delete reqBodyFilters.publish_date;
        delete reqBodyFilters.unity_aligned_only;

        const reqBody: Record<string, any> = {
            filters: reqBodyFilters,
            sampling_start_date: startDate,
            sampling_end_date: endDate,
            unity_aligned_only,
            estimates_subgroup: ESTIMATES_SUBGROUP
        }
        return reqBody;
    }

    async getExploreData(filters: FiltersConfig,
        only_explore_columns: Boolean=false) {
        const reqBody: Record<string, any> = this.preparePostBody(filters);

        if( only_explore_columns ){
            reqBody.columns = ["source_id", "estimate_grade", "pin_latitude", "pin_longitude"];
        }

        const response = await this.httpPost(RECORDS_URL, reqBody)
        if (!response || !response.records || !response.country_seroprev_summary) {
            return {
                records: [],
                estimateGradePrevalences: []
            };
        }

        const records = response.records!.map((item: Record<string, any>) => {
            // Convert response to AirtableRecord type
            const record: AirtableRecord = item as AirtableRecord;
            return record;
        });

        const estimateGradePrevalences = this.formatEstimateGradePrevalences(response);

        return { records, estimateGradePrevalences };
    }

    formatEstimateGradePrevalences(response: any) {
        const estimateGradePrevalences = response.country_seroprev_summary!.map((record: Record<string, any>) => {
            // Convert response to AlternateAggregatedRecord type         
            const estimateSummary = record.seroprevalence_estimate_summary;
            return {
                numberOfStudies: record.n_estimates,
                testsAdministered: record.n_tests_administered,
                geographicalName: record.country,          
                alpha3Code: record.country_iso3,
                localEstimate: {
                    maxEstimate: estimateSummary.Local.max_estimate,
                    minEstimate: estimateSummary.Local.min_estimate,
                    numEstimates: estimateSummary.Local.n_estimates,
                },
                nationalEstimate: {
                    maxEstimate: estimateSummary.National.max_estimate,
                    minEstimate: estimateSummary.National.min_estimate,
                    numEstimates: estimateSummary.National.n_estimates,
                },
                regionalEstimate: {
                    maxEstimate: estimateSummary.Regional.max_estimate,
                    minEstimate: estimateSummary.Regional.min_estimate,
                    numEstimates: estimateSummary.Regional.n_estimates,
                },
                sublocalEstimate: {
                    maxEstimate: estimateSummary.Sublocal.max_estimate,
                    minEstimate: estimateSummary.Sublocal.min_estimate,
                    numEstimates: estimateSummary.Sublocal.n_estimates,
                }
            }
        });
        return estimateGradePrevalences;
    }

    async getCountryPartnershipData(filters: StudiesFilters) {

        const reqBody: Record<string, any> = {
            filters: filters,
            include_subgeography_estimates: true,
            estimates_subgroup: ESTIMATES_SUBGROUP
        }

        const response = await this.httpPost(RECORDS_URL, reqBody)
        if (!response || !response.records || !response.country_seroprev_summary) {
            return {
                records: [],
                estimateGradePrevalences: []
            };
        }

        const records = response.records!.map((item: Record<string, any>) => {
            return item as AirtableRecord;
        });

        const estimateGradePrevalences = this.formatEstimateGradePrevalences(response);

        return {records, estimateGradePrevalences};
    }
}
