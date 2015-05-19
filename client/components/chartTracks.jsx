
import crud from "./crud-creator";
import {chartTrack as Store} from "../stores/store";
import {chartTrack as Actions} from "../actions/actions";
import crudFactory from './crud-factory';
import {crudMaker} from './tracks';

const exp = crudMaker(crudFactory(crud, "trackId", "ChartTrack", "ChartTracks", Actions, Store, "trackId", "id"), "New Release Tracks").make();

export default  exp;

