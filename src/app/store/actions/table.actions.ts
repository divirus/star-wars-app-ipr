import {createAction, props} from '@ngrx/store';
import {TableSettings} from '../reducers/table.reducers';

export enum TableActionTypes {
  SetSettings = '[Table] Set Settings',
  ClearSettings = '[Table] Clear Settings',
}

export const setSettings = createAction(TableActionTypes.SetSettings, props<{ tableSettings: TableSettings }>());
export const clearSettings = createAction(TableActionTypes.ClearSettings);
