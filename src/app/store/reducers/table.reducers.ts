import { createReducer, on } from '@ngrx/store';
import { clearSettings, setSettings } from '../actions';

interface Settings {
  limit: number;
  page: number;
  filter: string;
  columns: [];
}

export interface TableSettings {
  [table: string]: Settings;
}

export interface TableState {
  tableSettings: TableSettings;
}

export const initialState: TableState = {
  tableSettings: {},
};

export const tableReducer = createReducer(
  initialState,
  on(setSettings, (state, newState) => ({
    ...state,
    tableSettings: { ...state.tableSettings, ...newState.tableSettings }
  })),
  on(clearSettings, state => ({
    ...state,
    tableSettings: {}
  }))
);
