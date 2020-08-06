import { testRecords } from './testData'
import { filterRecords, getEmptyFilters } from '../context'

test('test empty filters', () => {
  expect(testRecords.length).toBe(8)
  const filteredRecords = filterRecords(getEmptyFilters(), testRecords)
  expect(filteredRecords.length).toBe(8)
});

test('test source_type filter', () => {
  const filters = getEmptyFilters()
  filters.source_type.add('source1')
  let filteredRecords = filterRecords(filters, testRecords)
  expect(filteredRecords.length).toBe(6)
  filters.source_type.add('source2')
  filteredRecords = filterRecords(filters, testRecords)
  expect(filteredRecords.length).toBe(8)
});

test('test test_type filter', () => {
  const filters = getEmptyFilters()
  filters.test_type.add('test1')
  let filteredRecords = filterRecords(filters, testRecords)
  expect(filteredRecords.length).toBe(6)
  filters.test_type.add('test2')
  filteredRecords = filterRecords(filters, testRecords)
  expect(filteredRecords.length).toBe(8)
});

test('test study_status filter', () => {
  const filters = getEmptyFilters()
  filters.study_status.add('status1')
  let filteredRecords = filterRecords(filters, testRecords)
  expect(filteredRecords.length).toBe(6)
  filters.study_status.add('status2')
  filteredRecords = filterRecords(filters, testRecords)
  expect(filteredRecords.length).toBe(8)
});

test('test country filter', () => {
  const filters = getEmptyFilters()
  filters.country.add('Canada')
  let filteredRecords = filterRecords(filters, testRecords)
  expect(filteredRecords.length).toBe(4)
  filters.country.add('France')
  filteredRecords = filterRecords(filters, testRecords)
  expect(filteredRecords.length).toBe(8)
});

test('test population filter', () => {
  const filters = getEmptyFilters()
  filters.population_group.add('Children')
  let filteredRecords = filterRecords(filters, testRecords)
  expect(filteredRecords.length).toBe(4)
  filters.population_group.add('Seniors')
  filteredRecords = filterRecords(filters, testRecords)
  expect(filteredRecords.length).toBe(4)
  filters.population_group.add('Adults')
  filteredRecords = filterRecords(filters, testRecords)
  expect(filteredRecords.length).toBe(6)
});

test('test sex filter', () => {
  const filters = getEmptyFilters()
  filters.sex.add('Male')
  let filteredRecords = filterRecords(filters, testRecords)
  expect(filteredRecords.length).toBe(1)
});

test('test age filter', () => {
  const filters = getEmptyFilters()
  filters.age.add('Youth (15-24)')
  let filteredRecords = filterRecords(filters, testRecords)
  expect(filteredRecords.length).toBe(7)
});

test('test risk of bias filter', () => {
  const filters = getEmptyFilters()
  filters.risk_of_bias.add('Low')
  let filteredRecords = filterRecords(filters, testRecords)
  expect(filteredRecords.length).toBe(7)
});

test('test isotype filter', () => {
  const filters = getEmptyFilters()
  filters.isotypes_reported.add('IgM')
  let filteredRecords = filterRecords(filters, testRecords)
  expect(filteredRecords.length).toBe(8)
  filters.isotypes_reported.add('IgA')
  filteredRecords = filterRecords(filters, testRecords)
  expect(filteredRecords.length).toBe(1)
});

test('test specimen type filter', () => {
  const filters = getEmptyFilters()
  filters.specimen_type.add('serum')
  let filteredRecords = filterRecords(filters, testRecords)
  expect(filteredRecords.length).toBe(6)
  filters.specimen_type.add('plasma')
  filteredRecords = filterRecords(filters, testRecords)
  expect(filteredRecords.length).toBe(7)
});

test('test multiple filters', () => {
  const filters = getEmptyFilters()
  filters.population_group.add('Children')
  filters.country.add('Canada')
  let filteredRecords = filterRecords(filters, testRecords)
  expect(filteredRecords.length).toBe(2)
  filters.study_status.add('status2')
  filteredRecords = filterRecords(filters, testRecords)
  expect(filteredRecords.length).toBe(1)
  filters.source_type.add('source2')
  filteredRecords = filterRecords(filters, testRecords)
  expect(filteredRecords.length).toBe(0)
});