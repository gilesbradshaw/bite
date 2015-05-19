import crud from "./crud-creator";
import {chartAlbum as Store} from "../stores/store";
import {chartAlbum as Actions} from "../actions/actions";
import crudFactory from './crud-factory';
import {crudMaker} from './albums';


const exp = crudMaker(crudFactory(crud, "albumId", "ChartAlbum", "ChartAlbums", Actions, Store, "albumId", "id"), "Chart albums").make();


export default  exp;


