document.addEventListener("DOMContentLoaded", function(event) { 
    
    var options = {
        'bgcolor': '#fff',
        'fontcolor': '#adb811', 
        'onOpened': function () { },
        'onClosed': function () {
            localStorage.setItem('LS_ONOFF_WELCOME', 'false');
        }
    };

    var welcomescreen_slides = [
        {
          id: 'slide0', 
          title: '<img src="images/logos/logo-h.png">', 
          //picture: '<div class="tutorialicon fa fa-clipboard-list"> </div>',
          text: 'Tus planificaciones anuales divididas por niveles con todos los ejercicios a golpe de click.<br><br> <i>Desliza para continuar<i> <i class="f7-icons">arrow_right</i>'
        },
        {
          id: 'slide1',
          title: '<img src="images/logos/logo-h.png">',
          //picture: '<div class="tutorialicon fa fa-braille"> </div>',
          text: 'Cientos de ejercicios. Mira los videos y elige los que prefieras para cada entrenamiento.<br><br> <i class="f7-icons">arrow_left</i> <i>Desliza para continuar</i> <i class="f7-icons">arrow_right</i>'
        },
        {
          id: 'slide2',
          title: '<img src="images/logos/logo-h.png">',
          //picture: '<div class="tutorialicon fa fa-book"> </div>',
          text: 'Libro interectivo donde aprenderas como realizar todos los golpes con explicaciones claras y ejemplos de cada golpe.<br><br> <i class="f7-icons">arrow_left</i> <i>Desliza para continuar</i>  <i class="f7-icons">arrow_right</i>'
        },
        {
          id: 'slide3',
          title: '<img src="images/logos/logo-v.png">', 
          picture: '<div class=""> <a href="#" class="tutorial-signup-btn login-screen-open" data-login-screen=".ap-login-screen">Entrar</a> <a href="#" class="tutorial-signin-btn login-screen-open" data-login-screen=".ap-register-screen">Regístrate</a> </div>',
          text: 'La pista es nuestra Aula, ahi te enseñamos todo!'
        } 
    ];

    Framework7.use(Framework7WelcomescreenPlugin);
    
    app = new Framework7({
        root: '#app',
        name: 'AulaPadel',
        id:   'es.vallmarketing.ap',
        welcomescreen: {
            slides: welcomescreen_slides,
            options: options,
        },
        theme: 'ios',
        routes: routes,
        view : {
        	pushState: false
        }
    });

    /////////////////////////////////////////////
    var opened = 0;
    function exitApp(){
    	if (opened > 0) {
    		return false;
    	} else {
    		app.confirm('Are you sure you want to exit?', 'Exit App',
    		  function () {
    			navigator.app.exitApp();
    		  },
    		  function () {
    			opened = 0;
    			return false;
    		  }
    		);
    		opened = 1;
    	}
    }

    document.addEventListener("backbutton", onBackKeyDown, false);

    function onBackKeyDown() {
    	// Handle the back button
    	if(mainView.router.currentPageEl == 'index'){
    		exitApp();
    		e.preventDefault();
    	} else {
    		app.sheet.close()
    		mainView.router.back();
    		return false;
    	}
    }
    /////////////////////////////////////////////

    // VALIDAMOS EL MOSTRAR O OCULTAR EL TOUR
    var OnOff = localStorage.getItem('LS_ONOFF_WELCOME');

    if(OnOff == 'false'){
        app.welcomescreen.close();
    }

    var swiper = app.swiper.create('.swiper-container', {
        speed: 600,
        spaceBetween: 100
    });

    mainView = app.views.create('.view-main', {iosSwipeBack: false});
    leftView = app.views.create('.view-left');
  
    var Notificacion_id_ejercicio_0 = app.notification.create({
        title: 'AulaPadel',
        text: 'Tienes que seleccionar un ejercicio.',
        closeTimeout: 3000,
    });

    var Notificacion_id_calendar_0 = app.notification.create({
        title: 'AulaPadel',
        text: 'Tienes que seleccionar un registro.',
        closeTimeout: 3000,
    });


    // FORM LOGIN :: Autentificacion de usuario
    Dom7('#ap-login-screen .tutorial-signup-btn').on('click', function () {
        var username = Dom7('#ap-login-screen [name="username"]').val();
        var password = Dom7('#ap-login-screen [name="password"]').val();

        app.preloader.show();

        if( (username == "") || (password == "") ){
            app.preloader.hide();
            app.dialog.alert("<b>ERROR:</b> <i>Los datos no pueden estar vacios.</i>");
        }else{
            $.ajax({
                type: "POST",
                url: URL_SERVER+"login",
                dataType: 'json',
                data: { email: username, password: password },
                success: function (data){
                    if(data.error){
                        app.preloader.hide();
                        app.dialog.alert(data.message);
                    }else{
                        localStorage.setItem('LS_USER_API_KEY', data.apiKey);
                        localStorage.setItem('LS_USER_AUTENTIFICADO', true);
                        localStorage.setItem('LS_USER_NAME', data.name);
                        localStorage.setItem('LS_USER_LASTNAME', data.lastname);
                        localStorage.setItem('LS_USER_TIPO', data.tipo);
                        localStorage.setItem('LS_USER_EMAIL', data.email);
                        localStorage.setItem('LS_USER_PHONE', data.phone);
                        localStorage.setItem('LS_USER_ID', data.idUser);
                        setInfoUser("true");

                        setTimeout(function () {
                            Dom7('#ap-login-screen [name="username"]').val("");
                            Dom7('#ap-login-screen [name="password"]').val("");

                            app.welcomescreen.close();
                            app.loginScreen.close('.ap-login-screen');
                            app.preloader.hide();
                        }, 3000);  
                    }                                          
                },
                error: function (request, status, error) {
                    setInfoUser("false");
                    app.preloader.hide();
                    app.dialog.alert(request.responseJSON.message);
                }
            }); 
        }         
    });

    // FORM REGISTER :: Registrar un nuevo usuario
    var POLITICA = app.toggle.create({
        el: '.politicaToggle',
        on: {
            change: function () {
                console.log('')
            }
        }
    });
    var PUBLICIDAD = app.toggle.create({
        el: '.publicidadToggle',
        on: {
            change: function () {
                console.log('')
            }
        }
    });
    Dom7('#ap-register-screen .tutorial-signup-btn').on('click', function () {
        var name     = $('#ap-register-screen [name="name"]').val();
        var username = Dom7('#ap-register-screen [name="username"]').val();
        var password = Dom7('#ap-register-screen [name="password"]').val();
        var phone    = Dom7('#ap-register-screen [name="phone"]').val();
        var PUBLICIDAD01 = 0;
        
        app.preloader.show();

        if (POLITICA.checked) {
            if( (username == "") || (password == "") || (name == "") || (phone == "") ){
                app.preloader.hide();
                app.dialog.alert("<b>ERROR:</b> <i>Los datos no pueden estar vacios.</i>");
            }else{
                if (PUBLICIDAD.checked) {
                    PUBLICIDAD01 = 1;
                }
                $.ajax({
                    type: "POST",
                    url: URL_SERVER+"register",
                    dataType: 'json',
                    data: { name: name, email: username, phone: phone, password: password, publicidad: PUBLICIDAD01},
                    success: function (data){
                        if(data.error){
                            app.preloader.hide();
                            app.dialog.alert(data.message);
                        }else{
                            ap_login_to_register(username, password);

                        }                                          
                    },
                    error: function (request, status, error) {
                        app.preloader.hide();
                        app.dialog.alert(request.responseJSON.message);
                    }
                }); 
            } 
        }else{
            app.preloader.hide();
            app.dialog.alert("<b>ERROR:</b> <i>Tienes que aceptar la Política de Privacidad.</i>");
        } 
    });

    // FORM RECUPERAR :: Recupera la contraseña
    Dom7('#btnRecuperarPass').on('click', function () {
        var EMAIL = Dom7('#txtRecuperarPass').val();

        app.preloader.show();

        if(EMAIL == ""){
            app.preloader.hide();
            app.dialog.alert("<b>ERROR:</b><br><i>El campo no puede enviarse vacio.</i>");
        }else{
            $.ajax({
                type: "POST",
                url: URL_SERVER+"recuperar",
                dataType: 'json',
                data: { emailUser: EMAIL },
                success: function (data){
                    app.preloader.hide();
                    app.dialog.alert(data.message);                                         
                },
                error: function (request, status, error) {
                    app.preloader.hide();
                    app.dialog.alert(request.responseJSON.message);
                }
            }); 
        }  
    });

    // FORM LOGIN :: Abrir ventana de register
    Dom7('#ap-login-screen .btnOpenRegisterForm').on('click', function () {
        app.loginScreen.close(".ap-login-screen");
        app.loginScreen.open(".ap-register-screen");
    });
    Dom7('#ap-login-screen .btnOpenRecuperarForm').on('click', function () {
        app.loginScreen.close(".ap-login-screen");
        app.loginScreen.open(".ap-recuperar-screen");
    });

    // FORM REGISTER :: Abrir ventana de login
    Dom7('#ap-register-screen .btnOpenRegisterForm').on('click', function () {
        app.loginScreen.close(".ap-register-screen");
        app.loginScreen.open(".ap-login-screen");
    });

    // BOTON PARA ELIMINAR EL EJERCICIO
    Dom7('.open-confirm-Ddel-ejercicio').on('click', function () {
        var ID_EJERCICIO = localStorage.getItem("LS_ID_EJERCICIO");

        if(ID_EJERCICIO == 0){
            Notificacion_id_ejercicio_0.open();   
        }else{
            app.dialog.confirm('Seguro que desea eliminar este ejercicio?', function () {
                $.ajax({
                    type: "DELETE",
                    headers: {"Authorization": localStorage.getItem("LS_USER_API_KEY")},
                    url: URL_SERVER+"ejercicio/"+ID_EJERCICIO,
                    dataType: 'json',
                    statusCode: { 
                        401: function (error) { 
                            app.loginScreen.open('.ap-login-screen');
                        } 
                    },
                    success: function (data){
                        localStorage.setItem('LS_ID_EJERCICIO', 0);
                        localStorage.setItem('LS_CODIGO_EJERCICIO', "");
                        localStorage.setItem('LS_TITLE_EJERCICIO', "");
                        localStorage.setItem('LS_DESCRIPTION_EJERCICIO', "");  

                        var TIPO = localStorage.getItem("LS_TYPE");
                            TIPO = TIPO.toLowerCase();

                        var VALOR = (TIPO == "main") ? '{"players":{},"balls":{},"shapes":[]}' : '{"frames":[{"elements":{}}],"frames_elements":{},"speed":5,"repeat":1}';

                        localStorage.setItem(TIPO+'_PADEL', VALOR);
                        BoardHelpers.showPage(TIPO); 

                        loadEjercicios();
                        loadEjerciciosPlantilla();
                            
                        app.dialog.alert(data.message);
                        initIcons();
                    }
                }); 
            });
        }
    });

    /**********************************
     **      F U N C I O N E S       **
     *********************************/
    Dom7(document).on('click', '.tutorial-close-btn', function () {
        app.welcomescreen.close();
    });

    Dom7('.tutorial-open-btn').click(function () {
        app.welcomescreen.open();  
    });
    
    Dom7(document).on('click', '.tutorial-next-link', function (e) {
        app.welcomescreen.next(); 
    });
    
    Dom7(document).on('click', '.tutorial-previous-slide', function (e) {
        app.welcomescreen.previous(); 
    });

    // LINK PARA IR A LA PAGINAS
    Dom7(document).on('click', '.ap-link', function (e) {
        var URL     = Dom7(this).data('url');
        var MOD     = Dom7(this).data('mod');
        var ISLOGIN = localStorage.getItem('LS_USER_AUTENTIFICADO');
        app.preloader.show();

        if(ISLOGIN){
            $.ajax({
                type: "GET",
                headers: {"Authorization": localStorage.getItem("LS_USER_API_KEY")},
                url: URL_SERVER+"tengoAcceso/"+MOD,
                dataType: 'json',
                success: function (data){
                    if(data.tengo_acceso == "SI"){
                        app.preloader.hide();
                        mainView.router.navigate(URL); 
                    }else{
                        app.preloader.hide();
                        app.dialog.alert(data.mensaje);
                    }
                                        
                }
            });
            
        }else{
            app.loginScreen.open('.ap-login-screen');
            app.preloader.hide();
        }        
    });

    Dom7(document).on('click', '.ap-modal-link', function (e) {
        var URL     = Dom7(this).data('screen');
        var MOD     = Dom7(this).data('mod');
        var ISLOGIN = localStorage.getItem('LS_USER_AUTENTIFICADO');
        app.preloader.show();

        if(ISLOGIN){
            $.ajax({
                type: "GET",
                headers: {"Authorization": localStorage.getItem("LS_USER_API_KEY")},
                url: URL_SERVER+"tengoAcceso/"+MOD,
                dataType: 'json',
                success: function (data){
                    if(data.tengo_acceso == "SI"){
                        app.preloader.hide();
                        app.loginScreen.open(URL);
                    }else{
                        app.preloader.hide();
                        app.dialog.alert(data.mensaje);
                    }
                                        
                }
            });
        }else{
            app.loginScreen.open('.ap-login-screen');
            app.preloader.hide();
        }        
    });

    /**********************************
     **      C A L E N D A R I O     **
     *********************************/
    var monthNames1 = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto' , 'Septiembre' , 'Octubre', 'Noviembre', 'Diciembre'];
    calendarFechasVarias = app.calendar.create({
        containerEl: '#demo-calendar-inline-container',
        events: ' ',
        value: [new Date()],
        multiple: true,
        weekHeader: true,
        dayNamesShort: dayNamesShort,
        renderToolbar: function () {
            return '<div class="toolbar calendar-custom1-toolbar no-shadow">' +
                    '<div class="toolbar-inner">' +
                        '<div class="left">' +
                '<a href="#" class="link icon-only"><i class="icon icon-back ' + (app.theme === 'md' ? 'color-black' : '') + '"></i></a>' +
                '</div>' +
                '<div class="center"></div>' +
                '<div class="right">' +
                '<a href="#" class="link icon-only"><i class="icon icon-forward ' + (app.theme === 'md' ? 'color-black' : '') + '"></i></a>' +
                '</div>' +
            '</div>' +
            '</div>';
        },
        on: {
            init: function (c) {
                Dom7('.calendar-custom1-toolbar .center').text(monthNames1[c.currentMonth] +', ' + c.currentYear);
                Dom7('.calendar-custom1-toolbar .left .link').on('click', function () {
                    calendarFechasVarias.prevMonth();
                });
                Dom7('.calendar-custom1-toolbar .right .link').on('click', function () {
                    calendarFechasVarias.nextMonth();
                });
            },
            monthYearChangeStart: function (c) {
                Dom7('.calendar-custom1-toolbar .center').text(monthNames1[c.currentMonth] +', ' + c.currentYear);
            },
        }
    });
    calendarNacimiento = app.calendar.create({
        inputEl: '#txtNacimiento',
        dateFormat: 'dd/mm/yyyy',
        openIn: 'popover',
        closeOnSelect: true,
        locale: 'es-ES',
        on: {
            open: function (c) {
            }
        }
    });
    calendarInicio = app.calendar.create({
        inputEl: '#txtCalendarInicio',
        dateFormat: 'dd/mm/yyyy',
        openIn: 'popover',
        closeOnSelect: true,
        locale: 'es-ES',
        on: {      
            close: function (c) {
                var OPCION   = $("#txtRepetirCalendar").val();
                var FECHAFIN = $("#txtCalendarFin").val();

                if(OPCION == 0){
                    if(FECHAFIN == ""){

                    }
                }else{

                }
            }
        }
    });
    calendarFin = app.calendar.create({
        inputEl: '#txtCalendarFin',
        dateFormat: 'dd/mm/yyyy',
        openIn: 'popover',
        closeOnSelect: true,
        locale: 'es-ES',
        on: {      
            close: function (c) {
                var OPCION      = $("#txtRepetirCalendar").val();
                var FECHAINICIO = $("#txtCalendarInicio").val();
                var FECHAFIN    = $("#txtCalendarFin").val();

                if(OPCION == 0){
                    cambiarTextoRepetir('Repetir desde <b>'+FECHAINICIO+'</b> al <b>'+FECHAFIN+'</b>');
                }else{

                }
            }
        }
    });

    TimeCalendarIni = app.picker.create({
        inputEl: '#txtCalendarHoraIni',
        toolbar: false,
        rotateEffect: true,
        openIn: 'popover',
        on: {
            change: function (picker, values, displayValues) {
                var str = values[0];
                var res = str.split(":");
                var num = parseInt(res[0]) + 1;

                TimeCalendarFin.setValue([num+":00"]);
            },
        },
        cols: [
          {
            textAlign: 'center',
            values: AP_HORAS
          }
        ]
    });

    TimeCalendarFin = app.picker.create({
        inputEl: '#txtCalendarHoraFin',
        toolbar: false,
        rotateEffect: true,
        openIn: 'popover',
        cols: [
          {
            textAlign: 'center',
            values: AP_HORAS
          }
        ]
    });

    calendarOctionFin = app.calendar.create({
        inputEl: '#calendarOctionFin',
        openIn: 'popover',
        header: true,
        footer: true,
        dateFormat: 'MM dd yyyy',
    });

    toggleRepeatCalendar = app.toggle.create({
        el: '.apToggleRepetirDia',
        on: {
            change: function () {
                if (toggleRepeatCalendar.checked) {
                    $("input:checkbox[name=txtRepetirCalendarDia]").prop('disabled', false);
                    $("#txtRepetirCalendar").val(1);
                    $("#txtCalendarFechaRepetir2").prop('disabled', false);
                    $("#lblRepetirTodosLosDias").html('');
                }else{
                    $("input:checkbox[name=txtRepetirCalendarDia]").prop('disabled', true);
                    $("input:checkbox[name=txtRepetirCalendarDia]").prop('checked', false);

                    $('#txtDiaCalendarRepetir').val(0);
                    $("#txtRepetirCalendar").val(0);
                    $("#txtCalendarFechaRepetir2").prop('disabled', true);

                    cambiarTextoRepetir('Repetir');                    
                }
                Dom7('.chkRepetirCalendar2').prop('checked', false);
                Dom7('.chkRepetirCalendar3').prop('checked', false);    
            }
        }
    });

    var now = new Date();
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    var weekLater = new Date().setDate(today.getDate() + 7);

    toggleRepeatTodoCalendar = app.toggle.create({
        el: '.apToggleRepetirTodoDia',
        on: {
            change: function () {
                Dom7('.chkRepetirCalendar1').prop('checked', false);
                Dom7('.chkRepetirCalendar3').prop('checked', false);
                $("input:checkbox[name=txtRepetirCalendarDia]").prop('disabled', true);
                $("input:checkbox[name=txtRepetirCalendarDia]").prop('checked', false);

                $('#txtDiaCalendarRepetir').val(0);
                $("#txtRepetirCalendar").val(2); 

                if (toggleRepeatTodoCalendar.checked) {
                    var FECHAINICIO = $("#txtCalendarInicio").val();
                    var FECHAFIN    = $("#txtCalendarFin").val();
                    
                    var F_DIV = FECHAINICIO.split("/");

                    var d = new Date(F_DIV[2], parseInt(F_DIV[1])-1, parseInt(F_DIV[0]) );
                    var n = weekday[d.getDay()];
                    $("#txtDiaCalendarRepetir").val(d.getDay());

                    $("#lblRepetirTodosLosDias").html('Repetir todos los <b>'+n+'</b> desde el <b>'+FECHAINICIO+'</b> hasta el <b>'+FECHAFIN+'</b>');
                    cambiarTextoRepetir('Repetir todos los <b>'+n+'</b> desde el <b>'+FECHAINICIO+'</b> hasta el <b>'+FECHAFIN+'</b>');
                }else{
                    $("#lblRepetirTodosLosDias").html('');
                    $("#txtRepetirCalendar").val(0);
                    cambiarTextoRepetir('Repetir');
                }
                
            }
        }
    });

    toggleRepeatFechaCalendar = app.toggle.create({
        el: '.apToggleRepetirFechaDia',
        on: {
            change: function () {
                if (toggleRepeatFechaCalendar.checked) {
                    var FECHAINICIO = $("#txtCalendarInicio").val();
                    var FECHAFIN    = $("#txtCalendarFin").val(); 

                    Dom7('.chkRepetirCalendar1').prop('checked', false);
                    Dom7('.chkRepetirCalendar2').prop('checked', false); 
                    $("input:checkbox[name=txtRepetirCalendarDia]").prop('disabled', true);
                    $("input:checkbox[name=txtRepetirCalendarDia]").prop('checked', false);

                    $('#txtDiaCalendarRepetir').val(0);
                    $("#txtRepetirCalendar").val(3);
                    $("#lblRepetirTodosLosDias").html('');
                    $("#demo-calendar-inline-container").show();

                    var FECHA = $("#txtCalendarFechaRepetir2").val();
                    cambiarTextoRepetir('Repetir los dias seleccionados desde <b>'+FECHAINICIO+'</b> al <b>'+FECHAFIN+'</b>');
                }else{
                    $("#demo-calendar-inline-container").hide();
                    $("#txtRepetirCalendar").val(0);
                    cambiarTextoRepetir('Repetir');
                }
            }
        }
    });
    
    Dom7('.ap-link-calendar').on('click', function(event){
        var PAGE = $(this).data("rel");
        app.tab.show("#"+PAGE);
    });

    Dom7('.ap-calendar-screen').on('loginscreen:open', function (e, loginScreen) {
        getCalendarTime();
    });

    Dom7('#btnCalendarSave').on('click', function(){
        app.preloader.show();
        if( $('#txtCalendarHoraIni').val() != "" ) {
            var formData = app.form.convertToData('#myFormCalendar');

            var ID_CALENDAR = $("#txtIdCalendarItem").val();
            var METODO   = (ID_CALENDAR == 0) ? "POST" : "PUT";
            var URL      = (ID_CALENDAR == 0) ? "" : "/"+ID_CALENDAR;

            $.ajax({
                type: METODO,
                headers: {"Authorization": localStorage.getItem("LS_USER_API_KEY")},
                url: URL_SERVER+"addCalendar"+URL,
                dataType: 'json',
                data:formData,
                statusCode: { 
                    401: function (error) { 
                        app.loginScreen.open('.ap-login-screen');
                    },
                    400: function(error){
                        app.dialog.alert("No puedes enviar el formulario vacio.");
                    }
                },
                beforeSend: function(){ app.preloader.show(); },
                success: function (data){  
                    a = _projectTexts.get();

                    if(data.error == true){
                        app.dialog.alert(data.message );
                        app.preloader.hide();
                    }else{        
                        if(data.message == "AP_CALENDAR_INSERT"){
                            a = _projectTexts.get();
                            app.dialog.alert(a.t_msg_add_calendar);
                        }else{
                            a = _projectTexts.get();
                            app.dialog.alert(a.t_msg_update_calendar);
                        }   
                        
                        $('#myFormCalendar')[0].reset();  
                        getCalendarReadInfo(ID_CALENDAR);
                        getItemsCalendar(data.dia, data.mes, data.ano);
                        //getCalendarSemana();
                        getCalendarTime();
                        initSemana();
                        app.sheet.close(".my_modal_calendar");
                        app.preloader.hide();
                    }
                },
                error: function (xhr, status, errorThrown) {
                    a = _projectTexts.get();
                    app.preloader.hide();
                }
            });
        }else{
            app.preloader.hide();
            app.dialog.alert("No puedes enviar el formulario vacio.");
        }
        
    });

    Dom7('#btnAlumnoSave').on('click', function(){
        app.preloader.show();
        var fd = new FormData();
        var IMAGEN = $('#txtImageAlumno')[0].files[0];
   
        var NOMBRE     = $("#txtNameAlumno").val(),
            APELLIDOS  = $("#txtLastNameAlumno").val(),
            TELEFONO   = $("#txtPhoneAlumno").val(),
            EMAIL      = $("#txtEmailAlumno").val(),
            GRUPO      = $("#txtGroupAlumno").val(),
            NIVEL      = $("#txtNivelAlumno").val(),
            DIRECCION  = $("#txtDireccionAlumno").val(),
            NACIMIENTO = $("#txtNacimiento").val();

        var ID_ALUMNO = $("#txtIdAlumno").val();
        var METODO    = (ID_ALUMNO == 0) ? "POST" : "PUT";
        var URL       = (ID_ALUMNO == 0) ? "" : "/"+ID_ALUMNO;

        fd.append('txtIdAlumno',ID_ALUMNO);
        fd.append('txtImageAlumno',IMAGEN);
        fd.append('txtNameAlumno',NOMBRE);
        fd.append('txtLastNameAlumno',APELLIDOS);
        fd.append('txtPhoneAlumno',TELEFONO);
        fd.append('txtEmailAlumno',EMAIL);
        fd.append('txtGroupAlumno',GRUPO);
        fd.append('txtNivelAlumno',NIVEL);
        fd.append('txtDireccionAlumno',DIRECCION);
        fd.append('txtNacimiento',NACIMIENTO);

        $.ajax({
            type: "POST",//METODO,
            headers: {"Authorization": localStorage.getItem("LS_USER_API_KEY")},
            url: URL_SERVER+"addAlumno"+URL,
            //dataType: 'json',
            data: fd,
            contentType: false,
            processData: false,
            beforeSend: function(){
                app.preloader.show();
            },
            success: function(data){
                a = _projectTexts.get();

                if(data.error){
                    app.dialog.alert(data.message );
                    app.preloader.hide();
                }else{
                    if(data.message == "AP_ALUMNO_INSERT"){
                        app.dialog.alert(a.t_msg_add_alumno);
                    }else{
                        app.dialog.alert(a.t_msg_update_alumno);
                    }  

                    getAlumnos();

                    $('#myFormAlumno')[0].reset();  
                    app.sheet.close(".my_model_alumno");
                    app.tab.show("#tab-2");  

                    app.preloader.hide();
                }
            },
            error: function (xhr, status, errorThrown) {
                a = _projectTexts.get();
                app.dialog.alert("Code: "+xhr.status+"<br>"+a.t_error_server);
                app.preloader.hide();
            }
        });

    });

    Dom7('#btnGrupoSave').on('click', function(){

        app.preloader.show();

        var formData = app.form.convertToData('#myFormGrupo');

        var ID_GRUPO = $("#txtIdGrupoAlumno").val();
        var METODO   = (ID_GRUPO == 0) ? "POST" : "PUT";
        var URL      = (ID_GRUPO == 0) ? "" : "/"+ID_GRUPO;

        $.ajax({
            type: METODO,
            headers: {"Authorization": localStorage.getItem("LS_USER_API_KEY")},
            url: URL_SERVER+"addGrupo"+URL,
            dataType: 'json',
            data:formData,
            statusCode: { 
                401: function (error) { 
                    app.loginScreen.open('.ap-login-screen');
                } 
            },
            beforeSend: function(){ app.preloader.show(); },
            success: function (data){    
                a = _projectTexts.get();

                if(data.error){
                    app.dialog.alert(a.data.message );
                    app.preloader.hide();
                }else{
                    if(data.message == "AP_GRUPO_INSERT"){
                        a = _projectTexts.get();
                        app.dialog.alert(a.t_msg_add_grupo);

                    }else{
                        a = _projectTexts.get();
                        app.dialog.alert(a.t_msg_edit_grupo);
                        readFormGrupo(ID_GRUPO);
                    }   
                    
                    getListViewGrupos();
                    app.sheet.close(".my_modal_info_grupos");
                    app.sheet.close(".my_model_grupos");
                    app.tab.show("#tab-3");  
                    $('#myFormGrupo')[0].reset();  
                    
                    app.preloader.hide();

                }
            }, error: function (xhr, status, errorThrown) {
                a = _projectTexts.get();
                app.dialog.alert("Code: "+xhr.status+"<br>"+a.t_error_server);
                app.preloader.hide();
            }
        });
    });
      
    Dom7('.fill-form-from-data').on('click', function(){
        var formData = {
          'name': 'John',
          'email': 'john@doe.com',
          'gender': 'female',
          'toggle': ['yes'],
        }
        app.form.fillFromData('#myFormCalendar', formData);
    });  

    Dom7('.li-box-calendar').on('click', function(){
        var NUM_COLOR = $(this).attr("data-color");
        setColorBox1(NUM_COLOR);
        $("#txtColorCalendar").val(NUM_COLOR);
        app.popup.close(".popupColorCalendar");
    });

    //////////////////////////////////////
    searchbarAlumnos = app.searchbar.create({
        el: '.apSearchbar',
        searchContainer: '.apList',
        searchIn: '.apItem-title',
        on: {
            search(sb, query, previousQuery) {
                
            }
        }
    });

    searchbarGrupos = app.searchbar.create({
        el: '.searchbarGrupos',
        searchContainer: '.aplistSearch',
        searchIn: '.apItemTitle',
        on: {
            search(sb, query, previousQuery) {
                
            }
        }
    });

    searchbarGruposSearch = app.searchbar.create({
        el: '.searchbarGruposSearch',
        searchContainer: '.apListSearch',
        searchIn: '.apItem_titleSearch',
        on: {
            search(sb, query, previousQuery) {
                
            }
        }
    });

    searchbarSearchIndiceLibro = app.searchbar.create({
        el: '.apSearchIndiceLibro',
        searchContainer: '.apListSearchIndiceLibro',
        searchIn: '.apItemSearchIndiceLibro',
        on: {
            search(sb, query, previousQuery) {
                
            }
        }
    });
});



    /**********************************
     **      F U N C I O N E S       **
    *********************************/

    // LOGOUT
    function ap_logout(){
        setInfoUser("false");
        localStorage.clear();
        // localStorage.length("LS_ONOFF_WELCOME", false);
        mainView.router.navigate('/'); 
        
        return false;
    }

    // LOGIN    
    function ap_accordion(THIS){
        $(THIS).toggleClass("ap-active");    

        var panel = $(THIS).next();
        var NUM   = $(panel).get(0).scrollHeight;
        
        if ($(panel).height() > 35){
            $(panel).css('max-height', "");
        } else {
            $(panel).css('max-height', NUM+"px");
        }
    }

    // TEMPLATE USER
    function setInfoUser(ONOFF){
        var IMG         = 'images/avatar.png',
            NAME        = "Anonimo",
            LASTNAME    = "",
            TIPO        = "",
            BIO         = "no ha iniciado sesion",
            IDUSER      = "",
            DESCRIPTION = "sin licencia";

        $("#divBotonSalir").hide();
        $(".ap_hide").show();
            
        if(ONOFF == "true"){    

            NAME        = localStorage.getItem('LS_USER_NAME'),
            LASTNAME    = localStorage.getItem('LS_USER_LASTNAME'),
            TIPO        = localStorage.getItem('LS_USER_TIPO'),
            BIO         = localStorage.getItem('LS_USER_EMAIL'),
            IDUSER      = localStorage.getItem('LS_USER_ID');   
            IMG         = "https://aulapadel.com/services/users/avatares/"+IDUSER+".jpg";

            switch(TIPO) {
                case "1":
                    DESCRIPTION = "AP-BRONCE"; 
                    break;
                case "2":
                    DESCRIPTION = "AP-PLATA";
                    break;
                case "3":
                    DESCRIPTION = "AP-ORO";
                    break;
                case "4":
                    DESCRIPTION = "AP-PLATINUM";
                    break;
                default:
                    DESCRIPTION = "sin licencia";
                    break;
            }
            
            $("#divBotonSalir").show();
            $(".ap_hide").hide();
        }


        $(".divUserImgInfo").attr("src", IMG);
        $(".divUserNameInfo").html(NAME+" "+LASTNAME);
        $(".divUserBioInfo").html(BIO);
        $(".divUserDescriptionInfo").html(DESCRIPTION);  
    }

    function ap_login_to_register(username, password){ 
        $.ajax({
            type: "POST",
            url: URL_SERVER+"login",
            dataType: 'json',
            data: { email: username, password: password },
            success: function (data){
                if(data.error){
                    app.preloader.hide();
                    app.dialog.alert(data.message);
                }else{
                    localStorage.setItem('LS_USER_API_KEY', data.apiKey);
                    localStorage.setItem('LS_USER_AUTENTIFICADO', true);
                    localStorage.setItem('LS_USER_NAME', data.name);
                    localStorage.setItem('LS_USER_LASTNAME', data.lastname);
                    localStorage.setItem('LS_USER_TIPO', data.tipo);
                    localStorage.setItem('LS_USER_EMAIL', data.email);
                    localStorage.setItem('LS_USER_PHONE', data.phone);
                    localStorage.setItem('LS_USER_ID', data.idUser);
                    setInfoUser("true");

                    setTimeout(function () {
                        location.reload();
                    }, 3000);
                }                                          
            },
            error: function (request, status, error) {
                setInfoUser("false");
                app.preloader.hide();
                app.dialog.alert(request.responseJSON.message);
            }
        }); 
    }

    // WELCOME
    function ap_on_tour(){ app.welcomescreen.open(); }
    function ap_off_tour(){ app.welcomescreen.close(); }