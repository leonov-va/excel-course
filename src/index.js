import './scss/index.sass';
import {Excel} from '@/components/excel/Excel';
import {Header} from '@/components/header/Header';
import {Toolbar} from '@/components/toolbar/Toolbar';
import {Formula} from '@/components/formula/Formula';
import {Table} from '@/components/table/Table';

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
});
// console.log('excel: ', excel);
excel.render();
// alert(29, '-', 40);
// alert(41, '-', 63);
// alert(64, '-', 82);
// alert(83, '-', 98);