import { testRecords, getEmptyFilters } from './testData'
import { filterRecords } from '../context'

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
  filters.populations.add('Children')
  let filteredRecords = filterRecords(filters, testRecords)
  expect(filteredRecords.length).toBe(4)
  filters.populations.add('Seniors')
  filteredRecords = filterRecords(filters, testRecords)
  expect(filteredRecords.length).toBe(4)
  filters.populations.add('Adults')
  filteredRecords = filterRecords(filters, testRecords)
  expect(filteredRecords.length).toBe(6)
});

test('test multiple filters', () => {
  const filters = getEmptyFilters()
  filters.populations.add('Children')
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
