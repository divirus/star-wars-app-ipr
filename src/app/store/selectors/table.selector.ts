import {createFeatureSelector, createSelector} from '@ngrx/store';
import {TableState} from '../reducers/table.reducers';

export const featureSelector = createFeatureSelector<TableState>('table');
export const tableSettingsSelector = createSelector(
  featureSelector,
  state => state.tableSettings
);
