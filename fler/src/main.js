import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';

import './styles/quasar.styl'
import 'quasar-framework/dist/quasar.ie.polyfills'
import 'quasar-extras/animate'
import 'quasar-extras/roboto-font'
import 'quasar-extras/material-icons'
import Loading from 'quasar-framework/src/plugins/loading.js'
import {
  Quasar,
  QBtn,
  QLayout,
  QLayoutHeader,
  QLayoutDrawer,
  QPage,
  QPageContainer,
  QToolbar,
  QToolbarTitle,
  QList,
  QListHeader,
  QItemSeparator,
  QItem,
  QItemSide,
  QItemMain,
  QInput,
  QCard,
  QCardTitle,
  QCardMain,
  QCardMedia,
  QCardSeparator,
  QCardActions,
  QSearch
} from 'quasar'
import { OrbitSpinner,FingerprintSpinner,HalfCircleSpinner,SpringSpinner,SelfBuildingSquareSpinner,ScalingSquaresSpinner, BreedingRhombusSpinner, IntersectingCirclesSpinner, SemipolarSpinner,SwappingSquaresSpinner,PixelSpinner,AtomSpinner    } from 'epic-spinners'
Vue.use(Quasar, {
  config: {},
  components: {
    QBtn,
    QLayout,
    QLayoutHeader,
    QLayoutDrawer,
    QPage,
    QPageContainer,
    QToolbar,
    QToolbarTitle,
    QList,
    QListHeader,
    QItemSeparator,
    QItem,
    QItemSide,
    QItemMain,
    QInput,
    QCard,
    QCardTitle,
    QCardMain,
    QCardMedia,
    QCardSeparator,
    QCardActions,
    QSearch
  },
  directives: {
  },
  
    plugins: [Loading]
  
})
const getRandomInt =(min, max)=> {
  return Math.floor(Math.random() * (max - min)) + min;
}
const spinners =[OrbitSpinner,FingerprintSpinner,HalfCircleSpinner,SpringSpinner,SelfBuildingSquareSpinner,ScalingSquaresSpinner, BreedingRhombusSpinner, IntersectingCirclesSpinner,SemipolarSpinner,SwappingSquaresSpinner,PixelSpinner,AtomSpinner  ];
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

//
axios.interceptors.request.use((config) => {
console.log('show')
Loading.show({
  spinner:spinners[getRandomInt(0,spinners.length)],
  spinnerColor: '#ffffff',//'#027be3',
  delay: 0 // ms
})

  const authToken = store.getters['auth/authToken'];
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
}, (err) => {
  return Promise.reject(err);
});
axios.interceptors.response.use(function (response) {
  console.log('hide')
  Loading.hide()
  return response;
}, function (error) {
  // Do something with response error
  Loading.hide()
  return Promise.reject(error);
});