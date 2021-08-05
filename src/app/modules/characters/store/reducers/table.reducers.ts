import {createReducer, on} from '@ngrx/store';
import {clearData, clearSettings, setData, setSettings} from '../actions';
import {DataState, State, UiState} from './index';
import {Character} from '../../../../models/character.model';

export interface Settings {
  limit: number;
  page: number;
  filter: string;
  columns: [];
}

export interface TableSettings {
  [table: string]: Settings;
}

export interface CharactersTableData {
  [table: string]: Character[];
}

export interface TableSettingsState {
  tableSettings: TableSettings;
}

export interface TableDataState {
  tableData: CharactersTableData;
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
