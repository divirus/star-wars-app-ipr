import { Action } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';

export const NAVIGATE = '[Router] Navigate';
export const NEW_WINDOW = '[Router] New Window';
export const BACK = '[Router] Back';
export const FORWARD = '[Router] Forward';

export class RouterNavigate implements Action {
  readonly type = NAVIGATE;
  constructor(
    public payload: {
      path: any[];
      query?: object;
      extras?: NavigationExtras;
    },
  ) {}
}

export class RouterNewWindow implements Action {
  readonly type = NEW_WINDOW;
  constructor(
    public payload: {
      currentRoute: string;
      additionalRoute?: string;
    },
  ) {}
}

export class RouterBack implements Action {
  readonly type = BACK;
}

export class RouterForward implements Action {
  readonly type = FORWARD;
}

export type Actions = RouterNavigate | RouterBack | RouterForward;
