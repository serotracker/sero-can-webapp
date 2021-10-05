export type AirtableRecord = {
  source_id: string | null;
  source_name: string | null;
  lead_organization?: string | null;
  first_author: string | null;
  source_type: string | null;
  test_type: string | null;
  specimen_type: string[] | null;
  isotypes_reported: string[] | null;
  test_manufacturer: string[] | null;
  sensitivity: number | null;
  specificity: number | null;
  country: string | null;
  state: string[] | null;
  city: string[] | null;
  population_group: string | null;
  sex: string | null;
  age: string | null;
  denominator_value: number | null;
  serum_pos_prevalence: number | null;
  publish_date: string[] | string | null;
  publisher: string | null;
  overall_risk_of_bias: string | null;
  pin_latitude: number;
  pin_longitude: number;
  pin_region_type: string | null;
  study_type: string | null;
  sampling_method: string | null;
  sampling_start_date: string | null;
  sampling_end_date: string | null;
  summary: string | null;
  url: string | null;
  estimate_grade: string | null;
  vaccination_policy: number | null;
};

export type AggregatedRecord = {
  error: number[];
  n: number;
  name: string;
  numStudies: number;
  seroprevalence: number;
};

export type FiltersConfig = {
  source_type: string[];
  test_type: string[];
  country: string[];
  population_group: string[];
  sex: string[];
  age: string[];
  overall_risk_of_bias: string[];
  isotypes_reported: string[];
  specimen_type: string[];
  publish_date: Date[];
  estimate_grade: string[];
  unity_aligned_only: boolean;
};

export type StudiesFilters = {
  country: any;
};

export type FilterType =
  | "country"
  | "population_group"
  | "sex"
  | "age"
  | "test_type"
  | "source_type"
  | "overall_risk_of_bias"
  | "isotypes_reported"
  | "specimen_type"
  | "estimate_grade"
  | "unity_aligned_only";

export enum LanguageType {
  french = "fr",
  english = "en",
}

export enum PageStateEnum {
  // TODO: replace analyze with data here
  // once our data page uses filters
  explore = "explore",
}

export type State = {
  chartAggregationFactor: AggregationFactor;
  explore: PageState;
  allFilterOptions: FiltersConfig;
  updatedAt: string;
  calendarStartDates: StartDates;
  language: LanguageType;
  showCookieBanner: boolean;
  countries: any;
  pulsateUnityFilter: boolean;
};

export type StartDates = {
  minDate: Date;
  maxDate: Date;
};

export type NavHashes = { 
  Explore: string[];
  Analyze: string[];
  Data: string[];
  Publications: string[];
  About: string[]; 
}

export type LegendLayersEnum = {
  National: "National",
  Regional: "Regional",
  Local: "Local",
}

export type LegendLayers = {
  National: boolean;
  Regional: boolean;
  Local: boolean;
}

export type PageState = {
  filters: FiltersConfig;
  records: AirtableRecord[];
  isLoading: boolean;
  estimateGradePrevalences: EstimateGradePrevalence[];
  legendLayers: LegendLayers;
};

export type CountriesMapConfig = {
  estimateGradePrevalences?: EstimateGradePrevalence[];
  countryFocus?: string;
}

export type StudyPinsMapConfig = {
  records: AirtableRecord[];
}

export type EstimateGradePrevalence = {
  testsAdministered: number;
  geographicalName: string;
  alpha3Code: string;
  numberOfStudies: number;
  localEstimate?: RegionalPrevalenceEstimate;
  nationalEstimate?: RegionalPrevalenceEstimate;
  regionalEstimate?: RegionalPrevalenceEstimate;
  sublocalEstimate?: RegionalPrevalenceEstimate;
};

export type RegionalPrevalenceEstimate = {
  maxEstimate: number;
  minEstimate: number;
  numEstimates: number;
};

export type Partnerships = { 
  [key: string]: Partnership 
};

export type Partnership = {
  iso3: string;
  routeName: string,
  tableauKey: string;
  tableauUrl: { [language: string]: string }
  mapboxMapOptions: any
};

export type PartnershipMapOptions = {
/**
 * Bounds represent the initial extent of the map by 2 coordinates
 * The first coordinate is the Southwest extent
 * The second coordinate is the Northeast extent
 */
  bounds?: [[number, number],[number, number]],
  /**
 * maxBounds represents the hard limit to map extent, users cannot move past these
 */
  maxBounds?: [[number, number],[number, number]],
};

export enum AggregationFactor {
  country = "country",
  population_group = "population_group",
  sex = "sex",
  age = "age",
  test_type = "test_type",
  source_type = "source_type",
  overall_risk_of_bias = "overall_risk_of_bias",
  isotypes_reported = "isotypes_reported",
}
