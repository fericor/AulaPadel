/********************************/
var API_USER = localStorage.getItem("LS_USER_API_KEY");
var LANGUAJE = localStorage.getItem("LS_LANG");
// var URL_SERVER  = 'http://127.0.0.1/aulapadel/services/api/v1/';
var URL_SERVER  = 'https://aulapadel.com/services/api/v1/';

var DATA_EVENTS = [];
var calendarInline, DateCalendarIni, DateCalendarFin, TimeCalendarIni, TimeCalendarFin, toggleTodoDia, calendarOctionFin, monthNames, monthNamesShort, dayNamesShort;
var mainView, leftView, toggleRepeatCalendar, toggleRepeatTodoCalendar, toggleRepeatFechaCalendar;
var searchbarAlumnos, searchbarGrupos, searchbarGruposSearch;
var DAYS_SMN, weekday, month, monthNames, monthNamesShort;

var AP_HORAS = ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];

// VARIBLES PARA LOS IDIOMAS
var langs    = ['es', 'en', 'it'];
var langCode = '';
var langJS   = null;

DAYS_SMN        = ['Lun','Mar','Mir','Jue','Vie','Sab','Dom'];
weekday         = ["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado","Domingo"];
month           = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembe","Diciembre"];
monthNames      = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembe","Diciembre"];
monthNamesShort	= ['Enr', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ags', 'Sep', 'Oct', 'Nov', 'Dic'];
dayNamesShort   = ['Dom', 'Lun', 'Mar', 'Mir', 'Jue', 'Vie', 'Sab'];


if(LANGUAJE == "en"){
	DAYS_SMN        = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
	weekday         = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
	month           = ["January","February","March","April","May","June","July","August","September","October","November","December"];
	monthNames      = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August' , 'September' , 'October', 'November', 'December'];
	monthNamesShort	= ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	dayNamesShort   = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
}
if(LANGUAJE == "es"){
	DAYS_SMN        = ['Lun','Mar','Mir','Jue','Vie','Sab','Dom'];
	weekday         = ["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado","Domingo"];
	month           = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembe","Diciembre"];
	monthNames      = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembe","Diciembre"];
	monthNamesShort	= ['Enr', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ags', 'Sep', 'Oct', 'Nov', 'Dic'];
	dayNamesShort   = ['Dom', 'Lun', 'Mar', 'Mir', 'Jue', 'Vie', 'Sab'];
}


/********************************/