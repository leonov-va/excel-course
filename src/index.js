import './scss/index.sass';
import {Excel} from '@/components/excel/Excel';
import {Header} from '@/components/header/Header';
import {Toolbar} from '@/components/toolbar/Toolbar';
import {Formula} from '@/components/formula/Formula';
import {Table} from '@/components/table/Table';
import { createStore } from '@core/createStore';
import { storage } from '@core/utils';
import { rootReducer } from './redux/rootReducer';
import { initialState } from './redux/initialState';

const store = createStore(rootReducer, initialState);

store.subscribe(state => {
  // console.log('App State: ', state);
  storage('excel-state', state);
})

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store
});
// console.log('excel: ', excel);
excel.render();
// alert(29, '-', 40);
// alert(41, '-', 63);
// alert(64, '-', 82);
// alert(83, '-', 98);