import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import {tableReducer, TableState} from './table.reducers';

export interface State {
  table: TableState;
}

export const reducers: ActionReducerMap<State> = {
  table: tableReducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
