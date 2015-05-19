import crud from "./crud-creator";
import {newReleaseSingle as Store} from "../stores/store";
import {newReleaseSingle as Actions} from "../actions/actions";
import crudFactory from './crud-factory';
import {crudMaker} from './singles';

var exp = crudMaker(crudFactory(crud, "singleId", "NewReleaseSingle", "NewReleaseSingles", Actions, Store, "singleId", "id"), "New Release Singles").make();

export default  exp;


