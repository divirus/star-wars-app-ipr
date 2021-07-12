import {createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';
import { clearSettings, setSettings } from '../actions';

interface Settings {
  limit: number;
  page: number;
  filter: string;
  columns: [];
}

export interface TableSettings {
  table: string;
  settings: Settings;
}

export interface TableState {
  tableSettings: TableSettings[];
}

export const initialState: TableState = {
  tableSettings: [],
};

export const tableReducer = createReducer(
  initialState,
  on(setSettings, (state, tableSettings) => ({
    ...state,
    tableSettings: tableSettings.tableSettings
  })),
  on(clearSettings, state => ({
    ...state,
    tableSettings: []
  }))
);
