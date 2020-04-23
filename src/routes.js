import DashView from './components/Dash.vue'
import LoginView from './components/Login.vue'
import NotFoundView from './components/404.vue'

// Import Views - Dash
import DashboardView from './components/views/Dashboard.vue'
import TablesView from './components/views/Tables.vue'
import TasksView from './components/views/Tasks.vue'
import SettingView from './components/views/Setting.vue'
import AccessView from './components/views/Access.vue'
import ServerView from './components/views/Server.vue'
import ReposView from './components/views/Repos.vue'
import ExcelView from './components/views/Excel.vue'
import ChartView from './components/views/Chart.vue'
import KategoriUnitView from './components/views/KategoriUnit.vue'
import DataDasarView from './components/views/DataDasar.vue'
import UnitView from './components/views/Unit.vue'
import CapaianUnitView from './components/views/CapaianUnit.vue'
import JenisSatkerView from './components/views/JenisSatker.vue'
import PeriodeView from './components/views/Periode.vue'
import MasterIndikatorView from './components/views/MasterIndikator.vue'
import IndikatorPeriodeView from './components/views/IndikatorPeriode.vue'
import SatuanKerjaView from './components/views/SatuanKerja.vue'
import IndikatorSatuanKerjaView from './components/views/IndikatorSatuanKerja.vue'
import IndikatorSatuanKerjaLogView from './components/views/IndikatorSatuanKerjaLog.vue'
import AspekView from './components/views/Aspek.vue'

// Routes
const routes = [
  {
    path: '/login',
    component: LoginView
  },
  {
    path: '/',
    component: DashView,
    children: [
      {
        path: 'dashboard',
        alias: '',
        component: DashboardView,
        name: 'Dashboard',
        meta: {description: 'Overview of environment'}
      }, {
        path: 'tables',
        component: TablesView,
        name: 'Tables',
        meta: {description: 'Simple and advance table in CoPilot'}
      }, {
        path: 'tasks',
        component: TasksView,
        name: 'Tasks',
        meta: {description: 'Tasks page in the form of a timeline'}
      }, {
        path: 'setting',
        component: SettingView,
        name: 'Settings',
        meta: {description: 'User settings page'}
      }, {
        path: 'access',
        component: AccessView,
        name: 'Access',
        meta: {description: 'Example of using maps'}
      }, {
        path: 'server',
        component: ServerView,
        name: 'Servers',
        meta: {description: 'List of our servers', requiresAuth: true}
      }, {
        path: 'repos',
        component: ReposView,
        name: 'Repository',
        meta: {description: 'List of popular javascript repos'}
      }, {
        path: 'jexcel',
        component: ExcelView,
        name: 'Jexcel',
        meta: {description: 'Jexcel'}
      }, {
        path: 'chart',
        component: ChartView,
        name: 'Chart',
        meta: {description: 'Chart.js'}
      }, {
        path: 'kategori-unit',
        component: KategoriUnitView,
        name: 'Kategori Unit',
        meta: {description: 'Kategori Unit'}
      }, {
        path: 'data-dasar',
        component: DataDasarView,
        name: 'Data Dasar',
        meta: {description: 'Data Dasar'}
      }, {
        path: 'unit',
        component: UnitView,
        name: 'Unit',
        meta: {description: 'Unit'}
      }, {
        path: 'capaian-unit',
        component: CapaianUnitView,
        name: 'Capaian Unit',
        meta: {description: 'Capaian Unit'}
      }, {
        path: 'jenis-satuan-kerja',
        component: JenisSatkerView,
        name: 'Jenis Satuan Kerja',
        meta: {description: 'Jenis Satuan Kerja'}
      }, {
        path: 'periode',
        component: PeriodeView,
        name: 'Periode',
        meta: {description: 'Periode'}
      }, {
        path: 'master-indikator',
        component: MasterIndikatorView,
        name: 'Master Indikator',
        meta: {description: 'Master Indikator'}
      }, {
        path: 'indikator-periode',
        component: IndikatorPeriodeView,
        name: 'Indikator Periode',
        meta: {description: 'Indikator Periode'}
      }, {
        path: 'satuan-kerja',
        component: SatuanKerjaView,
        name: 'Satuan Kerja',
        meta: {description: 'Satuan Kerja'}
      }, {
        path: 'indikator-satuan-kerja',
        component: IndikatorSatuanKerjaView,
        name: 'Indikator Satuan Kerja',
        meta: {description: 'Indikator Satuan Kerja'}
      }, {
        path: 'indikator-satuan-kerja-log',
        component: IndikatorSatuanKerjaLogView,
        name: 'Indikator Satuan Kerja Log',
        meta: {description: 'Indikator Satuan Kerja Log'}
      }, {
        path: 'aspek',
        component: AspekView,
        name: 'Aspek',
        meta: {description: 'Aspek'}
      }
    ]
  }, {
    // not found handler
    path: '*',
    component: NotFoundView
  }
]

export default routes
