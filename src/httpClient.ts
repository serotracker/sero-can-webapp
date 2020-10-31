import { AggregatedRecord, AggregationFactor, AirtableRecord, Filters, FilterType } from "./types";
import { formatISO, add } from 'date-fns'

export default class httpClient {
    formatDates(dates: Array<Date> | null) {
        let endDate = formatISO(new Date());
        let startDate = formatISO(add(new Date(endDate), { years: -2 }));
        if (dates) {
            endDate = dates[1] ? formatISO(dates[1] as Date) : endDate;
            startDate = dates[0] ? formatISO(dates[0] as Date) : startDate;
        }
        return [startDate, endDate]
    }

    async httpGet(url: string) {
        let url_full = url;
        if (process.env.REACT_APP_ROUTE) {
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

    async getAllRecords() {
        const response = await this.httpGet('/data_provider/records')
        if (!response) {
            return [];
        }
        const records = response.map((item: Record<string, any>) => {
            // Convert response to AirtableRecord type
            const record: AirtableRecord = {
                include_in_n: true,
                source_name: item.source_name,
                lead_org: item.lead_org,
                first_author: item.first_author,
                source_type: item.source_type,
                study_status: item.study_status,
                study_type: item.study_type,
                test_type: item.study_type,
                specimen_type: Array.isArray(item.specimen_type) ? item.specimen_type : [item.specimen_type],
                isotypes_reported: item.isotypes_reported,
                sex: item.sex,
                approving_regulator: item.approving_regulator,
                country: item.country,
                state: item.state,
                city: item.city,
                population_group: item.population_group,
                age: item.age,
                denominator: item.denominator_value,
                seroprevalence: item.serum_pos_prevalence,
                sample_size: null,
                sampling_start_date: null,
                sampling_end_date: item.sampling_end_date,
                overall_risk_of_bias: item.overall_risk_of_bias,
                estimate_grade: item.estimate_grade
            };

            return record;
        });
        return records
    }

    async getAllFilterOptions() {
       // Fill this with Austin's new endpoint
    }
    
    async getAirtableRecords(filters: Filters,
        sorting_key = "denominator_value",
        reverse = false) {
        const reqBodyFilters: Record<string, string[]> = {}

        Object.keys(filters).forEach((o: string) => {
            const filter = Array.from(filters[o as FilterType]);
            if (o !== 'publish_date') {
                reqBodyFilters[o] = filter as string[]
            }
        });

        const date = filters['publish_date'] as Array<Date>
        const [startDate, endDate] = this.formatDates(date)
        const reqBody = {
            filters: reqBodyFilters,
            start_date: startDate,
            end_date: endDate,
            sorting_key: sorting_key,
            reverse: reverse,
            per_page: null,
            page_index: null,
            columns: [],
        }
        const response = await this.httpPost('/data_provider/records', reqBody)
        if (!response) {
            return [];
        }
        const filtered_records = response.map((item: Record<string, any>) => {
            // Convert response to AirtableRecord type
            const record: AirtableRecord = {
                include_in_n: true,
                source_name: item.source_name,
                lead_org: item.lead_org,
                first_author: item.first_author,
                source_type: item.source_type,
                study_status: item.study_status,
                study_type: item.study_type,
                test_type: item.study_type,
                specimen_type: Array.isArray(item.specimen_type) ? item.specimen_type : [item.specimen_type],
                isotypes_reported: item.isotypes_reported,
                sex: item.sex,
                approving_regulator: item.approving_regulator,
                country: item.country,
                state: item.state,
                city: item.city,
                population_group: item.population_group,
                age: item.age,
                denominator: item.denominator_value,
                seroprevalence: item.serum_pos_prevalence,
                sample_size: null,
                sampling_start_date: null,
                sampling_end_date: item.sampling_end_date,
                overall_risk_of_bias: item.overall_risk_of_bias,
                estimate_grade: item.estimate_grade
            };

            return record;
        });
        // Remove timestamp from updated at string

        return filtered_records;
    }

    async getEstimateGrades(filters: Filters) {
        const reqBodyFilters: Record<string, string[]> = {}
        Object.keys(filters).forEach((o: string) => {
            const filter = Array.from(filters[o as FilterType]);
            reqBodyFilters[o] = filter as string[]
        })
        delete reqBodyFilters['publish_date']
        const date = filters['publish_date']
        const endDate = date[1] ? formatISO(date[1] as Date) : formatISO(new Date());
        const startDate = date[0] ? formatISO(date[0] as Date) : formatISO(add(new Date(endDate), { years: -2 }));
        const reqBody = {
            start_date: startDate,
            end_date: endDate,
            filters: reqBodyFilters
        }

        const response = await this.httpPost('/data_provider/country_seroprev_summary', reqBody);
        if (!response) {
            return [];
        }
        const formattedResponse = response.map((record: Record<string, any>) => {
            // Convert response to AlternateAggregatedRecord type         
            const estimateSummary = record.seroprevalence_estimate_summary;
            return {
                numberOfStudies: record.n_estimates,
                testsAdministered: record.n_tests_administered,
                geographicalName: record.country,
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

        return formattedResponse;
    }

    async postMetaAnalysis(filters: Filters,
        aggregation_variable: AggregationFactor,
        meta_analysis_technique: string = 'fixed',
        meta_analysis_transformation: string = 'double_arcsin_precise') {
        // Note: while the rest of the aggregation variables can stay consistent with frontend nomenclature
        const reqBodyFilters: Record<string, string[]> = {}

        const date = filters['publish_date'];
        Object.keys(filters).forEach((o: string) => {
            const filter = Array.from(filters[o as FilterType]);
            reqBodyFilters[o] = filter as string[]
        });
        delete reqBodyFilters['publish_date'];
        const [startDate, endDate] = this.formatDates(date)
        const reqBody = {
            start_date: startDate,
            end_date: endDate,
            filters: reqBodyFilters,
            aggregation_variable,
            meta_analysis_technique,
            meta_analysis_transformation
        };

        const response = await this.httpPost('/meta_analysis/records', reqBody);
        if (response) {
            // Convert response to aggregatedRecord object
            const formatted_response: AggregatedRecord[] = Object.keys(response).filter((key: string) => response[key] !== null).map((key: string) => {
                return {
                    error: response[key].error_percent,
                    n: response[key].total_N,
                    name: key,
                    numStudies: response[key].n_studies,
                    seroprevalence: response[key].seroprevalence_percent,
                }
            });
            return formatted_response;
        }
        return [];
    }
}