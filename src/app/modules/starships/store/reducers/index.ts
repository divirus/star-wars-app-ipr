import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../../../environments/environment';
import {dataReducer, TableDataState, TableSettingsState, uiReducer} from './table.reducers';

export interface UiState {
  tableSettings: TableSettingsState | {};
}

export interface DataState {
  tableData: TableDataState | {};
}

export interface State {
  ui: UiState;
  data: DataState;
}

export const reducers: ActionReducerMap<State> = {
  ui: uiReducer,
  data: dataReducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
