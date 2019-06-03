import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash, faCheck, faCheckCircle, faPhone, faPlus, faEdit, faSave, faSpinner, faGlobeAfrica, faBars, faLocationArrow, faCircle, faInfo, faPlay, faPause, faMinus, faCaretDown, faCaretLeft, faCaretRight, faCaretUp, faTachometerAlt, faForward, faUser, faInfoCircle, faWindowMaximize, faWindowRestore, faMap, faHistory, faChartBar, faLayerGroup, faEye, faEyeSlash, faTimes, faSearch, faDrawPolygon, faArrowUp, faArrowDown, faCog, faCalendarAlt, faVectorSquare, faFileImport, faQuestionCircle, faLock, faPollH, faChartLine, faChartPie, faTable, faImage, faCopy, faUserCog, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { faSquare } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon, FontAwesomeLayers } from '@fortawesome/vue-fontawesome'

library.add(faImage, faTable, faTrash, faCheck, faCheckCircle, faPhone, faPollH, faPlus, faEdit, faSave, faSpinner, faGlobeAfrica, faBars, faLocationArrow, faCaretDown, faCaretLeft, faCaretRight, faCaretUp, faCircle, faInfo, faPlay, faPause, faMinus, faTachometerAlt, faForward, faUser, faInfoCircle, faWindowMaximize, faWindowRestore, faMap, faHistory, faChartBar, faChartLine, faChartPie, faLayerGroup, faEye, faEyeSlash, faTimes, faSearch, faDrawPolygon, faArrowUp, faArrowDown, faCog, faCalendarAlt, faVectorSquare, faFileImport, faQuestionCircle, faLock, faSquare, faCopy, faUserCog, faUserCircle)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('font-awesome-layers', FontAwesomeLayers)
