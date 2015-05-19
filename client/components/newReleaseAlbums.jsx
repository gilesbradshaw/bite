import crud from "./crud-creator";
import {newReleaseAlbum as Store} from "../stores/store";
import {newReleaseAlbum as Actions} from "../actions/actions";
import crudFactory from './crud-factory';
import {crudMaker} from './albums';

var exp = crudMaker(crudFactory(crud, "albumId", "NewReleaseAlbum", "NewReleaseAlbums", Actions, Store, "albumId", "id"), "New Release Albums").make();

export default  exp;


