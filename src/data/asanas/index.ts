import { proneAsanas } from './prone';
import { standingAsanas } from './standing';
import { seatedAsanas } from './seated';
import { supineAsanas } from './supine';

export const asanas = [...proneAsanas, ...standingAsanas, ...seatedAsanas, ...supineAsanas];

export { proneAsanas, standingAsanas, seatedAsanas, supineAsanas };
