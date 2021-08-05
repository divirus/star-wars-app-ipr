import {createFeatureSelector, createSelector} from '@ngrx/store';
import {TableDataState, TableSettingsState} from '../reducers/table.reducers';

export const featureSettingsSelector = createFeatureSelector<TableSettingsState>('ui');
export const tableSettingsSelector = createSelector(
  featureSettingsSelector,
  state => state?.tableSettings
);

export const featureDataSelector = createFeatureSelector<TableDataState>('data');
export const tableDataSelector = createSelector(
  featureDataSelector,
  state => state?.tableData
);
