import {createAction, props} from '@ngrx/store';
import {MoviesTableData, TableSettings} from '../reducers/table.reducers';

export enum TableActionTypes {
  SetSettings = '[Table] Set Settings',
  ClearSettings = '[Table] Clear Settings',
  SetData = '[Table] Set Data',
  ClearData = '[Table] Clear Data',
}

export const setSettings = createAction(TableActionTypes.SetSettings, props<{ tableSettings: TableSettings }>());
export const setData = createAction(TableActionTypes.SetData, props<{ tableData: MoviesTableData }>());
export const clearSettings = createAction(TableActionTypes.ClearSettings);
export const clearData = createAction(TableActionTypes.ClearData);
