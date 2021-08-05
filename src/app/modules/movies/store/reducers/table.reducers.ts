import {createReducer, on} from '@ngrx/store';
import {clearData, clearSettings, setData, setSettings} from '../actions';
import {DataState, State, UiState} from './index';
import {Movie} from '../../../../models/movie.model';

export interface Settings {
  limit: number;
  page: number;
  filter: string;
  columns: [];
}

export interface TableSettings {
  [table: string]: Settings;
}

export interface MoviesTableData {
  [table: string]: Movie[];
}

export interface TableSettingsState {
  tableSettings: TableSettings;
}

export interface TableDataState {
  tableData: MoviesTableData;
}

const initialUiState: UiState = {
  tableSettings: {},
};

const initialDataState: DataState = {
  tableData: {},
};

export const initialState: State = {
  ui: initialUiState,
  data: initialDataState,
};


export const uiReducer = createReducer(
  initialState.ui,
  on(setSettings, (state, newState) => ({
    ...state,
    tableSettings: {...state.tableSettings, ...newState.tableSettings}
  })),
  on(clearSettings, state => ({
    ...state,
    tableSettings: {}
  }))
);

export const dataReducer = createReducer(
  initialState.data,
  on(setData, (state, newState) => ({
    ...state,
    tableData: {...state.tableData, ...newState.tableData}
  })),
  on(clearData, state => ({
    ...state,
    tableData: {}
  }))
);
