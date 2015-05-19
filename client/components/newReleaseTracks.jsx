import crud from "./crud-creator";
import {newReleaseTrack as Store} from "../stores/store";
import {newReleaseTrack as Actions} from "../actions/actions";
import crudFactory from './crud-factory';
import {crudMaker} from './tracks';

const exp = crudMaker(crudFactory(crud, "trackId", "NewReleaseTrack", "NewReleaseTracks", Actions, Store, "trackId", "id"), "New Release Tracks").make();

export default exp;
