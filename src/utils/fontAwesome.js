import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash, faCheck, faPlus, faEdit, faPhone, faPollH, faSave, faSpinner, faGlobeAfrica, faBars, faLocationArrow, faCircle, faInfo, faPlay, faPause, faMinus, faCaretDown, faCaretLeft, faCaretRight, faTachometerAlt, faForward, faUser, faInfoCircle, faWindowMaximize, faWindowRestore, faMap, faHistory, faChartBar, faLayerGroup, faEye, faEyeSlash, faTimes, faSearch, faDrawPolygon, faArrowUp, faArrowDown, faCog, faCalendarAlt, faVectorSquare, faFileImport, faQuestionCircle, faLock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faTrash, faCheck, faPlus, faEdit, faPhone, faPollH, faSave, faSpinner, faGlobeAfrica, faBars, faLocationArrow, faCaretDown, faCaretLeft, faCaretRight, faCircle, faInfo, faPlay, faPause, faMinus, faTachometerAlt, faForward, faUser, faInfoCircle, faWindowMaximize, faWindowRestore, faMap, faHistory, faChartBar, faLayerGroup, faEye, faEyeSlash, faTimes, faSearch, faDrawPolygon, faArrowUp, faArrowDown, faCog, faCalendarAlt, faVectorSquare, faFileImport, faQuestionCircle, faLock)

Vue.component('font-awesome-icon', FontAwesomeIcon)
