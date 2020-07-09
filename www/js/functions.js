// FUNCION QUE CONTROLA EL IDIOMA DE LA APLICACION
var translate = function (jsdata){	
	$("[tkey]").each (function (index){
		var strTr = jsdata [$(this).attr ('tkey')];
	    $(this).html (strTr);
	});
}

// ESTA FUNCION CAMBIA A ESPAÑOL LOS TEXTOS
var normalize = (function() {
    var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç", 
        to   = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
        mapping = {};

    for(var i = 0, j = from.length; i < j; i++ )
        mapping[ from.charAt( i ) ] = to.charAt( i );

    return function( str ) {
        var ret = [];
        for( var i = 0, j = str.length; i < j; i++ ) {
            var c = str.charAt( i );
            if( mapping.hasOwnProperty( str.charAt( i ) ) )
                ret.push( mapping[ c ] );
            else
                ret.push( c );
        }      
        return ret.join( '' );
    }

})();

function playFullScreenVideo(VIDEO){
	var player = videojs('my-video2');
		player.pause();
		//var new_url = "https://dl.dropboxusercontent.com/s/"+VIDEO+".webm?dl=0";		
		player.src(VIDEO);
		player.src({src: VIDEO, type: 'video/mp4'});
		player.load();
		player.play();

		player.requestFullscreen();

	setTimeout(function(){
		//$('.vjs-play-control').click();
		//$('.vjs-fullscreen-control').click();
	}, 3000);
}

function stopVideo2() {
	localStorage.setItem('LS_ID_PLAY', 0);
	$( "i#btnPlayStop" ).text( "play_arrow" );

	var player = videojs('my-video2');
	    player.pause();
}

// LIMPIAR EL ID DEL VIDEO
function playVideo(THIS, VIDEO, IDGROUP) {
	localStorage.setItem('LS_ID_PLAY', 0);
	$( "i#btnPlayStop" ).text( "pause" );
	var IDGRUP = IDGROUP;
	var HTML_1   = "";

	var TITLE  = $(THIS).children().children().children().children('.item-title').text();
	var DESCRIPCION = $(THIS).children().children().children('.item-subtitle').text();
	localStorage.setItem('LS_TITLE_PLAY', TITLE);
	localStorage.setItem('LS_DETAILS_PLAY', DESCRIPCION);

	$("#divInfoVideoLibro").text(DESCRIPCION);
	$("#lblTituloVideo").text(TITLE);

	$.ajax({
		type: "GET",
		headers: {"Authorization": localStorage.getItem("LS_USER_API_KEY")},
		url: URL_SERVER+"videosLibrosGroup/"+IDGRUP,
		dataType: 'json',
		//data: { email: 0 },
		success: function (data){
			var player = videojs('my-video');
				player.pause();
				var new_url = "https://dl.dropboxusercontent.com/s/"+VIDEO+".webm?dl=0";		
				//player.src(VIDEO);
				player.src({src: VIDEO, type: 'video/mp4'});
				// set src track corresponding to new movie //
				player.load();
				player.play();

			$.each(data.videosLibrosGroup, function(index, item) {

				//HTML_1 += '<li data-url="'+ item.v_url +'" data-id="'+ item.v_id +'" onclick="(\'mod_video_libro\', this, '"+ item.v_id +"', "+ ID +", '"+ item.v_tengo +"');">';
				HTML_1 += "<li data-url='"+ item.v_url +"' data-id='"+ item.v_id +"' onclick='playLiVideo(\"mod_video_libro\", this, "+ item.v_id +", 0, "+ item.v_tengo +");'>";
					HTML_1 += '<div class="item-content">';
						HTML_1 += '<div class="item-media"><img src="images/logos/logo512.jpg" width="40"/></div>';
						HTML_1 += '<div class="item-inner">';
							HTML_1 += '<div class="item-title-row">';
								HTML_1 += '<div class="item-title">'+ item.v_title +'</div>';
							HTML_1 += '</div>';
							HTML_1 += '<div class="item-subtitle">'+ item.v_description +'</div>';
						HTML_1 += '</div>';
						HTML_1 += '<div class="item-icon"><i class="icon f7-icons size30" style="line-height: 50px;">play_round_fill</i></div>';
					HTML_1 += '</div>';
				HTML_1 += '</li>';
			});   
			
			$("#playlist").html(HTML_1);
		}
	}); 
}

function insertModUser(MODULO, ID){
	VALOR = 0;
	$.ajax({
		type: "POST",
		headers: {"Authorization": localStorage.getItem("LS_USER_API_KEY")},
		url: URL_SERVER+"insertModItem",
		data:{txtItemModulo: ID, txtModulo: MODULO},
		dataType: 'json',
		success: function (data){ 
			VALOR = data.id;
		}
	}); 

	return VALOR;
}

// PLAY DEL VIDEO Y VALIDACION DEL ROL DE USUARIO
function validateRolUserMod(MODULO, THIS, VALOR, ID, LOTENGO){
	$.ajax({
        type: "GET",
        headers: {"Authorization": localStorage.getItem("LS_USER_API_KEY")},
        url: URL_SERVER+"tengoAcceso/mod_video_libro",
        dataType: 'json',
        success: function (data){
            if(data.tengo_acceso == "SI"){
                if(data.error_mod == true){
                    if(LOTENGO == 1){
						////////////////////////////////
						app.popup.open("#vLibro-popup");
						playVideo(THIS, VALOR, ID);
                        ////////////////////////////////
                    }else{
                        app.dialog.alert(data.num_mensaje);
                    }
                }else{
					////////////////////////////////
					insertModUser(MODULO, ID);
					app.popup.open("#vLibro-popup");
					playVideo(THIS, VALOR, ID);
                    ////////////////////////////////
                }
            }else{
                app.dialog.alert(data.mensaje);
            }
                                
        }
    }); 
}

// PLAY AL VIDEO RELACIONADO
function playLiVideo(MODULO, THIS, VALOR, ID, LOTENGO){
	alert(VALOR);
	var player = videojs('my-video');
		player.landscapeFullscreen();

	var ESTADO = $(THIS).find( "i.material-icons" ).text();
	var PLAYER = videojs('my-video');
	var ID     = $(THIS).attr("data-id");
	var TITLE  = $(THIS).children().children().children().children('.item-title').text();
	var DESCRIPCION = $(THIS).children().children().children('.item-subtitle').text();
	localStorage.setItem('LS_TITLE_PLAY', TITLE);
	localStorage.setItem('LS_DETAILS_PLAY', DESCRIPCION);

	$("#divInfoVideoLibro").text(DESCRIPCION);

	$.ajax({
        type: "GET",
        headers: {"Authorization": localStorage.getItem("LS_USER_API_KEY")},
        url: URL_SERVER+"tengoAcceso/mod_video_libro",
        dataType: 'json',
        success: function (data){
            if(data.tengo_acceso == "SI"){
                if(data.error_mod == true){
                    if(LOTENGO == 1){
						////////////////////////////////
						app.popup.open("#vLibro-popup");
						if ( ID == localStorage.getItem('LS_ID_PLAY') ) {
							if (ESTADO == "pause_circle_filled") {
								$(THIS).find( "i.material-icons" ).text( "play_circle_filled" );
								$( "i#btnPlayStop" ).text( "play_arrow" );
								PLAYER.pause();
					
							} else {
								$(THIS).find( "i.material-icons" ).text( "pause_circle_filled" );
								$( "i#btnPlayStop" ).text( "pause" );
								PLAYER.play();
					
							}
					
						} else {
							localStorage.setItem('LS_ID_PLAY', ID);
					
							$( "li i.material-icons" ).text( "play_circle_filled" );
							$( "i#btnPlayStop" ).text( "pause" );
							$(THIS).find( "i.material-icons" ).text( "pause_circle_filled" );
					
							//var player = videojs('my-video');
							player.pause();
							var new_url = $(THIS).attr("data-url");
							//player.src(new_url);
							player.src({src: new_url, type: 'video/mp4'});
							// set src track corresponding to new movie //
							player.load();
							player.play();
					
						}
                        ////////////////////////////////
                    }else{
                        app.dialog.alert(data.num_mensaje);
                    }
                }else{
					////////////////////////////////
					insertModUser(MODULO, VALOR);
					app.popup.open("#vLibro-popup");
					if ( ID == localStorage.getItem('LS_ID_PLAY') ) {
						if (ESTADO == "pause_circle_filled") {
							$(THIS).find( "i.material-icons" ).text( "play_circle_filled" );
							$( "i#btnPlayStop" ).text( "play_arrow" );
							PLAYER.pause();
				
						} else {
							$(THIS).find( "i.material-icons" ).text( "pause_circle_filled" );
							$( "i#btnPlayStop" ).text( "pause" );
							PLAYER.play();
				
						}
				
					} else {
						localStorage.setItem('LS_ID_PLAY', ID);
				
						$( "li i.material-icons" ).text( "play_circle_filled" );
						$( "i#btnPlayStop" ).text( "pause" );
						$(THIS).find( "i.material-icons" ).text( "pause_circle_filled" );
				
						//var player = videojs('my-video');
						player.pause();
						var new_url = $(THIS).attr("data-url");
						//player.src(new_url);
						player.src({src: new_url, type: 'video/mp4'});
						// set src track corresponding to new movie //
						player.load();
						player.play();
				
					}
                    ////////////////////////////////
                }
            }else{
                app.dialog.alert(data.mensaje);
            }             
        }
    }); 
}

// PARA EL VIDEO EN REPRODUCCION
function stopVideo() {
	localStorage.setItem('LS_ID_PLAY', 0);
	$( "i#btnPlayStop" ).text( "play_arrow" );

	var player = videojs('my-video');
	    player.pause();
}

// PLAY Y PAUSE VIDEO
function PlayPauseToggle() {
	var myPlayer = videojs('my-video');

	if (myPlayer.paused()) {
		$( "img#btnPlayStop" ).attr( "src", "images/buttons/play.png" );
    	myPlayer.play();

  	} else {
  		$( "img#btnPlayStop" ).attr( "src", "images/buttons/pause.png" );
  		myPlayer.pause();

  	}
}

// VIDEO FULLSCREEN
function btnFullscreen() {
	$('.vjs-fullscreen-control').click();
}

// NOTIFICACIONES
function ap_notification(){
	app.notification.create({
	    icon:     '<i class="icon demo-icon">7</i>',
	    title:    'AulaPadel informacion',
	    subtitle: 'Notification with close button',
	    text: 'Click (x) button to close me',
	    closeButton: true,
	});
}

function initCalendar(){ // ESTA FUNCION CARGA LOS ITEMS DEL CALENDARIO PARA LOS DIAS
	var d = new Date();

	var DIA = d.getDate();
	var MES = d.getMonth() + 1;
	var ANO = d.getFullYear();
	var DIA1 = DIA < 10 ? "0"+DIA : DIA;
	var MES1 = MES < 10 ? "0"+MES : MES;

	$("#divBtnDeleteCalendar").hide();
	localStorage.setItem("LS_NUM_HEADER_CALENDAR", 0);
	localStorage.setItem("LS_INIT_DAY_DIAS", 0);
	localStorage.setItem("LS_FECHA_CALENDAR", DIA1+"/"+ MES1 +"/"+ANO);

	$('#contentCalendar').html('<div class="block block-strong text-align-center"><div class="preloader color-multi"  style="width: 100px; height: 100px"></div></div>');

	$.ajax({
		type: "GET",
		headers: {"Authorization": localStorage.getItem("LS_USER_API_KEY")},
		url: URL_SERVER+"itemsCalendar/"+DIA+"/"+MES+"/"+ANO,
		dataType: 'json',
        statusCode: { 
            401: function (error) { 
                app.loginScreen.open('.ap-login-screen');
            } 
        },
		success: function (data){
			$('#contentCalendar').html('');
			var $hcal = $('#contentCalendar').hcal(0);
				$.each(data.itemsCalendar, function(index, item) {
					$hcal.addHcalAppointment(item.h_dia, item.h_duracion, item.name, 'Nivel: '+item.titulo, item.nota, item.color, item.id);
				});   
		}
	}).always(function() {
		
	});
}

function initCalendarOther(NUM){ // ESTA FUNCION CARGA LOS EVENTOS DEL CALENDARIO EN DIAS PASANDO PARAMETRO DE DIAS
	var NUMDIAS = parseInt(localStorage.getItem("LS_INIT_DAY_DIAS")) + NUM;
	localStorage.setItem("LS_NUM_HEADER_CALENDAR", 0);
	localStorage.setItem("LS_INIT_DAY_DIAS", 0);
	$('#contentCalendar').html('<div class="block block-strong text-align-center"><div class="preloader color-multi"  style="width: 100px; height: 100px"></div></div>');

	var d = new Date();
		d.setDate( d.getDate() + NUMDIAS );

	var DIA = d.getDate();
	var MES = d.getMonth() + 1;
	var ANO = d.getFullYear();

	var DIA1 = DIA < 10 ? "0"+DIA : DIA;
	var MES1 = MES < 10 ? "0"+MES : MES;

	$.ajax({
		type: "GET",
		headers: {"Authorization": localStorage.getItem("LS_USER_API_KEY")},
		url: URL_SERVER+"itemsCalendar/"+DIA+"/"+MES+"/"+ANO,
		dataType: 'json',
        statusCode: { 
            401: function (error) { 
                app.loginScreen.open('.ap-login-screen');
            } 
        },
		success: function (data){
			$('#contentCalendar').html('');
			var $hcal = $('#contentCalendar').hcal(NUMDIAS);
				$.each(data.itemsCalendar, function(index, item) {
					$hcal.addHcalAppointment(item.h_dia, item.h_duracion, item.name, 'Nivel: '+item.titulo, item.nota, item.color, item.id);
				});   
        }
	}).always(function() {
		
	});

	localStorage.setItem("LS_INIT_DAY_DIAS", NUMDIAS);
	localStorage.setItem("LS_FECHA_CALENDAR", DIA1+"/"+ MES1 +"/"+ANO);
}

function getGruposCheckbox(IDS){ // ESTA FUNCION CARGA LOS GRUPOS CON UN CHECKBOX
	$('.ulMembersGroupsCheckbox').html('<div class="block block-strong text-align-center"><div class="preloader color-multi"  style="width: 100px; height: 100px"></div></div>');
	var HTML_1 = "";

	if(IDS == 0){
		var res = 0;
	}else{
		var str = IDS;
		var res = str.split("-");
	}	
	
	$.ajax({
		type: "GET",
		headers: {"Authorization": localStorage.getItem("LS_USER_API_KEY")},
		url: URL_SERVER+"listGrupos",
		dataType: 'json',
        statusCode: { 
            401: function (error) { 
                app.loginScreen.open('.ap-login-screen');
            } 
        },
		success: function (data){
			$.each(data.AlumnosGrupos, function(index, item) {
                HTML_1 += "<li>";
				HTML_1 += "<label class=\"item-radio item-content\">";
				HTML_1 += "<input type=\"radio\" id=\"grupoChecbox_"+item.id+"\" name=\"chkIdGupoCalendarGrupo\" value='"+item.id+"'/>";
				HTML_1 += "<i class=\"icon icon-radio\"></i>";
				HTML_1 += "<div class=\"item-inner\">";
				HTML_1 += "<div class=\"item-title-row\">";
				HTML_1 += "<div class=\"item-title\">"+item.name+"</div>";
				HTML_1 += "</div>";
				HTML_1 += "<div class=\"item-subtitle\">"+item.description+"</div>";
				HTML_1 += "</div>";
				HTML_1 += "</label>";
				HTML_1 += "</li>";
			}); 
			
			$(".ulMembersGroupsCheckbox").html(HTML_1);

			for (x=0; x < res.length; x++){
				$('#grupoChecbox_'+res[x]).prop('checked', true);
			}
        }
	});

	return false;
}

function getAlumnosCheckbox(IDGRUPO, IDS){ // ESTA FUNCION CARGA UN LISTADO DE ALUMNOS CON UN CHECBOX
	$('#ulMembersAlumnsCheckbox').html('<div class="block block-strong text-align-center"><div class="preloader color-multi"  style="width: 100px; height: 100px"></div></div>');
	var HTML_1 = "";
	
	$.ajax({
		type: "GET",
		headers: {"Authorization": localStorage.getItem("LS_USER_API_KEY")},
		url: URL_SERVER+"listAlumnos",
		dataType: 'json',
        statusCode: { 
            401: function (error) { 
                app.loginScreen.open('.ap-login-screen');
            } 
        },
		success: function (data){
            $.each(data.Alumnos, function(index, item) {
                HTML_1 += "<li>";
				HTML_1 += "<label class=\"item-checkbox item-content\">";
				HTML_1 += "<input type=\"checkbox\" id=\"alumnoChecbox_"+item.id+"\" name=\"chkIdUserCalendarGrupo[]\" value='"+item.id+"'/>";
				HTML_1 += "<i class=\"icon icon-checkbox\"></i>";
				HTML_1 += "<div class=\"item-media\" style=\"width:44px;height:44px;\"><img src=\"https://aulapadel.com/services/users/alumnos/"+item.id+".jpg\" onerror=\"this.src='images/logos/logo512.jpg'\" style=\"width:100%;height:100%;\"/></div>";
				HTML_1 += "<div class=\"item-inner\">";
				HTML_1 += "<div class=\"item-title-row\">";
				HTML_1 += "<div class=\"item-title\">"+item.name+"</div>";
				HTML_1 += "</div>";
				HTML_1 += "<div class=\"item-subtitle\">"+item.email+"</div>";
				HTML_1 += "</div>";
				HTML_1 += "</label>";
				HTML_1 += "</li>";
			});   
			
			$(".ulMembersAlumnsCheckbox").html(HTML_1);

			if(IDGRUPO == 0){
				if(IDS == 0){
					var res = 0;
				}else{
					var str = IDS;
					var res = str.split("-");
				}

				for (x=0; x < res.length; x++){
					$('.ulMembersAlumnsCheckbox #alumnoChecbox_'+res[x]).prop('checked', true);
				}
			}else{
				setCheckboxAlumnos(IDGRUPO);
			}
        }
	});
	
	return false;
}

function pushComiteTecnico(THIS){
	var IDALUMNO = $(THIS).attr("data-id");

	getAlumnosDetallesTecnicos(IDALUMNO); 
	getAlumnosDetallesTecnicosMejoras(IDALUMNO); 
	getAlumnosDetallesTecnicosObservaciones(IDALUMNO); 
	getAlumnosDetallesTecnicosOpiniones(IDALUMNO);
	app.sheet.open('.my_modal_comite_tecnico');
}

function getAlumnosDetallesTecnicos(IDALUMNO){
	$('#colsAlumnosDetallesTecnicos').html('<div class="block block-strong text-align-center"><div class="preloader color-multi"  style="width: 100px; height: 100px"></div></div>');
	var HTML_1 = "";
	
	$.ajax({
		type: "GET",
		headers: {"Authorization": localStorage.getItem("LS_USER_API_KEY")},
		url: URL_SERVER+"alumnoDetalleTecnico/"+IDALUMNO,
		dataType: 'json',
        statusCode: { 
            401: function (error) { 
                app.loginScreen.open('.ap-login-screen');
            } 
        },
		success: function (data){
            $.each(data.AlumnosDetalleTecnico, function(index, item) {
				HTML_1 += "<tr>";
				HTML_1 += "<td class=\"padding-left\">  "+item.golpes+"  </td>";
				HTML_1 += "<td class=\"\"> <input type=\"text\" data-id=\""+item.id+"\" data-tabla=\"ap_members_alumnos_detalles_tecnicos\" data-campo=\"preparacion\" value=\""+item.preparacion+"\" style=\"width: 50px;\" onkeyup=\"updateItemComiteTecnico(this);\" /> </td>";
				HTML_1 += "<td class=\"\"> <input type=\"text\" data-id=\""+item.id+"\" data-tabla=\"ap_members_alumnos_detalles_tecnicos\" data-campo=\"terminacion\" value=\""+item.terminacion+"\" style=\"width: 50px;\" onkeyup=\"updateItemComiteTecnico(this);\" /> </td>";
				HTML_1 += "<td class=\"\"> <input type=\"text\" data-id=\""+item.id+"\" data-tabla=\"ap_members_alumnos_detalles_tecnicos\" data-campo=\"puntos\" value=\""+item.puntos+"\" style=\"width: 50px;\" onkeyup=\"updateItemComiteTecnico(this);\" /> </td>";
				HTML_1 += "<td class=\"\"> <input type=\"text\" data-id=\""+item.id+"\" data-tabla=\"ap_members_alumnos_detalles_tecnicos\" data-campo=\"coordinacion\" value=\""+item.coordinacion+"\" style=\"width: 50px;\" onkeyup=\"updateItemComiteTecnico(this);\" /> </td>";
				HTML_1 += "</tr>";
			});   
			
			$("#colsAlumnosDetallesTecnicos").html(HTML_1);
			
        }
	});

	return false;
}

function getAlumnosDetallesTecnicosObservaciones(IDALUMNO){
	$('#colsAlumnosDetallesTecnicosObservaciones').html('<div class="block block-strong text-align-center"><div class="preloader color-multi"  style="width: 100px; height: 100px"></div></div>');
	var HTML_1 = "";
	
	$.ajax({
		type: "GET",
		headers: {"Authorization": localStorage.getItem("LS_USER_API_KEY")},
		url: URL_SERVER+"alumnoDetalleTecnicoObservaciones/"+IDALUMNO,
		dataType: 'json',
        statusCode: { 
            401: function (error) { 
                app.loginScreen.open('.ap-login-screen');
            } 
        },
		success: function (data){
            $.each(data.AlumnosDetalleTecnicoObservaciones, function(index, item) {
				HTML_1 += "<tr>";
				HTML_1 += "<td class=\"padding-left\"> "+item.detalles+" </td>";
				HTML_1 += "<td class=\"\">  <input type=\"text\" data-id=\""+item.id+"\" data-tabla=\"ap_members_alumnos_detalles_tecnicos_comportamiento\" data-campo=\"observaciones\" value=\""+item.observaciones+"\" style=\"width: 100%;\" onkeyup=\"updateItemComiteTecnico(this);\" /> </td>";
				HTML_1 += "</tr>";
			});   
			
			$("#colsAlumnosDetallesTecnicosObservaciones").html(HTML_1);
			
        }
	});

	return false;
}

function getAlumnosDetallesTecnicosOpiniones(IDALUMNO){
	$('#colsAlumnosDetallesTecnicosValoracionesEntrenador').html('<div class="block block-strong text-align-center"><div class="preloader color-multi"  style="width: 100px; height: 100px"></div></div>');
	$('#colsAlumnosDetallesTecnicosValoracionesAlumno').html('<div class="block block-strong text-align-center"><div class="preloader color-multi"  style="width: 100px; height: 100px"></div></div>');

	var HTML_1 = "";
	var HTML_2 = "";
	
	$.ajax({
		type: "GET",
		headers: {"Authorization": localStorage.getItem("LS_USER_API_KEY")},
		url: URL_SERVER+"alumnoDetalleTecnicoOpiniones/"+IDALUMNO,
		dataType: 'json',
        statusCode: { 
            401: function (error) { 
                app.loginScreen.open('.ap-login-screen');
            } 
        },
		success: function (data){
            $.each(data.AlumnosDetalleTecnicoOpiniones, function(index, item) {
				HTML_1 += "<textarea data-id=\""+item.id+"\" data-tabla=\"ap_members_alumnos_detalles_tecnicos_opiniones\" data-campo=\"tutor\" style=\"width: 100%;padding: 10px;\" onkeyup=\"updateItemComiteTecnico(this);\"> "+item.tutor+" </textarea>";
				HTML_2 += "<textarea data-id=\""+item.id+"\" data-tabla=\"ap_members_alumnos_detalles_tecnicos_opiniones\" data-campo=\"entrenador\" style=\"width: 100%;padding: 10px;\" onkeyup=\"updateItemComiteTecnico(this);\"> "+item.entrenador+" </textarea>";
				
			});   

			$("#colsAlumnosDetallesTecnicosValoracionesEntrenador").html(HTML_2);
			$("#colsAlumnosDetallesTecnicosValoracionesAlumno").html(HTML_1);
			
        }
	});

	return false;
}

function getAlumnosDetallesTecnicosMejoras(IDALUMNO){
	$('#colsAlumnosDetallesTecnicosMejorasAlumno').html('<div class="block block-strong text-align-center"><div class="preloader color-multi"  style="width: 100px; height: 100px"></div></div>');
	var HTML_1 = "";
	
	$.ajax({
		type: "GET",
		headers: {"Authorization": localStorage.getItem("LS_USER_API_KEY")},
		url: URL_SERVER+"alumnoDetalleTecnicoMejoras/"+IDALUMNO,
		dataType: 'json',
        statusCode: { 
            401: function (error) { 
                app.loginScreen.open('.ap-login-screen');
            } 
        },
		success: function (data){
            $.each(data.AlumnosDetalleTecnicoMejoras, function(index, item) {
				HTML_1 += "<tr>";
				HTML_1 += "<td class=\"padding-left\"> <input type=\"text\" data-id=\""+item.id+"\" data-tabla=\"ap_members_alumnos_detalles_tecnicos_mejoras\" data-campo=\"mensuales\" value=\""+item.mensuales+"\" style=\"width: 50px;\" onkeyup=\"updateItemComiteTecnico(this);\" /> </td>";
				HTML_1 += "<td class=\"\"> <input type=\"text\" data-id=\""+item.id+"\" data-tabla=\"ap_members_alumnos_detalles_tecnicos_mejoras\" data-campo=\"trimestrales\" value=\""+item.trimestrales+"\" style=\"width: 50px;\" onkeyup=\"updateItemComiteTecnico(this);\" /> </td>";
				HTML_1 += "</tr>";
			});   
			
			$("#colsAlumnosDetallesTecnicosMejorasAlumno").html(HTML_1);
        }
	});

	return false;
}

function getGrupos(){
	app.fab.close('.fab');
	$('.txtCalendarGrupo').html('');
	var HTML_1 ="<option> </option>";
	
	$.ajax({
		type: "GET",
		headers: {"Authorization": localStorage.getItem("LS_USER_API_KEY")},
		url: URL_SERVER+"listGrupos",
		dataType: 'json',
        statusCode: { 
            401: function (error) { 
                app.loginScreen.open('.ap-login-screen');
            } 
        },
		success: function (data){
            $.each(data.AlumnosGrupos, function(index, item) {
                HTML_1 += '<option value="'+item.id+'">'+item.name+'</option>';
			});   
			
			$(".txtCalendarGrupo").html(HTML_1);
        }
	});
	
	return false;
}

function getCentroEntrenamiento(){
	app.fab.close('.fab');
	$('#txtCentroEntrenamiento').html('');
	var HTML_1 ="";
	
	$.ajax({
		type: "GET",
		headers: {"Authorization": localStorage.getItem("LS_USER_API_KEY")},
		url: URL_SERVER+"comboCentroEntrenamiento",
		dataType: 'json',
        statusCode: { 
            401: function (error) { 
                app.loginScreen.open('.ap-login-screen');
            } 
        },
		success: function (data){
            $.each(data.CentroEntrenamiento, function(index, item) {
                HTML_1 += '<option value="'+item.cod+'">Semana '+item.semana+" | "+item.item+'</option>';
			});   
			
			$("#txtCentroEntrenamiento").html(HTML_1);
			
        }
	});
	
	return false;
}

function getItemsCalendar(DIA, MES, ANO){

	$('#contentCalendar').html('<div class="block block-strong text-align-center"><div class="preloader color-multi"  style="width: 100px; height: 100px"></div></div>');

	var startDate = new Date(ANO, MES-1, DIA);
	var endDate   = new Date();  
	var nDays     = diffDays(startDate, endDate);
	var posNum    = (nDays < 0) ? nDays * -1 : -nDays;

	$.ajax({
		type: "GET",
		headers: {"Authorization": localStorage.getItem("LS_USER_API_KEY")},
		url: URL_SERVER+"itemsCalendar/"+DIA+"/"+MES+"/"+ANO,
		dataType: 'json',
        statusCode: { 
            401: function (error) { 
                app.loginScreen.open('.ap-login-screen');
            } 
        },
		success: function (data){
			$('#contentCalendar').html('');
			var $hcal = $('#contentCalendar').hcal(posNum);
            $.each(data.itemsCalendar, function(index, item) {
				$hcal.addHcalAppointment(item.h_dia, item.h_duracion, item.name, 'Nivel: '+item.titulo, item.nota, item.color, item.id);
			});   
        }
	}).always(function() {
		
	});

	var MES0 = MES < 10 ? "0"+MES : MES;
	var DIA0 = DIA < 10 ? "0"+DIA : DIA;
	localStorage.setItem("LS_NUM_HEADER_CALENDAR", 0);
	localStorage.setItem("LS_FECHA_CALENDAR", DIA+"/"+MES0+"/"+ANO);
}

function getCalendarItem(ID){
	$('#ulMembersGroupsAlumns').html('<div class="block block-strong text-align-center"><div class="preloader color-multi" style="width: 100px; height: 100px"></div></div>');
	getGrupos();
	var HTML_1 = "";

	$.ajax({
		type: "GET",
		headers: {"Authorization": localStorage.getItem("LS_USER_API_KEY")},
		url: URL_SERVER+"calendar/"+ID,
		dataType: 'json',
        statusCode: { 
            401: function (error) { 
                app.loginScreen.open('.ap-login-screen');
            } 
        },
		success: function (data){
            $.each(data.itemCalendar, function(index, item) {

				$('.txtCalendarGrupo  option[value="'+item.idGrupo+'"]').prop("selected", true);
				$('#txtGrupoNotas').val(item.nota);

				$.ajax({
					type: "GET",
					headers: {"Authorization": localStorage.getItem("LS_USER_API_KEY")},
					url: URL_SERVER+"listAlumnos/"+item.idGrupo,
					dataType: 'json',
					statusCode: { 
						401: function (error) { 
							app.loginScreen.open('.ap-login-screen');
						} 
					},
					success: function (data){
						$.each(data.Alumnos, function(index, item) {
							HTML_1 += "<li onclick=\"getAlumnosDetallesTecnicos("+item.id+"); getAlumnosDetallesTecnicosMejoras("+item.id+"); getAlumnosDetallesTecnicosObservaciones("+item.id+"); app.tab.show('#tab-7'); app.sheet.close('.my_modal_grupo_list');\">";
							HTML_1 += "<a href=\"#\" class=\"item-link item-content\">";
							HTML_1 += "<div class=\"item-media\"><img src=\"https://aulapadel.com/services/users/alumnos/"+item.id+".jpg\" onerror=\"this.src='images/logos/logo512.jpg'\" width=\"44\"/></div>";
							HTML_1 += "<div class=\"item-inner\">";
							HTML_1 += "<div class=\"item-title-row\">";
							HTML_1 += "<div class=\"item-title\">"+item.name+"</div>";
							HTML_1 += "</div>";
							HTML_1 += "<div class=\"item-subtitle\">"+item.grupo+"</div>";
							HTML_1 += "</div>";
							HTML_1 += "</a>";
							HTML_1 += "</li>";
						});   
						
						$("#ulMembersGroupsAlumns").html(HTML_1);
						
					}
				});

			});   
        }
	});
	

	app.sheet.open(".my_modal_grupo_list");

	return false;
}

function getAlumnosGrupos(IDGRUPO){
	var HTML_1 = "";
	$('.ulMembersAlumnsGroup').html('<div class="block block-strong text-align-center"><div class="preloader color-multi" style="width: 100px; height: 100px"></div></div>');
	
	$.ajax({
		type: "GET",
		headers: {"Authorization": localStorage.getItem("LS_USER_API_KEY")},
		url: URL_SERVER+"listAlumnos/"+IDGRUPO,
		dataType: 'json',
		statusCode: { 
			401: function (error) { 
				app.loginScreen.open('.ap-login-screen');
			} 
		},
		success: function (data){
			HTML_1 = "<div class=\"card\">";	
			//HTML_1 += "<div class=\"card-header\">"+NOMBRE+"</div>";
			HTML_1 += "<div class=\"card-content card-content-padding\">";
			HTML_1 += "<div class=\"row\">";

			$.each(data.Alumnos, function(index, item) {
				HTML_1 += "<div class=\"col-25 text-align-center\" onclick=\"readFormAlumno("+item.id+"); app.sheet.open('.my_modal_info_alumnos');\">";
				HTML_1 += "<img src=\"https://aulapadel.com/services/users/alumnos/"+item.id+".jpg\" class=\"circle\" onerror=\"this.src='images/logos/logo512.jpg'\"/><p class=\"circle_p\">"+item.name+"</p>";
				HTML_1 += "</div>";	
			});  
			
			HTML_1 += "</div>";
			HTML_1 += "</div>";	
			HTML_1 += "</div>";
			
			$(".ulMembersAlumnsGroup").html(HTML_1);
		}
	});
}

function openGrupoForm(ID){
	getOneGrupo(ID);
	getGrupos(); 
	getAlumnosCheckbox();
	app.sheet.open(".my_model_grupos");

	return false;
}

function changeColorHeaderCalendar(THIS){
	$(".hcal-header-date-inner").removeClass("active");
	$(THIS).addClass("active");

	return false;
}

function openAlertVideo(){
	app.dialog.alert( localStorage.getItem('LS_DETAILS_PLAY'), localStorage.getItem('LS_TITLE_PLAY') );
	return false;
}

function getCalendarMes(){
	var EVENTOS = [];
	$("#divCalendarMes").html("");
	$.ajax({
		type: "GET",
		headers: {"Authorization": localStorage.getItem("LS_USER_API_KEY")},
		url: URL_SERVER+"calendarMes",
		dataType: 'json',
        statusCode: { 
            401: function (error) { 
                app.loginScreen.open('.ap-login-screen');
            } 
        },
		success: function (data){
			$.each(data.CalendarMes, function(index, item) {
				EVENTOS.push( new Date(item.ano, item.mes, item.dia) );
			}); 

			$("#divCalendarMes").html('<div id="ap-calendar-inline-container"></div>');
			calendarInline = app.calendar.create({
				containerEl: '#ap-calendar-inline-container',
				events: ' ',
				value: EVENTOS,
				weekHeader: true,
				dayNamesShort: dayNamesShort,
				renderToolbar: function () {
					return '<div class="toolbar calendar-custom-toolbar no-shadow">' +
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
						Dom7('.calendar-custom-toolbar .center').text(monthNames[c.currentMonth] +', ' + c.currentYear);
						Dom7('.calendar-custom-toolbar .left .link').on('click', function () {
							calendarInline.prevMonth();
						});
						Dom7('.calendar-custom-toolbar .right .link').on('click', function () {
							calendarInline.nextMonth();
						});
					},
					monthYearChangeStart: function (c) {
						Dom7('.calendar-custom-toolbar .center').text(monthNames[c.currentMonth] +', ' + c.currentYear);
					},
					dayClick: function(calendar, dayEl, year, month, day) {
						getItemsCalendar(day, month+1, year);
						app.tab.show("#tab-1");
					}
				}
			});
        }
	}).always(function() {
		
	});

	return false;
}

function getCalendarSemana(){ // ESTA FUNCION CARGA TODOS LOS EVENTOS DEL MES EN EL CALENDARIO DE SEMANA
	var EVENTOS = [];
	$.ajax({
		type: "GET",
		headers: {"Authorization": localStorage.getItem("LS_USER_API_KEY")},
		url: URL_SERVER+"calendarMes",
		dataType: 'json',
        statusCode: { 
            401: function (error) { 
                app.loginScreen.open('.ap-login-screen');
            } 
        },
		success: function (data){
			$.each(data.CalendarMes, function(index, item) {
				var MES0 = item.mes1; 
				var MES1 = MES0 < 10 ? "0"+MES0 : MES0;

				var DIA0 = item.dia;
				var DIA1 = DIA0 < 10 ? "0"+DIA0 : DIA0;
				$("#tdCalendarSemanal_"+MES1+"_"+item.hora+"_"+DIA1).html( '<div class="event double color0'+item.color+'" data-id="'+item.id+'" onclick="openFormEvent('+item.id+');"><input id="check" type="checkbox" class="checkbox" /><label for="check"></label>'+item.name+'</div>' );
				$("#tdCalendarSemanal_"+MES1+"_"+item.hora+"_"+DIA1).removeClass("ap-add-calendar").addClass("ap-calendar");
				$("#tdCalendarSemanal_"+MES1+"_"+item.hora+"_"+DIA1).attr("data-id", item.id);
			
			}); 
        }
	});
}

function getCalendarMesTime(){
	var EVENTOS = [];
	$.ajax({
		type: "GET",
		headers: {"Authorization": localStorage.getItem("LS_USER_API_KEY")},
		url: URL_SERVER+"calendarMesTime",
		dataType: 'json',
        statusCode: { 
            401: function (error) { 
                app.loginScreen.open('.ap-login-screen');
            } 
        },
		success: function (data){
			$.each(data.CalendarMes, function(index, item) {
				EVENTOS.push( new Date(item.ano, item.mes, item.dia) );
			}); 

			calendarInline.setValue(EVENTOS);
			calendarInline.update();
        }
	});

	return false;
}

function setColorBox1(IDCOLOR){ // ESTA FUNCION AGREGA EL COLOR SELECIONADO O EN LA BASE DE DATOS
	var COLORX = "#007aff";

	if(IDCOLOR == 1){COLORX = "#ff3b30"; COLORNAM = "Rojo";}
	if(IDCOLOR == 2){COLORX = "#4cd964"; COLORNAM = "Verde";}
	if(IDCOLOR == 3){COLORX = "#2196f3"; COLORNAM = "Azul";}
	if(IDCOLOR == 4){COLORX = "#ff2d55"; COLORNAM = "Rosado";}
	if(IDCOLOR == 5){COLORX = "#ffcc00"; COLORNAM = "Amarillo";}
	if(IDCOLOR == 6){COLORX = "#ff9500"; COLORNAM = "Naranja";}
	if(IDCOLOR == 7){COLORX = "#9c27b0"; COLORNAM = "Purpura";}
	if(IDCOLOR == 8){COLORX = "#673ab7"; COLORNAM = "Purpura fuerte";}
	if(IDCOLOR == 9){COLORX = "#009688"; COLORNAM = "Teal";}
	if(IDCOLOR == 10){COLORX = "#cddc39"; COLORNAM = "Lima";}
	if(IDCOLOR == 11){COLORX = "#ff6b22"; COLORNAM = "Naranja fuerte";}
	if(IDCOLOR == 12){COLORX = "#8e8e93"; COLORNAM = "Gris";}
	if(IDCOLOR == 13){COLORX = "#ffffff"; COLORNAM = "Blanco";}
	if(IDCOLOR == 14){COLORX = "#000000"; COLORNAM = "Negro";}
	if(IDCOLOR == 15){COLORX = "#5ac8fa"; COLORNAM = "Azul suave";} 

	$(".box-calendar1").css("background-color", COLORX);
	$(".box-calendar1_label").html(COLORNAM);
}

function initSemana(){ // ESTA FUNCION INICIALIZA EL CALENDARIO Y LOS EVENTOS DE LA SEMANA
	setHeaderSemana();
	setBodySemana();
}

function comboNivelCalendar(NIVEL){
	$('.txtCalendarNivel').html('');
	var HTML_1 ="<option value=''>Seleccionar...</option>";
	
	$.ajax({
		type: "GET",
		headers: {"Authorization": localStorage.getItem("LS_USER_API_KEY")},
		url: URL_SERVER+"nivel",
		dataType: 'json',
        statusCode: { 
            401: function (error) { 
                app.loginScreen.open('.ap-login-screen');
            } 
        },
		success: function (data){
            $.each(data.itemNivel, function(index, item) {
                HTML_1 += '<option value="'+item.id+'">'+item.titulo+'</option>';
			});   
			
			$(".txtCalendarNivel").html(HTML_1);
			$('.txtCalendarNivel option[value="'+NIVEL+'"]').attr("selected", "selected");
        }
	});
	
	return false;
}

function comboPlanificacionCalendar(ID, IDPLANIFICACION){
	$('.txtCentroEntrenamiento').html('');
	var HTML_1 ="";
	var IDs = ID == 9 ? 3 : ID;
	$.ajax({
		type: "GET",
		headers: {"Authorization": localStorage.getItem("LS_USER_API_KEY")},
		// url: URL_SERVER+"planificacion/"+IDs+"/1",
		url: URL_SERVER+"nivelesEventos/"+IDs,
		dataType: 'json',
		success: function (data){
			HTML_1 += '<option value="">Seleccionar...</option>';
			$.each(data.PLANIFICACION, function(index, item) {
                HTML_1 += '<option value="'+item.id+'">Semana '+item.id_semana+" | "+item.titulo+'</option>';
			});   
			
			$(".txtCentroEntrenamiento").html(HTML_1);
			$('.txtCentroEntrenamiento option[value="'+IDPLANIFICACION+'"]').attr("selected", "selected");
		}
	});

	return false;
}

function loadComboPlanificacion(THIS){
	var val = $(THIS).val();
	var text = $(THIS).find("option:selected").text(); //only time the find is required
	var name = $(THIS).attr('name');

	comboPlanificacionCalendar(val);

	return false;
}

// AULAPADEL CALENDAR SEMANA
function setHeaderSemana(){ // ESTA FUNCION CREA LA CABECERA DEL CALENDARIO DE LA SEMANA EN EL DIA DE HOY
	var d = getMonday(new Date());
	 
	var th_Header = $("#trHeaderSemana");
	var HEADER = '';

	for (var i = 0; i < DAYS_SMN.length; i++) {
		var DIAS_NUM = 0 + parseInt(i);
			dd = new Date(d.getFullYear(), d.getMonth(), d.getDate() + DIAS_NUM);
		var DIA = dd.getDate();

		if(i == DAYS_SMN.length -1){var TH_CSS = 'class="secondary"';}
		if(i == DAYS_SMN.length -2){var TH_CSS = 'class="secondary"';}

		HEADER += '<th '+TH_CSS+'>'+DAYS_SMN[i]+' <br> '+DIA+'</td>';
	}

	th_Header.html( '<th class="headcol"></th>' + HEADER );
	localStorage.setItem("LS_INIT_DAY", 0);
	$("#tableCalendarMesName").html(month[d.getMonth()]);
}

function setHeaderSemanaOther(DIAS){ // ESTA FUNCIN CREA LA CABECERA DE LA SEMANA PASANDOLE EL NUMERO DE LOS DIAS
	var NUMDIAS = parseInt(localStorage.getItem("LS_INIT_DAY")) + DIAS;
	var d = getMonday(new Date());
	 
	var th_Header = $("#trHeaderSemana");
	var HEADER = '';

	for (var i = 0; i < DAYS_SMN.length; i++) {
		var DIAS_NUM = parseInt(NUMDIAS) + parseInt(i);
			dd = new Date(d.getFullYear(), d.getMonth(), d.getDate() + DIAS_NUM);
		var DIA = dd.getDate();

		if(i == DAYS_SMN.length -1){var TH_CSS = 'class="secondary"';}
		if(i == DAYS_SMN.length -2){var TH_CSS = 'class="secondary"';}

		HEADER += '<th '+TH_CSS+'>'+DAYS_SMN[i]+' <br> '+DIA+'</td>';
	}

	th_Header.html( '<th class="headcol"></th>' + HEADER );
	localStorage.setItem("LS_INIT_DAY", NUMDIAS);
	setBodySemanaOther(NUMDIAS);
	$("#tableCalendarMesName").html(month[dd.getMonth()]);
}

function setBodySemana(){ // ESTA FUNCION CREA EL CUERPO DEL CALEDARIO DE SEMANA DEL DIA DE HOY
	$('#trBodySemana').html('<div class="block block-strong text-align-center"><div class="preloader color-multi"  style="width: 100px; height: 100px"></div></div>');
	var FECHA_L, FECHA_M, FECHA_X, FECHA_J, FECHA_V, FECHA_S, FECHA_D;

	var d = getMonday(new Date());
	var LUNES     = new Date(d.getFullYear(), d.getMonth(), d.getDate()+0);
	var MARTES    = new Date(d.getFullYear(), d.getMonth(), d.getDate()+1);
	var MIERCOLES = new Date(d.getFullYear(), d.getMonth(), d.getDate()+2);
	var JUEVES    = new Date(d.getFullYear(), d.getMonth(), d.getDate()+3);
	var VIERNES   = new Date(d.getFullYear(), d.getMonth(), d.getDate()+4);
	var SABADO    = new Date(d.getFullYear(), d.getMonth(), d.getDate()+5);
	var DOMINGO   = new Date(d.getFullYear(), d.getMonth(), d.getDate()+6);

		DIA_L = (LUNES.getDate() < 10) ? "0"+LUNES.getDate() : LUNES.getDate();
		MES_L = (parseInt(LUNES.getMonth()+1) < 10) ? "0"+parseInt(LUNES.getMonth()+1) : parseInt(LUNES.getMonth()+1);
		ANO_L = LUNES.getFullYear();
		FECHA_L = DIA_L+"/"+MES_L+"/"+ANO_L;

		DIA_M = (MARTES.getDate() < 10) ? "0"+MARTES.getDate() : MARTES.getDate();
		MES_M = (parseInt(MARTES.getMonth()+1) < 10) ? "0"+parseInt(MARTES.getMonth()+1): parseInt(MARTES.getMonth()+1);
		ANO_M = MARTES.getFullYear();
		FECHA_M = DIA_M+"/"+MES_M+"/"+ANO_M;

		DIA_X = (MIERCOLES.getDate() < 10) ? "0"+MIERCOLES.getDate() : MIERCOLES.getDate();
		MES_X = (parseInt(MIERCOLES.getMonth()+1) < 10) ? "0"+parseInt(MIERCOLES.getMonth()+1) : parseInt(MIERCOLES.getMonth()+1);
		ANO_X = MIERCOLES.getFullYear();
		FECHA_X = DIA_X+"/"+MES_X+"/"+ANO_X;

		DIA_J = (JUEVES.getDate() < 10) ? "0"+JUEVES.getDate() : JUEVES.getDate();
		MES_J = (parseInt(JUEVES.getMonth()+1) < 10) ? "0"+parseInt(JUEVES.getMonth()+1) : parseInt(JUEVES.getMonth()+1);
		ANO_J = JUEVES.getFullYear();
		FECHA_J = DIA_J+"/"+MES_J+"/"+ANO_J;

		DIA_V = (VIERNES.getDate() < 10) ? "0"+VIERNES.getDate() : VIERNES.getDate();
		MES_V = (parseInt(VIERNES.getMonth()+1) < 10) ? "0"+parseInt(VIERNES.getMonth()+1) : parseInt(VIERNES.getMonth()+1);
		ANO_V = VIERNES.getFullYear();
		FECHA_V = DIA_V+"/"+MES_V+"/"+ANO_V;

		DIA_S = (SABADO.getDate() < 10) ? "0"+SABADO.getDate() : SABADO.getDate();
		MES_S = (parseInt(SABADO.getMonth()+1) < 10) ? "0"+parseInt(SABADO.getMonth()+1) : parseInt(SABADO.getMonth()+1);
		ANO_S = SABADO.getFullYear();
		FECHA_S = DIA_S+"/"+MES_S+"/"+ANO_S;

		DIA_D = (DOMINGO.getDate() < 10) ? "0"+DOMINGO.getDate() : DOMINGO.getDate();
		MES_D = (parseInt(DOMINGO.getMonth()+1) < 10) ? "0"+parseInt(DOMINGO.getMonth()+1) : parseInt(DOMINGO.getMonth()+1);
		ANO_D = DOMINGO.getFullYear();
		FECHA_D = DIA_D+"/"+MES_D+"/"+ANO_D;
		

	var tr_body = $("#trBodySemana");
	var LINE = '';

	for(var i=8; i<=24; i++){
		var ii = i - 8;

		LINE += '<tr>';
		LINE += '<td class="headcol">'+i+':00</td>';
		LINE += "<td id=\"tdCalendarSemanal_"+MES_L+"_"+i+"_"+DIA_L+"\" class=\"ap-add-calendar\" data-hora=\""+i+"\" onclick=\"openFormEventByType(this, '"+i+"', '"+FECHA_L+"');\"></td>";
		LINE += "<td id=\"tdCalendarSemanal_"+MES_M+"_"+i+"_"+DIA_M+"\" class=\"ap-add-calendar\" data-hora=\""+i+"\" onclick=\"openFormEventByType(this, '"+i+"', '"+FECHA_M+"');\"></td>";
		LINE += "<td id=\"tdCalendarSemanal_"+MES_X+"_"+i+"_"+DIA_X+"\" class=\"ap-add-calendar\" data-hora=\""+i+"\" onclick=\"openFormEventByType(this, '"+i+"', '"+FECHA_X+"');\"></td>";
		LINE += "<td id=\"tdCalendarSemanal_"+MES_J+"_"+i+"_"+DIA_J+"\" class=\"ap-add-calendar\" data-hora=\""+i+"\" onclick=\"openFormEventByType(this, '"+i+"', '"+FECHA_J+"');\"></td>";
		LINE += "<td id=\"tdCalendarSemanal_"+MES_V+"_"+i+"_"+DIA_V+"\" class=\"ap-add-calendar\" data-hora=\""+i+"\" onclick=\"openFormEventByType(this, '"+i+"', '"+FECHA_V+"');\"></td>";
		LINE += "<td id=\"tdCalendarSemanal_"+MES_S+"_"+i+"_"+DIA_S+"\" class=\"ap-add-calendar\" data-hora=\""+i+"\" onclick=\"openFormEventByType(this, '"+i+"', '"+FECHA_S+"');\"></td>";
		LINE += "<td id=\"tdCalendarSemanal_"+MES_D+"_"+i+"_"+DIA_D+"\" class=\"ap-add-calendar\" data-hora=\""+i+"\" onclick=\"openFormEventByType(this, '"+i+"', '"+FECHA_D+"');\"></td>";
		LINE += '</tr>';
	}

	tr_body.html(LINE); 

	getCalendarSemana();
}

function setBodySemanaOther(DIAS){ // ESTA FUNCION CREA EL CUERPO DEL CALENDARIO DE LA SEMANA PASANDO LOS DIA DESDE DONDE MOSTRAR
	$('#trBodySemana').html('<div class="block block-strong text-align-center"><div class="preloader color-multi"  style="width: 100px; height: 100px"></div></div>');
	var FECHA_L, FECHA_M, FECHA_X, FECHA_J, FECHA_V, FECHA_S, FECHA_D;

	var d         = getMonday(new Date());
	var LUNES     = new Date(d.getFullYear(), d.getMonth(), d.getDate()+DIAS+0);
	var MARTES    = new Date(d.getFullYear(), d.getMonth(), d.getDate()+DIAS+1);
	var MIERCOLES = new Date(d.getFullYear(), d.getMonth(), d.getDate()+DIAS+2);
	var JUEVES    = new Date(d.getFullYear(), d.getMonth(), d.getDate()+DIAS+3);
	var VIERNES   = new Date(d.getFullYear(), d.getMonth(), d.getDate()+DIAS+4);
	var SABADO    = new Date(d.getFullYear(), d.getMonth(), d.getDate()+DIAS+5);
	var DOMINGO   = new Date(d.getFullYear(), d.getMonth(), d.getDate()+DIAS+6);

		DIA_L = (LUNES.getDate() < 10) ? "0"+LUNES.getDate() : LUNES.getDate();
		MES_L = (parseInt(LUNES.getMonth()+1) < 10) ? "0"+parseInt(LUNES.getMonth()+1) : parseInt(LUNES.getMonth()+1);
		ANO_L = LUNES.getFullYear();
		FECHA_L = DIA_L+"/"+MES_L+"/"+ANO_L;

		DIA_M = (MARTES.getDate() < 10) ? "0"+MARTES.getDate() : MARTES.getDate();
		MES_M = (parseInt(MARTES.getMonth()+1) < 10) ? "0"+parseInt(MARTES.getMonth()+1): parseInt(MARTES.getMonth()+1);
		ANO_M = MARTES.getFullYear();
		FECHA_M = DIA_M+"/"+MES_M+"/"+ANO_M;

		DIA_X = (MIERCOLES.getDate() < 10) ? "0"+MIERCOLES.getDate() : MIERCOLES.getDate();
		MES_X = (parseInt(MIERCOLES.getMonth()+1) < 10) ? "0"+parseInt(MIERCOLES.getMonth()+1) : parseInt(MIERCOLES.getMonth()+1);
		ANO_X = MIERCOLES.getFullYear();
		FECHA_X = DIA_X+"/"+MES_X+"/"+ANO_X;

		DIA_J = (JUEVES.getDate() < 10) ? "0"+JUEVES.getDate() : JUEVES.getDate();
		MES_J = (parseInt(JUEVES.getMonth()+1) < 10) ? "0"+parseInt(JUEVES.getMonth()+1) : parseInt(JUEVES.getMonth()+1);
		ANO_J = JUEVES.getFullYear();
		FECHA_J = DIA_J+"/"+MES_J+"/"+ANO_J;

		DIA_V = (VIERNES.getDate() < 10) ? "0"+VIERNES.getDate() : VIERNES.getDate();
		MES_V = (parseInt(VIERNES.getMonth()+1) < 10) ? "0"+parseInt(VIERNES.getMonth()+1) : parseInt(VIERNES.getMonth()+1);
		ANO_V = VIERNES.getFullYear();
		FECHA_V = DIA_V+"/"+MES_V+"/"+ANO_V;

		DIA_S = (SABADO.getDate() < 10) ? "0"+SABADO.getDate() : SABADO.getDate();
		MES_S = (parseInt(SABADO.getMonth()+1) < 10) ? "0"+parseInt(SABADO.getMonth()+1) : parseInt(SABADO.getMonth()+1);
		ANO_S = SABADO.getFullYear();
		FECHA_S = DIA_S+"/"+MES_S+"/"+ANO_S;

		DIA_D = (DOMINGO.getDate() < 10) ? "0"+DOMINGO.getDate() : DOMINGO.getDate();
		MES_D = (parseInt(DOMINGO.getMonth()+1) < 10) ? "0"+parseInt(DOMINGO.getMonth()+1) : parseInt(DOMINGO.getMonth()+1);
		ANO_D = DOMINGO.getFullYear();
		FECHA_D = DIA_D+"/"+MES_D+"/"+ANO_D;
		

	var tr_body = $("#trBodySemana");
	var LINE = '';

	for(var i=8; i<=24; i++){
		var ii = i - 8;

		LINE += '<tr>';
		LINE += '<td class="headcol">'+i+':00</td>';
		LINE += "<td id=\"tdCalendarSemanal_"+MES_L+"_"+i+"_"+DIA_L+"\" class=\"ap-add-calendar\" data-hora=\""+i+"\" onclick=\"openFormEventByType(this, '"+i+"', '"+FECHA_L+"');\"></td>";
		LINE += "<td id=\"tdCalendarSemanal_"+MES_M+"_"+i+"_"+DIA_M+"\" class=\"ap-add-calendar\" data-hora=\""+i+"\" onclick=\"openFormEventByType(this, '"+i+"', '"+FECHA_M+"');\"></td>";
		LINE += "<td id=\"tdCalendarSemanal_"+MES_X+"_"+i+"_"+DIA_X+"\" class=\"ap-add-calendar\" data-hora=\""+i+"\" onclick=\"openFormEventByType(this, '"+i+"', '"+FECHA_X+"');\"></td>";
		LINE += "<td id=\"tdCalendarSemanal_"+MES_J+"_"+i+"_"+DIA_J+"\" class=\"ap-add-calendar\" data-hora=\""+i+"\" onclick=\"openFormEventByType(this, '"+i+"', '"+FECHA_J+"');\"></td>";
		LINE += "<td id=\"tdCalendarSemanal_"+MES_V+"_"+i+"_"+DIA_V+"\" class=\"ap-add-calendar\" data-hora=\""+i+"\" onclick=\"openFormEventByType(this, '"+i+"', '"+FECHA_V+"');\"></td>";
		LINE += "<td id=\"tdCalendarSemanal_"+MES_S+"_"+i+"_"+DIA_S+"\" class=\"ap-add-calendar\" data-hora=\""+i+"\" onclick=\"openFormEventByType(this, '"+i+"', '"+FECHA_S+"');\"></td>";
		LINE += "<td id=\"tdCalendarSemanal_"+MES_D+"_"+i+"_"+DIA_D+"\" class=\"ap-add-calendar\" data-hora=\""+i+"\" onclick=\"openFormEventByType(this, '"+i+"', '"+FECHA_D+"');\"></td>";
		LINE += '</tr>';
	}

	tr_body.html(LINE); 

	getCalendarSemana();
}

function getAgendaToPlanificacion(IDPLANIFICACION){
	var TRIMESTRE = 1;
	loadMenuPlanificacion(IDPLANIFICACION, TRIMESTRE);
	app.sheet.open('.my_modal_planificacion');
}

function setLS_Fecha_Calendar(FECHA){ localStorage.setItem("LS_FECHA_CALENDAR", FECHA); }

function getMonday( date ) {
    var day = date.getDay() || 7;  
    if( day !== 1 ) 
        date.setHours(-24 * (day - 1)); 
    return date;
}

function diffDays(d1, d2){
	var ndays;
	var tv1 = d1.valueOf();  // msec since 1970
	var tv2 = d2.valueOf();
  
	ndays = (tv2 - tv1) / 1000 / 86400;
	ndays = Math.round(ndays - 0.5);
	return ndays;
}



function loadAlumnosGruposByCalendar(THIS, ID, IDS){
	$(".btnAlumnosGruposCalendar").removeClass("tab-link-active");
	$(THIS).addClass("tab-link-active");

	if(ID == 1){
		$("#divAlumnosCk").show();
		$("#divGruposCk").hide();
		getAlumnosCheckbox(0, IDS);
		$(".ulMembersGroupsCheckbox").html("");
		$("#txtCalendarTipo").val("ALUMNO");
	}else{
		$("#divGruposCk").show();
		$("#divAlumnosCk").hide();
		getGruposCheckbox(IDS);
		$(".ulMembersAlumnsCheckbox").html("");
		$("#txtCalendarTipo").val("GRUPO");
	}
}

function setDateCalendarRepetir(THIS){
	var FECHA = $(THIS).val();
	$("#txtCalendarFechaRepetir").val(FECHA);
}

function initRepetirForm(){
	var VALOR = $("#txtRepetirCalendar").val();

	if(VALOR == 0){
		Dom7('.chkRepetirCalendar1').prop('checked', false);
		Dom7('.chkRepetirCalendar2').prop('checked', false);
		Dom7('.chkRepetirCalendar3').prop('checked', false);

		$("input:checkbox[name=txtRepetirCalendarDia]").prop('disabled', true);
		$("input:checkbox[name=txtRepetirCalendarDia]").prop('checked', false);
		$("#txtDiaCalendarRepetir").val(0);
		$("#txtRepetirCalendar").val(0);
	}
}

function initFormCalendar(){
	$("#lblTextoRepetir").html("Repetir");
	$("#txtCalendarDateEvent").html("");
	$("#txtCalendarTipo").val("GRUPO");
	$("#txtIdCalendarItem").val(0); 
	$(".btnAlumnosGruposCalendar").removeClass("tab-link-active");
	$("#btnGruposCalendarTab").addClass("tab-link-active");
	$("#txtCalendarFechaRepetir").val("0000-00-00");
	$(".ulMembersAlumnsGroupCalendar").html("");
	$("#divAlumnosCk").hide();
	$("#divBtnDeleteCalendar").hide();
	$("#divOpcionesFormCalendar").show();
	$("#liNivelFormCalendar").show();

	comboNivelCalendar(0);
	comboPlanificacionCalendar(0, 0);
}

function setCheckboxAlumnos(ID){
	$.ajax({
		type: "GET",
		headers: {"Authorization": localStorage.getItem("LS_USER_API_KEY")},
		url: URL_SERVER+"listAlumnos/"+ID,
		dataType: 'json',
		statusCode: { 
			401: function (error) { 
				app.loginScreen.open('.ap-login-screen');
			} 
		},
		success: function (data){
			$.each(data.Alumnos, function(index, item) {
				//$("#alumnoChecbox_"+item.id).prop('checked', true);
				document.getElementById('alumnoChecbox_'+item.id).checked = true;
			});   
			
		}
	});
}

function getCalendarReadInfo(ID){ // ESTA FUNCION LEE UN EVENTO EN MODO DE LECTURA
	$("#txtIdCalendarItem").val(ID);

	$.ajax({
		type: "GET",
		headers: {"Authorization": localStorage.getItem("LS_USER_API_KEY")},
		url: URL_SERVER+"calendar/"+ID,
		dataType: 'json',
        statusCode: { 
            401: function (error) { 
                app.loginScreen.open('.ap-login-screen');
            } 
        },
		success: function (data){
            $.each(data.itemCalendar, function(index, item) {

				PLANIFICACION_TXT = item.planificacion == 0 ? "Sin planificación" : "Semana "+item.planificacion+" <i>"+item.Tplanificacion+"</i>";
				
				var INFO  = item.duracion+"<hr>";
					INFO += "<b>Hora Inicio:</b> <i>"+item.hini+"</i> <br>";
					INFO += "<b>Hora Fin:</b> <i>"+item.hfin+"</i> <hr>";
					INFO += "<b>Nivel:</b> <i>"+item.nivelTT+"</i> <br>";
					INFO += "<b>Planificación: </b>"+PLANIFICACION_TXT;

				$("#titleCalendarRead").html(item.fecha);
				$("#divCalendarReadInfo").html(INFO);
				$("#divCalendarReadInfoTitle").html('<b>Tipo :</b> <i>'+item.tipo+'</i>');
				$("#divCalendarReadObservacion").html(item.nota);
				
				loadAlumnos_O_Grupos(item.id, item.tipo, item.grupo, item.idGrupo);
			});   
        }
	});
}

function loadInfoEventCalendar(ID){ // ESTA FUNCION LEE UN EVENTO EN MODO DE LECTURA
	$("#txtIdCalendarItem").val(ID);
	$("#divOpcionesFormCalendar").hide();
	// $("#liNivelFormCalendar").hide();
	
	$.ajax({
		type: "GET",
		headers: {"Authorization": localStorage.getItem("LS_USER_API_KEY")},
		url: URL_SERVER+"calendar/"+ID,
		dataType: 'json',
        statusCode: { 
            401: function (error) { 
                app.loginScreen.open('.ap-login-screen');
            } 
        },
		success: function (data){
			$("#divBtnDeleteCalendar").show();
			$("#divFechaFinEvento").hide();
			
            $.each(data.itemCalendar, function(index, item) {
				var FECHA1    = item.fecha1;
				var FECHA2    = item.fecha2;
				var FCH1      = FECHA1.split("-");
				var FCH2      = FECHA2.split("-");

				$(".btnAlumnosGruposCalendar").removeClass("tab-link-active");
				
				calendarInicio.setValue([ new Date(FCH1[0], parseInt(FCH1[1] - 1), FCH1[2]) ]);
				calendarFin.setValue([ new Date(FCH2[0], parseInt(FCH2[1] - 1), FCH2[2]) ]);
				TimeCalendarIni.setValue([item.hini]);
				TimeCalendarFin.setValue([item.hfin]);
				$(".ap_show_hide_calendar").show();
				
				if(item.tipo == "GRUPO"){
					loadAlumnosGruposByCalendar(null, 2, item.itemsIds);
					$("#btnGruposCalendarTab").addClass("tab-link-active");

					$("#chkIdGupoCalendarGrupo").val(item.idGrupo);
					$("#chkIdUserCalendarGrupo").val("NULL");
				}else{
					loadAlumnosGruposByCalendar(null, 1, item.itemsIds);
					$("#btnAlumnosCalendarTab").addClass("tab-link-active");

					$("#chkIdGupoCalendarGrupo").val("NULL");
					$("#chkIdUserCalendarGrupo").val("NULL");
				}

				$("#txtIdCalendarItem").val(item.id);
				$("#txtDiaCalendarRepetir").val(item.diarepetir);
				$("#txtCalendarTipo").val(item.tipo);
				$("#txtCalendarFechaRepetir").val(item.frepetir);

				$('.txtCalendarNivel option[value="'+item.nivel+'"]').attr("selected", "selected");
				$("#txtCalendarCometario").val(item.nota);
				$("#txtNumDiaCalendar").val(item.hdia);	
				
				comboNivelCalendar(item.nivel);
				comboPlanificacionCalendar(item.nivel, item.idPlanificacion);
				loadAlumnos_O_Grupos(item.id, item.tipo, item.grupo, item.idGrupo);
			});    

			$("#divAlumnosCk").hide();
			$("#divGruposCk").hide();
			app.sheet.open('.my_modal_calendar');
        }
	});
}



function loadAlumnos_O_Grupos(ID, TIPO, NOMBRE, IDGRUPO){
	if(TIPO == "GRUPO"){
		$.ajax({
			type: "GET",
			headers: {"Authorization": localStorage.getItem("LS_USER_API_KEY")},
			url: URL_SERVER+"listAlumnos/"+IDGRUPO,
			dataType: 'json',
			statusCode: { 
				401: function (error) { 
					app.loginScreen.open('.ap-login-screen');
				} 
			},
			success: function (data1){
				var HTML_1 = "<div class=\"card\">";	
					HTML_1 += "<div class=\"card-header\">"+NOMBRE+"</div>";
					HTML_1 += "<div class=\"card-content card-content-padding\">";
					HTML_1 += "<div class=\"row\">";

				$.each(data1.Alumnos, function(index, item1) {
					HTML_1 += "<div class=\"col-25 text-align-center\" onclick=\"readFormAlumno("+item1.id+"); app.sheet.open('.my_modal_info_alumnos');\">";
					HTML_1 += "<img src=\"https://aulapadel.com/services/users/alumnos/"+item1.id+".jpg\" class=\"circle\" onerror=\"this.src='images/logos/logo512.jpg'\"/><p class=\"circle_p\">"+item1.name+"</p>";
					HTML_1 += "</div>";	
				});   

				HTML_1 += "</div>";
				HTML_1 += "</div>";	
				HTML_1 += "</div>";

				$(".ulMembersAlumnsGroupCalendar").html(HTML_1);
			}
		});

	}else{
		$.ajax({
			type: "GET",
			headers: {"Authorization": localStorage.getItem("LS_USER_API_KEY")},
			url: URL_SERVER+"calendarAlumnoGrupo/"+ID+"/"+TIPO,
			dataType: 'json',
			statusCode: { 
				401: function (error) { 
					app.loginScreen.open('.ap-login-screen');
				} 
			},
			success: function (data){

				var HTML_1 = "<div class=\"card\">";	
					HTML_1 += "<div class=\"card-header\">"+NOMBRE+"</div>";
					HTML_1 += "<div class=\"card-content card-content-padding\">";
					HTML_1 += "<div class=\"row\">";
					
				$.each(data.items, function(index, item) {		
					HTML_1 += "<div class=\"col-25 text-align-center\" onclick=\"readFormAlumno("+item.id+"); app.sheet.open('.my_modal_info_alumnos');\">";
					HTML_1 += "<img src=\"https://aulapadel.com/services/users/alumnos/"+item.id+".jpg\" class=\"circle\" onerror=\"this.src='images/logos/logo512.jpg'\"/><p class=\"circle_p\">"+item.name+"</p>";
					HTML_1 += "</div>";			
				});  

				HTML_1 += "</div>";
				HTML_1 += "</div>";	
				HTML_1 += "</div>";

				$(".ulMembersAlumnsGroupCalendar").html(HTML_1);
			}
		});
	}	
}

function cambiarTextoRepetir(HTML){ $("#lblTextoRepetir").html(HTML); }
function updateTxtRepetir(){
	var OPCION      = $("#txtRepetirCalendar").val();
	var FECHAINICIO = $("#txtCalendarInicio").val();
	var FECHAFIN    = $("#txtCalendarFin").val();

	if(OPCION == 0){
		cambiarTextoRepetir('Repetir desde <b>'+FECHAINICIO+'</b> al <b>'+FECHAFIN+'</b>');
	}
	if(OPCION == 3){
		var VALORES2 = "";
		$("#txtDiasSeleccionados").val(0);
		VALORES = calendarFechasVarias.getValue();
		$.each(VALORES, function (ind, elem) { 
			var d     = new Date(elem);
			var date  = d.toJSON().slice(0, 10); 
			var DIA   = parseInt(date.slice(8, 10)) + 1;
			var DIA2  = DIA < 10 ? 0 + DIA.toString() : DIA
            var nDate = DIA2 + '/'  
                       + date.slice(5, 7) + '/'  
					   + date.slice(0, 4); 	
			VALORES2 += nDate+"|";	
		}); 
		$('#txtDiasSeleccionados').val(VALORES2);
	}
}

function setDiasRepetirEvento(){
	var FECHAINICIO = $("#txtCalendarInicio").val();
	var FECHAFIN    = $("#txtCalendarFin").val();

	var selected = new Array();
	var selected1 = new Array();
	var tblDias = document.getElementById("tblDiasRepetir");
	var chks = tblDias.getElementsByTagName("INPUT");
	for (var i = 0; i < chks.length; i++) {
		if (chks[i].checked) {
			selected.push(chks[i].value);
			selected1.push(weekday[chks[i].value]);
		}
	}

	if (selected.length > 0) {
		$("#txtDiaCalendarRepetir").val(selected.join("|"));
		cambiarTextoRepetir('Repetir todos los días <b>'+selected1.join(" | ")+'</b> desde <b>'+FECHAINICIO+'</b> hasta <b>'+FECHAFIN+'</b>');
	}
}





function resetFormGrupo(){
	$.ajax({
		type: "GET",
		headers: {"Authorization": localStorage.getItem("LS_USER_API_KEY")},
		url: URL_SERVER+"tengoAcceso/mod_grupos",
		dataType: 'json',
		success: function (data){
			if(data.tengo_acceso == "SI"){
				if(data.error_mod == true){
					app.dialog.alert(data.num_mensaje);
				}else{
					////////////////////////////////
					app.sheet.open('.my_model_grupos');
					getGrupos(); 
					getAlumnosCheckbox(); 
					comboNivelCalendar(0);
					comboPlanificacionCalendar(0, 0);

					$(".ulMembersAlumnsGroup").html("");
					$("#lblHeaderGrupo").html("");
					$('#txtIdGrupoAlumno').val(0); 
					$('#myFormGrupo')[0].reset(); 
					$('#divBotomGrupoEliminar').hide();
					////////////////////////////////
				}
			}else{
				app.dialog.alert(data.mensaje);
			}
								
		}
	}); 
	app.fab.close('.fab');
}

function resetFormAlumnos(){
	$.ajax({
		type: "GET",
		headers: {"Authorization": localStorage.getItem("LS_USER_API_KEY")},
		url: URL_SERVER+"tengoAcceso/mod_alumnos",
		dataType: 'json',
		success: function (data){
			if(data.tengo_acceso == "SI"){
				if(data.error_mod == true){
					app.dialog.alert(data.num_mensaje);
				}else{
					////////////////////////////////
					app.sheet.open('.my_model_alumno');
					
					getGrupos(); 
					comboNivelCalendar(0); 

					$('#txtIdAlumno').val(0); 
					$('#myFormAlumno')[0].reset(); 
					$('#divBotomComiteTecnico').hide(); 
					$('#imgAlumnoCalendar').attr('src', 'images/logos/logo-v.png');
					////////////////////////////////
				}
			}else{
				app.dialog.alert(data.mensaje);
			}
								
		}
	}); 
	app.fab.close('.fab');
}

function openPopover(EL, HTML){
	dynamicPopover = app.popover.create({
        targetEl: EL,
        content: '<div class="popover">'+
                    '<div class="popover-inner">'+
                        '<div class="block">'+
                        '<p>'+HTML+'</p>'+
                        '</div>'+
                    '</div>'+
                    '</div>',
        // Events
        on: {
            open: function (popover) { },
            opened: function (popover) { },
        }
	});
	
	dynamicPopover.open();

	return false;
}

function openFormEventNew(){
	var now = new Date();
	var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	$("#divFechaFinEvento").show();

	$.ajax({
		type: "GET",
		headers: {"Authorization": localStorage.getItem("LS_USER_API_KEY")},
		url: URL_SERVER+"tengoAcceso/mod_agenda",
		dataType: 'json',
		success: function (data){
			if(data.tengo_acceso == "SI"){
				if(data.error_mod == true){
					app.dialog.alert(data.num_mensaje);
				}else{
					////////////////////////////////  
					if( localStorage.getItem("LS_USER_TIPO") == "1" ){
						$("#liRepetirEventCalendar").hide();
					}else{
						$("#liRepetirEventCalendar").show();
					}

					app.sheet.open('.my_modal_calendar');
					$('#myFormCalendar')[0].reset();
					initFormCalendar();
					initRepetirForm();
					comboNivelCalendar(0);
					getListViewGrupos();
					calendarInicio.setValue([today]);
					calendarFin.setValue([today]);
					$("#btnGruposCalendarTab").removeClass("tab-link-active");
					app.fab.close('.fab');
					////////////////////////////////
				}
			}else{
				app.dialog.alert(data.mensaje);
			}
								
		}
	}); 
	app.fab.close('.fab');
}

function loadMenuPlanificacion(ID, TRIMESTRES){
	var API_USER = localStorage.getItem("LS_USER_API_KEY");
	var HTML  = "";

	$.ajax({
		type: "GET",
		headers: {"Authorization": API_USER},
		url: URL_SERVER+"planificacionItems/"+ID+"/1",
		dataType: 'json',
		success: function (data){
			$.each(data.PLANIFICACIONITEM, function(index, item) {
				var IDITEM = item.id;
				HTML += '<div class="card">';
				HTML += '<div class="card-content card-content-padding">';
				HTML += '<b class="ap_card-title ap-accordion" onclick="ap_accordion(this);" style="text-transform:uppercase;">'+ item.tema +'</b>';
				HTML += '<div class="ap-panel" id="liItemsDiv'+IDITEM+'">';
				
					var HTML2 = '';
					$.ajax({
						type: "GET",
						headers: {"Authorization": API_USER},
						url: URL_SERVER+"planificacionItems/"+IDITEM+"/3",
						dataType: 'json',
						success: function (data){
							$.each(data.PLANIFICACIONITEM, function(index, item) {
								var IDITEM2 = item.id;
								HTML2 += '<h3 style="text-align:center;text-transform:uppercase;">'+ item.descripcion +'</h3>';
								HTML2 += '<ul id="liItemliItemsDivOtrosDiv'+IDITEM2+'">';

								var HTML3 = "";
								$.ajax({
									type: "GET",
									headers: {"Authorization": API_USER},
									url: URL_SERVER+"planificacionItems/"+IDITEM2+"/3",
									dataType: 'json',
									success: function (data){
										$.each(data.PLANIFICACIONITEM, function(index, item) {
											var EYE    = item.lotengo == 0 ? "" : '<i class="f7-icons" style="font-size: 20px;">eye</i>';
                                            var CREADO = item.creado == 0 ? "" : 'style="font-weight: bold;"';
											//HTML3 += "<li><a href=\"#\" class=\"item-link liEjercicio\" data-edit="+item.edit+" onclick=\"abrir_ejercicio_desde_planificacion('"+item.idEjercicio+"', '"+item.id+"', '"+item.lotengo+"', '"+item.creado+"');\">"+ item.item +"</a></li>";
											HTML3 += "<li class=\"btnOpenEjercicioPlanificacion\">" + EYE +" <a href=\"#\" class=\"item-link\" "+CREADO+" data-edit="+item.edit+" onclick=\"abrir_ejercicio_desde_planificacion('"+item.edit+"', '"+item.idEjercicio+"', '"+item.id+"', '"+item.lotengo+"', '"+item.creado+"');\">"+ item.item + "</a></li>";
										});

										$("#liItemliItemsDivOtrosDiv"+IDITEM2).html(HTML3);
									}
								});

								HTML2 += '</ul>';
							});
							$("#liItemsDiv"+IDITEM).html(HTML2);
						}
					}); 

				HTML += '</div>';
				HTML += '</div>';
				HTML += '</div>';
				HTML += '<div class="separacion"></div>';
			});   
			
			$("#divItemEntrenamientoCalendar").html(HTML);
		}
	});   
}

function changePistaEjercicios(NAME){
	$("#imgPista").attr("xlink:href", "images/pistas/"+NAME);
	localStorage.setItem('LS_PISTA_EJERCICIO', NAME);
	return false;
}

function formattedDate(d = new Date) {
	let month = String(d.getMonth() + 1);
	let day = String(d.getDate());
	const year = String(d.getFullYear());
  
	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;
  
	return `${day}/${month}/${year}`;
}

function openFormEventByType(THIS, HORA, FECHA){
	CSS_CLASS = $(THIS).attr('class');  
	CLASS = CSS_CLASS.split(" ");

	if(CLASS[0] == "ap-add-calendar"){
		$.ajax({
			type: "GET",
			headers: {"Authorization": localStorage.getItem("LS_USER_API_KEY")},
			url: URL_SERVER+"tengoAcceso/mod_agenda",
			dataType: 'json',
			success: function (data){
				if(data.tengo_acceso == "SI"){
					if(data.error_mod == true){
						app.dialog.alert(data.num_mensaje);
					}else{
						////////////////////////////////
						openFormNewEvent(THIS, HORA, FECHA);
						////////////////////////////////
					}
				}else{
					app.dialog.alert(data.mensaje);
				}
									
			}
		}); 
	}else{
		ID = $(THIS).children().attr("data-id");
		openFormEvent(ID);
	}
}

function openFormNewEvent(THIS, HORA, FECHA){
	var HORAFIN = parseInt(HORA) + 1; 

	initRepetirForm();
	initFormCalendar();
	getGruposCheckbox(0);
	setLS_Fecha_Calendar(FECHA);

	var fechasol = FECHA;
	var array_fechasol = fechasol.split("/");
	var ano = parseInt(array_fechasol[2]);
	var mes = parseInt(array_fechasol[1]); 
	var dia = parseInt(array_fechasol[0]);

	var FECHA1 = new Date(ano, mes, dia)
	DateCalendarIni.setValue([FECHA1, FECHA1]);

	$("#divGruposCk").show();
	$("#txtNumDiaCalendar").val(HORA);
	$("#txtCalendarDateEvent").val(FECHA+" - "+FECHA);
	$("#txtCalendarHoraIni").val(HORA+":00");
	$("#txtCalendarHoraFin").val(HORAFIN+":00");
	$("#txtIdCalendarItem").val(0);
	$("#divRepetirBoton").show();
	$("#liRepetirEventCalendar").show();

	app.sheet.open('.my_modal_calendar');
}

function openFormEvent(ID){
	comboNivelCalendar(0);
	getCalendarReadInfo(ID);

	$("#btnEditCalendar").attr("data-rel", ID);
	$("#liRepetirEventCalendar").hide();

	app.fab.close('.fab');
	app.calendar.close();
	app.sheet.open('.my_modal_info_calendar');
}

function getContentCalendar(){
	var CONTENIDO = $("#contentCalendar").html();
	var API_USER = localStorage.getItem("LS_USER_API_KEY");
	$.ajax({
		type: "POST",
		headers: {"Authorization": API_USER},
		url: URL_SERVER+"toPdf",
		data:{txtContenidoCalendario: CONTENIDO},
		dataType: 'json',
		success: function (data){
		}
	});  
}

function updateItemComiteTecnico(THIS){
	var ID    = $(THIS).attr("data-id");
	var CAMPO = $(THIS).attr("data-campo");
	var TABLA = $(THIS).attr("data-tabla");
	var VALOR = $(THIS).val();
	$.ajax({
		type: "PUT",
		headers: {"Authorization": API_USER},
		url: URL_SERVER+"itemComiteTecnico",
		data:{txtId: ID, txtValor: VALOR, txtCampo: CAMPO, txtTabla: TABLA},
		dataType: 'json',
		success: function (data){

		}
	}); 
}

function btnSaveComiteTecnico(){
	a = _projectTexts.get();
	app.dialog.alert(a.t_msg_ok);
}



/* FUNCIONES DE ELIMINAR */
function deletePerfil(THIS){
	
	var ID_PERFIL = $(THIS).data("id");

	if(ID_PERFIL == 0){
		Notificacion_id_calendar_0.open();
	}else{
		app.dialog.confirm('¿Realmente deseas cancelar suscripción?', function () {
			app.preloader.show(); 
			$.ajax({
				type: "DELETE",
				headers: {"Authorization": localStorage.getItem("LS_USER_API_KEY")},
				url: URL_SERVER+"profiler/"+ID_PERFIL,
				dataType: 'json',
				statusCode: { 
					401: function (error) { 
						app.loginScreen.open('.ap-login-screen');
					} 
				},
				beforeSend: function(){ },
				success: function (data){
					app.dialog.alert(data.message);
					app.preloader.hide();
					ap_logout();

					app.loginScreen.open('.ap-login-screen');
					app.preloader.hide();
					
				},error: function (xhr, status, errorThrown) {
					a = _projectTexts.get();
					app.dialog.alert("Code: "+xhr.status+"<br>"+a.t_error_server);
					app.preloader.hide();
				}
			});
			
		});

	}
}

function deleteAlumno(THIS){
	var ID_ALUMNO = $(THIS).attr("data-id");

	if(ID_ALUMNO == 0){
		Notificacion_id_calendar_0.open();
		
	}else{
		app.dialog.confirm('Seguro que desea eliminar este registro?', function () {
			$.ajax({
				type: "DELETE",
				headers: {"Authorization": localStorage.getItem("LS_USER_API_KEY")},
				url: URL_SERVER+"alumno/"+ID_ALUMNO,
				dataType: 'json',
				statusCode: { 
					401: function (error) { 
						app.loginScreen.open('.ap-login-screen');
					} 
				},
				beforeSend: function(){
					app.preloader.show();
				},
				success: function (data){
					a = _projectTexts.get();
					
					app.dialog.alert(data.message);
					getAlumnos();
					$('#myFormAlumno')[0].reset();  
					app.sheet.close(".my_model_alumno"); 
					app.preloader.hide();
					
				},error: function (xhr, status, errorThrown) {
					a = _projectTexts.get();
					app.dialog.alert("Code: "+xhr.status+"<br>"+a.t_error_server);
					app.preloader.hide();
				}
			});
			
		});

	}
}

function deleteCalendarItem(){
	var ID_CALENDAR = $("#txtIdCalendarItem").val();

	if(ID_CALENDAR == 0){
		Notificacion_id_calendar_0.open();
	}else{
		app.dialog.confirm('Seguro que desea eliminar este registro?', function () {
			$.ajax({
				type: "DELETE",
				headers: {"Authorization": localStorage.getItem("LS_USER_API_KEY")},
				url: URL_SERVER+"calendar/"+ID_CALENDAR,
				dataType: 'json',
				statusCode: { 
					401: function (error) { 
						app.loginScreen.open('.ap-login-screen');
					} 
				},
				success: function (data){
					initCalendarOther(0);
					setHeaderSemanaOther(0);

					app.dialog.alert(data.message);
					$('#myFormCalendar')[0].reset();  
					getCalendarTime();
					app.sheet.close(".my_modal_info_calendar");	                    
					app.sheet.close(".my_modal_calendar");	                    
				}
			}).always(function() {
			});
			
		});
	}
}

function deleteGrupo(ID_GRUPO){
	var ID_GRUPO = $("#btnDeleteGrupo").data("id");

	if(ID_GRUPO == 0){
		Notificacion_id_calendar_0.open();
	}else{
		app.dialog.confirm('Seguro que desea eliminar este registro?', function () {
			$.ajax({
				type: "DELETE",
				headers: {"Authorization": localStorage.getItem("LS_USER_API_KEY")},
				url: URL_SERVER+"grupo/"+ID_GRUPO,
				dataType: 'json',
				statusCode: { 
					401: function (error) { 
						app.loginScreen.open('.ap-login-screen');
					} 
				},
				beforeSend: function(){
					app.preloader.show();
				},
				success: function (data){
					a = _projectTexts.get();

					if(data.error){
						app.dialog.alert(a.data.message );
						app.preloader.hide();
					}else{
						getListViewGrupos();
						app.dialog.alert(data.message);
						app.sheet.close(".my_modal_info_grupos");
						app.sheet.close(".my_model_grupos");
						$('#myFormGrupo')[0].reset(); 

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
	}
}
/** FIN */


/* FUNCIONES QUE CARGAN LOS LISTVIEW */
function getCalendar(){ // ESTA FUNCION CARGA LOS EVENTO DE LA FECHA Y HORA ACTUAL
	$('#divCalendarUser').html('<ul id="divCalendarUserHOY"> </ul> <ul id="divCalendarUserMES"> </ul> <ul id="divCalendarUserPROXIMOS"> </ul> <ul id="divCalendarUserPASADOS"> </ul>');

	var i   = 0;
	var ii  = 0;
	var iii = 0;
	var iv  = 0;
	var HTML_1     = "";
	var HTML_1_HOY = "";
	var HTML_1_MES = "";
	var HTML_1_PAS = "";
	var HTML_1_PRO = "";

	$.ajax({
		type: "GET",
		headers: {"Authorization": localStorage.getItem("LS_USER_API_KEY")},
		url: URL_SERVER+"calendar",
		dataType: 'json',
        statusCode: { 
            401: function (error) { 
                app.loginScreen.open('.ap-login-screen');
            } 
        },
		success: function (data){
			if(data.Calendar.length == 0){
				HTML_1_MES += "<li class=\"item-content\">";
				HTML_1_MES += "<div class=\"item-inner\">";
				HTML_1_MES += "<div class=\"item-title\">";
				HTML_1_MES += "<p><b>No hay eventos.</b></p>";
				HTML_1_MES += "</div>";
				HTML_1_MES += "</div>";
				HTML_1_MES += "</li>";
				
			}else{
				$.each(data.Calendar, function(index, item) {
					var idJs = item.items;
					var idJ = idJs.split("-");

					if(item.difuminar == 1){  // EVENTOS PROXIMOS
						iv += 1;
						DIFUMINAR = ""; 

						HTML_1_PRO += iv==1 ? '<div class="content-block-title" tkey="t_eventos_proximos" style="padding:5px;">Eventos proximos</div>' : '';
						HTML_1_PRO += '<li class="swipeout" '+DIFUMINAR+'>';
						HTML_1_PRO += '<div class="swipeout-content">';

						HTML_1_PRO += "<div data-planificacion=\""+item.planificacion+"\" data-rel=\""+item.id+"\" class=\"apDivCalendarTime card color0"+item.color+"\">";
						HTML_1_PRO += "<div class=\"card-content card-content-padding\">";
						// HTML_1_PRO += "<p class=\"date\"><b>"+item.fecha+"</b></p>";
						HTML_1_PRO += "<p class=\"date\"><b>"+item.tipo+"</b> - <b>"+item.fecha+"</b><span class=\"badge colorB"+item.color+"\" style=\"float: right;\">"+item.h_ini+"</span></p>";
						HTML_1_PRO += '<div class="row no-gap">';

						$.each(idJ, function(index, it) {
							HTML_1_PRO += '<div class="col-15">';
							HTML_1_PRO += '<img src="https://aulapadel.com/services/users/alumnos/'+it+'.jpg" class="circle" onerror="this.src=\'images/logos/logo512.jpg\'">';
							HTML_1_PRO += '</div>';
						});

						PLANIFICACION = item.planificacion == 0 ? "" :  "<b>Semana "+item.planificacion+":</b> | <i>"+item.Tplanificacion+"</i><br>";

						HTML_1_PRO += '</div>';
						HTML_1_PRO += "<b>Nivel:</b> <i>"+item.Tnivel+"</i><br>";
						HTML_1_PRO += PLANIFICACION;
						HTML_1_PRO += "<b style=\"color:#000;\">"+item.nota+"</b></p>";
						HTML_1_PRO += "</div>";
						HTML_1_PRO += "</div>";

						HTML_1_PRO += '</div>';
						HTML_1_PRO += '<div class="swipeout-actions-right">';

						HTML_1_PRO += '<a data-rel="'+item.id+'" onclick="action1(this);"> <i class="f7-icons">info</i> </a>';
						HTML_1_PRO += '<a data-planificacion="'+item.idPlanificacion+'" onclick="action2(this);"> <i class="f7-icons">list_bullet_indent</i> </a>';

						HTML_1_PRO += '</div>';
						HTML_1_PRO += '</li>';					
					}


					if(item.difuminar == 2){ // MES EN CURSO
						i += 1;
						DIFUMINAR = ' style="background:#000000;"'; 

						HTML_1_MES += i==1 ? '<div class="content-block-title" tkey="t_eventos_mes_curso" style="padding:5px;">Eventos de mes en curso</div>' : '';
						HTML_1_MES += '<li class="swipeout" '+DIFUMINAR+'>';
						HTML_1_MES += '<div class="swipeout-content">';

						HTML_1_MES += "<div data-planificacion=\""+item.planificacion+"\" data-rel=\""+item.id+"\" class=\"apDivCalendarTime card color0"+item.color+"\">";
						HTML_1_MES += "<div class=\"card-content card-content-padding\">";
						// HTML_1_MES += "<p class=\"date\"><b>"+item.fecha+"</b></p>";
						HTML_1_MES += "<p class=\"date\"><b>"+item.tipo+"</b> - <b>"+item.fecha+"</b><span class=\"badge colorB"+item.color+"\" style=\"float: right;\">"+item.h_ini+"</span></p>";
						HTML_1_MES += '<div class="row no-gap">';

						$.each(idJ, function(index, it) {
							HTML_1_MES += '<div class="col-15">';
							HTML_1_MES += '<img src="https://aulapadel.com/services/users/alumnos/'+it+'.jpg" class="circle" onerror="this.src=\'images/logos/logo512.jpg\'">';
							HTML_1_MES += '</div>';
						});

						PLANIFICACION = item.planificacion == 0 ? "" :  "<b>Semana "+item.planificacion+":</b> | <i>"+item.Tplanificacion+"</i><br>";

						HTML_1_MES += '</div>';
						HTML_1_MES += "<b>Nivel:</b> <i>"+item.Tnivel+"</i><br>";
						HTML_1_MES += PLANIFICACION;
						HTML_1_MES += "<i>"+item.nota+"</i></p>";
						HTML_1_MES += "</div>";
						HTML_1_MES += "</div>";

						HTML_1_MES += '</div>';
						HTML_1_MES += '<div class="swipeout-actions-right">';

						HTML_1_MES += '<a data-rel="'+item.id+'" onclick="action1(this);"> <i class="f7-icons">info</i> </a>';
						HTML_1_MES += '<a data-planificacion="'+item.idPlanificacion+'" onclick="action2(this);"> <i class="f7-icons">list_bullet_indent</i> </a>';

						HTML_1_MES += '</div>';
						HTML_1_MES += '</li>';
					}


					if(item.difuminar == 3){ // EVENTOS DEL DIA DE HOY
						ii += 1;
						DIFUMINAR = ' style="background:#dedede;"';

						HTML_1_HOY += ii==1 ? '<div class="content-block-title" tkey="t_eventos_dia_hoy" style="padding:5px;">Eventos del día de hoy</div>' : '';
						HTML_1_HOY += '<li class="swipeout" '+DIFUMINAR+'>';
						HTML_1_HOY += '<div class="swipeout-content">';

						HTML_1_HOY += "<div data-planificacion=\""+item.planificacion+"\" data-rel=\""+item.id+"\" class=\"apDivCalendarTime card color0"+item.color+"\">";
						HTML_1_HOY += "<div class=\"card-content card-content-padding\">";
						// HTML_1_HOY += "<p class=\"date\"><b>"+item.fecha+"</b></p>";
						HTML_1_HOY += "<p class=\"date\"><b>"+item.tipo+"</b> - <b>"+item.fecha+"</b><span class=\"badge colorB"+item.color+"\" style=\"float: right;\">"+item.h_ini+"</span></p>";
						HTML_1_HOY += '<div class="row no-gap">';

						$.each(idJ, function(index, it) {
							HTML_1_HOY += '<div class="col-15">';
							HTML_1_HOY += '<img src="https://aulapadel.com/services/users/alumnos/'+it+'.jpg" class="circle" onerror="this.src=\'images/logos/logo512.jpg\'">';
							HTML_1_HOY += '</div>';
						});

						PLANIFICACION = item.planificacion == 0 ? "" :  "<b>Semana "+item.planificacion+":</b> | <i>"+item.Tplanificacion+"</i><br>";

						HTML_1_HOY += '</div>';
						HTML_1_HOY += "<b>Nivel:</b> <i>"+item.Tnivel+"</i><br>";
						HTML_1_HOY += PLANIFICACION;
						HTML_1_HOY += "<i>"+item.nota+"</i></p>";
						HTML_1_HOY += "</div>";
						HTML_1_HOY += "</div>";

						HTML_1_HOY += '</div>';
						HTML_1_HOY += '<div class="swipeout-actions-right">';

						HTML_1_HOY += '<a data-rel="'+item.id+'" onclick="action1(this);"> <i class="f7-icons">info</i> </a>';
						HTML_1_HOY += '<a data-planificacion="'+item.idPlanificacion+'" onclick="action2(this);"> <i class="f7-icons">list_bullet_indent</i> </a>';

						HTML_1_HOY += '</div>';
						HTML_1_HOY += '</li>';
					}


					if(item.difuminar == -1){ // EVENTOS PASADOS
						iii += 1;
						DIFUMINAR = ' style="opacity:0.5;"'; 

						HTML_1_PAS += iii==1 ? '<div class="content-block-title" tkey="t_eventos_pasados" style="padding:5px;">Eventos pasados</div>' : '';
						HTML_1_PAS += '<li class="swipeout" '+DIFUMINAR+'>';
						HTML_1_PAS += '<div class="swipeout-content">';

						HTML_1_PAS += "<div data-planificacion=\""+item.planificacion+"\" data-rel=\""+item.id+"\" class=\"apDivCalendarTime card color0"+item.color+"\">";
						HTML_1_PAS += "<div class=\"card-content card-content-padding\">";
						// HTML_1_PAS += "<p class=\"date\"><b>"+item.fecha+"</b></p>";
						HTML_1_PAS += "<p class=\"date\"><b>"+item.tipo+"</b> - <b>"+item.fecha+"</b><span class=\"badge colorB"+item.color+"\" style=\"float: right;\">"+item.h_ini+"</span></p>";
						HTML_1_PAS += '<div class="row no-gap">';

						$.each(idJ, function(index, it) {
							HTML_1_PAS += '<div class="col-15">';
							HTML_1_PAS += '<img src="https://aulapadel.com/services/users/alumnos/'+it+'.jpg" class="circle" onerror="this.src=\'images/logos/logo512.jpg\'">';
							HTML_1_PAS += '</div>';
						});

						PLANIFICACION = item.planificacion == 0 ? "" :  "<b>Semana "+item.planificacion+":</b> | <i>"+item.Tplanificacion+"</i><br>";

						HTML_1_PAS += '</div>';
						HTML_1_PAS += "<b>Nivel:</b> <i>"+item.Tnivel+"</i><br>";
						HTML_1_PAS += PLANIFICACION;
						HTML_1_PAS += "<i>"+item.nota+"</i></p>";
						HTML_1_PAS += "</div>";
						HTML_1_PAS += "</div>";

						HTML_1_PAS += '</div>';
						HTML_1_PAS += '<div class="swipeout-actions-right">';

						HTML_1_PAS += '<a data-rel="'+item.id+'" onclick="action1(this);"> <i class="f7-icons">info</i> </a>';
						HTML_1_PAS += '<a data-planificacion="'+item.idPlanificacion+'" onclick="action2(this);"> <i class="f7-icons">list_bullet_indent</i> </a>';

						HTML_1_PAS += '</div>';
						HTML_1_PAS += '</li>';
					}



					
				}); 
			}  

			
			$("#divCalendarUserMES").html(HTML_1_MES);
			$("#divCalendarUserHOY").html(HTML_1_HOY);
			$("#divCalendarUserPASADOS").html(HTML_1_PAS);
			$("#divCalendarUserPROXIMOS").html(HTML_1_PRO);
        }
	});
}
function getCalendarTime(){ // ESTA FUNCION CARGA LOS EVENTO DE LA FECHA Y HORA ACTUAL
	$('#divCalendarUser').html('<div class="block block-strong text-align-center"><div class="preloader color-multi"  style="width: 100px; height: 100px"></div></div>');
	var HTML_1 = "";

	$.ajax({
		type: "GET",
		headers: {"Authorization": localStorage.getItem("LS_USER_API_KEY")},
		url: URL_SERVER+"calendarTime",
		dataType: 'json',
        statusCode: { 
            401: function (error) { 
                app.loginScreen.open('.ap-login-screen');
            } 
        },
		success: function (data){
			if(data.Calendar.length == 0){
				HTML_1 += "<div style=\"text-align: center;padding: 10px;background: #d6de3b;\">";
				HTML_1 += "<p><b>No hay próximos eventos en el día de hoy que mostrar....</b></p>";
				HTML_1 += "</div>";
				
			}else{
				$.each(data.Calendar, function(index, item) {
					var idJs = item.items;
					var idJ = idJs.split("-");

					HTML_1 += '<li class="swipeout">';
					HTML_1 += '<div class="swipeout-content">';

					HTML_1 += "<div data-planificacion=\""+item.planificacion+"\" data-rel=\""+item.id+"\" class=\"apDivCalendarTime card color0"+item.color+"\">";
					HTML_1 += "<div class=\"card-content card-content-padding\">";
					// HTML_1 += "<p class=\"date\"><b>"+item.fecha+"</b></p>";
					HTML_1 += "<p class=\"date\"><b>"+item.tipo+"</b> - <b>"+item.fecha+"</b><span class=\"badge colorB"+item.color+"\" style=\"float: right;\">"+item.h_ini+"</span></p>";
					HTML_1 += '<div class="row no-gap">';


					$.each(idJ, function(index, it) {
						HTML_1 += '<div class="col-15">';
						HTML_1 += '<img src="https://aulapadel.com/services/users/alumnos/'+it+'.jpg" class="circle" onerror="this.src=\'images/logos/logo512.jpg\'">';
						HTML_1 += '</div>';
					});

					PLANIFICACION = item.planificacion == 0 ? "" :  "<b>Semana "+item.planificacion+":</b> | <i>"+item.Tplanificacion+"</i><br>";

					HTML_1 += '</div>';
					HTML_1 += "<b>Nivel:</b> <i>"+item.Tnivel+"</i><br>";
					HTML_1 += PLANIFICACION;
					HTML_1 += "<b style=\"color:#000;\">"+item.nota+"</b></p>";
					HTML_1 += "</div>";
					HTML_1 += "</div>";

					HTML_1 += '</div>';
					HTML_1 += '<div class="swipeout-actions-right">';

					HTML_1 += '<a data-rel="'+item.id+'" onclick="action1(this);"> <i class="f7-icons">info</i> </a>';
					HTML_1 += '<a data-planificacion="'+item.idPlanificacion+'" onclick="action2(this);"> <i class="f7-icons">list_bullet_indent</i> </a>';

					HTML_1 += '</div>';
					HTML_1 += '</li>';
				}); 
			}  

			$("#divCalendarUser").html(HTML_1);
        }
	});
}

function action1(THIS){
	var ID = $(THIS).data("rel");
	//comboNivelCalendar(0);
	getCalendarReadInfo(ID);
	$("#btnEditCalendar").attr("data-rel", ID);
	$("#liRepetirEventCalendar").hide();

	app.fab.close('.fab');
	app.calendar.close();
	app.sheet.open('.my_modal_info_calendar');
}

function action2(THIS){
	var ID_PLANIFICACION = $(THIS).data("planificacion");

	if(ID_PLANIFICACION == 0){
		app.dialog.alert('<p>No tiene una planificación asignada.</p>'); 
	}else{
		getAgendaToPlanificacion(ID_PLANIFICACION);
	}
}

function getAlumnos(){ // ESTA FUNCION CARGA EL LISTVIEW DE TODOS LOS ALUMNOS DEL TAB ALUMNOS
	$('#ulMembersAlumns').html('<div class="block block-strong text-align-center"><div class="preloader color-multi"  style="width: 100px; height: 100px"></div></div>');
	var HTML_1 = "";
	
	$.ajax({
		type: "GET",
		headers: {"Authorization": localStorage.getItem("LS_USER_API_KEY")},
		url: URL_SERVER+"listAlumnos",
		dataType: 'json',
        statusCode: { 
            401: function (error) { 
                app.loginScreen.open('.ap-login-screen');
            } 
        },
		success: function (data){
            $.each(data.Alumnos, function(index, item) {
                HTML_1 += "<li onclick=\"readFormAlumno("+item.id+"); app.sheet.open('.my_modal_info_alumnos');\">";
				HTML_1 += "<a href=\"#\" class=\"item-link item-content\">";
				HTML_1 += "<div class=\"item-media\" style=\"padding: 0px 6px 0px 6px;width:68px;height:55px;\"><img src=\"https://aulapadel.com/services/users/alumnos/"+item.id+".jpg\" onerror=\"this.src='images/logos/logo512.jpg'\" style=\"width:100%;\"/></div>";
				HTML_1 += "<div class=\"item-inner\">";
				HTML_1 += "<div class=\"item-title-row\">";
				HTML_1 += "<div class=\"apItem-title item-title\">"+item.name+"</div>";
				HTML_1 += "</div>";
				HTML_1 += "<div class=\"item-subtitle\">"+item.email+"</div>";
				HTML_1 += "</div>";
				HTML_1 += "</a>";
				HTML_1 += "</li>";
			});   
			
			$("#ulMembersAlumns").html(HTML_1);
        }
	});

	comboNivelCalendar(0);
	
	return false;
}

function getListViewGrupos(){ // ESTA FUNCION CARGA EL LISTADO DE LOS GRUPOS PARA EL TAB3
	$('#divCalendarGroups').html('<div class="block block-strong text-align-center"><div class="preloader color-multi"  style="width: 100px; height: 100px"></div></div>');
	var HTML_1 = "";
	
	$.ajax({
		type: "GET",
		headers: {"Authorization": localStorage.getItem("LS_USER_API_KEY")},
		url: URL_SERVER+"listGrupos",
		dataType: 'json',
        statusCode: { 
            401: function (error) { 
                app.loginScreen.open('.ap-login-screen');
            } 
        },
		success: function (data){
			$.each(data.AlumnosGrupos, function(index, item) {
				HTML_1 += "<li onclick=\"app.sheet.open('.my_modal_info_grupos'); readFormGrupo("+item.id+");\">";
				HTML_1 += "<a href=\"#\" class=\"item-link item-content\">";
				HTML_1 += '<div class="item-inner">';
					HTML_1 += '<div class="item-title-row">';
						HTML_1 += '<div class="item-title apItemTitle">'+item.name+'</div>';
					HTML_1 += '</div>';
					HTML_1 += '<div class="item-text">'+item.description+'</div>';
				HTML_1 += '</div>';
				HTML_1 += "</a>";
				HTML_1 += '</li>';
			});   
			
			$("#divCalendarGroups").html(HTML_1);

			Dom7('.deleted-callback').on('swipeout:deleted', function () {
				var ID_GRUPO = Dom7(this).prop('id');
				deleteGrupo(ID_GRUPO);
			});
        }
	});

	comboNivelCalendar(0);

	return false;
}
/** FIN */



/* ESTAS FUNCIONES SE UTILIZAN EN LOS MODALS DE SOLO LECTURA */
function readFormAlumno(IDALUMNO){ // FUNCION QUE CARGA LA INFORMACION DEL GRUPO SELECCIONADO
	$("#btnEditAlumno").attr("data-rel", IDALUMNO);
	$("#btnComiteTecnicoRead").attr("data-id", IDALUMNO);

	$.ajax({
		type: 'get',
		headers: {"Authorization": localStorage.getItem("LS_USER_API_KEY")},
		url: URL_SERVER+"alumnoOne/"+IDALUMNO,
		dataType: 'json',
		statusCode: { 
			401: function (error) { 
				app.loginScreen.open('.ap-login-screen');
			} 
		},
		success: function (data){  
			$.each(data.AlumnoItem, function(index, item) {
				NIVELTIPO = item.idPlanifi == "" ? "" : item.idPlanifi == 1 ?  "Menores" : "Adultos";
				$("#titleAlumnoRead").html(item.nombres+" "+item.apellidos);
				$("#divAlumnoReadObservacion").html(item.observaciones);
				$('#imgAlumnoRead').attr('src','https://aulapadel.com/services/users/alumnos/'+item.id+'.jpg');

				var HTML = '<h3>'+item.nombres+" "+item.apellidos+'</h3><hr><b>Teléfono: </b> <i>'+item.telefono+'</i> <br> <b>Email: </b> <i>'+item.email+'</i> <br> <b>Nivel: </b> <i>'+NIVELTIPO+' : '+item.nivel_txt+'</i> <br> <b>Fecha Nacimiento: </b> <i>'+item.nacimiento+'</i><hr>';
				$("#divAlumnoInfoRead").html(HTML);
			});       
			$("#divBotomComiteTecnico1").show();      
		}
	});

	return false;
}

function readFormGrupo(IDGRUPO){ // FUNCION QUE CARGA LA INFORMACION DEL GRUPO SELECCIONADO
	$("#btnEditGrupo").attr("data-rel", IDGRUPO);

	$.ajax({
		type: 'get',
		headers: {"Authorization": localStorage.getItem("LS_USER_API_KEY")},
		url: URL_SERVER+"grupoOne/"+IDGRUPO,
		dataType: 'json',
		statusCode: { 
			401: function (error) { 
				app.loginScreen.open('.ap-login-screen');
			} 
		},
		success: function (data){  
			$.each(data.GrupoItem, function(index, item) {
				$("#titleGrupoRead").html(item.nombre);
				$("#divGrupoReadObservacion").html(item.descripcion);

				var HTML = '<hr><b>Nivel: </b> <i>'+item.nivel_txt+'</i> <br> <b>Observaciones: </b> <i>'+item.descripcion+'</i><hr>';
				$("#divGrupoInfoRead").html(HTML);

				setColorBox1(item.color);
				getAlumnosGrupos(item.id);				
			});             
		}
	});

	return false;
}
/** FIN */



/* ESTAS FUNCIONES CARGAN LA INFORMACION EN MODO EDICION */
function editCalendar(THIS){ // ESTA FUNCION ABRE EL FORMULARIO PARA EDITAR EL EVENTO DEL CALENDARIO
	var ID = $(THIS).attr("data-rel");
	loadInfoEventCalendar(ID);
}

function editGrupo(THIS){ // ESTA FUNCION ABRE EL FORMULARIO PARA EDITAR EL GRUPO DEL CALENDARIO
	var ID = $(THIS).attr("data-rel");
	
	app.sheet.open('.my_model_grupos');

	getOneSelectGrupo(ID); 
	getAlumnosCheckbox(ID, 0);
}

function editAlumno(THIS){ // ESTA FUNCION ABRE EL FORMULARIO PARA EDITAR EL ALUMNOS DEL CALENDARIO
	$("#iconImagenAlumno").hide();
	var ID = $(THIS).attr("data-rel");
	
	
	app.sheet.close('.my_modal_info_alumnos');
	app.sheet.open('.my_model_alumno');

	getOneAlumno(ID);
}
/** FIN */



/* ESTAS FUNCIONES NOS MUESTRAN LA INFORMACION DE UN SOLO ITEM */
function getOneGrupo(IDGRUPO){
	$.ajax({
		type: 'get',
		headers: {"Authorization": localStorage.getItem("LS_USER_API_KEY")},
		url: URL_SERVER+"grupoOne/"+IDGRUPO,
		dataType: 'json',
		statusCode: { 
			401: function (error) { 
				app.loginScreen.open('.ap-login-screen');
			} 
		},
		success: function (data){  
			$.each(data.GrupoItem, function(index, item) {
				$("#txtIdGrupoAlumno").val(item.id);
				$("#txtNameGrupo").val(item.nombre);
				$("#txtDescripcionGrupo").val(item.descripcion);
				setColorBox1(item.color);
				getAlumnosGrupos(item.id);
			});             
		}
	});

	return false;
}

function getOneSelectGrupo(IDGRUPO){ // FUNCION QUE CARGA LA INFORMACION DEL GRUPO SELECCIONADO
	$.ajax({
		type: 'get',
		headers: {"Authorization": localStorage.getItem("LS_USER_API_KEY")},
		url: URL_SERVER+"grupoOne/"+IDGRUPO,
		dataType: 'json',
		statusCode: { 
			401: function (error) { 
				app.loginScreen.open('.ap-login-screen');
			} 
		},
		success: function (data){  
			$.each(data.GrupoItem, function(index, item) {
				$("#lblHeaderGrupo").html(item.nombre);
				$("#txtIdGrupoAlumno").val(item.id);
				$("#txtNameGrupo").val(item.nombre);
				$("#txtDescripcionGrupo").val(item.descripcion);
				setColorBox1(item.color);
				$("#txtColorCalendar").val(item.color);
				$("#divBotomGrupoEliminar").show();
				$("#btnDeleteGrupo").attr("data-id", item.id);

				$('.txtCalendarNivel option[value="'+item.nivel+'"]').attr("selected", "selected");
				comboPlanificacionCalendar(item.nivel, item.planificacion);

				getAlumnosGrupos(item.id);
			});             
		}
	});

	return false;
}

function getOneAlumno(IDALUMNO){ // ESTA FUNCION CARGA LOS DATOS DEL ALUMNO SELECCIONADO
	$.ajax({
		type: 'get',
		headers: {"Authorization": localStorage.getItem("LS_USER_API_KEY")},
		url: URL_SERVER+"alumnoOne/"+IDALUMNO,
		dataType: 'json',
		statusCode: { 
			401: function (error) { 
				app.loginScreen.open('.ap-login-screen');
			} 
		},
		success: function (data){  
			$("#divBotomComiteTecnico2").show();
			$.each(data.AlumnoItem, function(index, item) { 
				if(item.nacimiento == "00/00/0000"){
					NACIMIENTO = new Date();
					calendarNacimiento.setValue([NACIMIENTO]);
				}else{
					var str = item.nacimiento;
					var nac = str.split("/");

					var ANO = nac[2];
					var MES = nac[1] == 1 ? 0 : nac[1] - 1;
					var DIA = nac[0];

					NACIMIENTO = new Date(ANO, MES, DIA);
					calendarNacimiento.setValue([NACIMIENTO]);
				}
				

				$('#imgAlumnoCalendar').attr('src','https://aulapadel.com/services/users/alumnos/'+item.id+'.jpg');
				$('#imgAlumnoCalendar').css('opacity', 1);
				$("#txtNameAlumno").val(item.nombres);
				$("#txtIdAlumno").val(item.id);
				$("#txtLastNameAlumno").val(item.apellidos);
				$("#txtNacimiento").val(item.nacimiento);
				$("#txtPhoneAlumno").val(item.telefono);
				$("#txtEmailAlumno").val(item.email);
				$('#txtNivelAlumno option[value="'+item.nivel+'"]').attr("selected", "selected");
				$("#txtDireccionAlumno").val(item.observaciones);
				$("#btnComiteTecnico").attr("data-id", item.id);
				$("#btnDeleteAlumno").attr("data-id", item.id);
				
			});             
		}
	});
  
	return false;	
}
/** FIN */



/* ESTAS FUNCIONES SE ENCARGAN DE EXPORTAR Y COMPARTIR */
function savePdf(ID, NOMBRE){
	var NOMBRE_ALUMNO = $("#titleAlumnoRead").text();
	pdfdoc.fromHTML($("#"+ID).html(), 10, 10, {
		'width': 110,
		'elementHandlers': specialElementHandlers
	});
	pdfdoc.save(NOMBRE_ALUMNO.replace(/ /g, "")+'_'+NOMBRE+'.pdf');

	return false;
}

function genPDF(){
	html2canvas(document.body,{
   		onrendered:function(canvas){
			var img=canvas.toDataURL("image/png");
   			var doc = new jsPDF();
   			doc.addImage(img,'JPEG',20,20);
   			doc.save('test.pdf');
   		}
	});
}
/** FIN */


/** INICIO FUNCIONES PARA MI PLANIFICACION */
function addMiPlanificacion(){
	$.ajax({
		type: "GET",
		headers: {"Authorization": localStorage.getItem("LS_USER_API_KEY")},
		url: URL_SERVER+"tengoAcceso/mod_cloud",
		dataType: 'json',
		success: function (data){
			if(data.tengo_acceso == "SI"){
				if(data.error_mod == true){
					app.dialog.alert(data.num_mensaje);
				}else{
					////////////////////////////////
					$.ajax({
						type: "POST",
						headers: {"Authorization": localStorage.getItem("LS_USER_API_KEY")},
						url: URL_SERVER+"planificacionUser",
						dataType: 'json',
						statusCode: { 
							401: function (error) { 
								app.loginScreen.open('.ap-login-screen');
							} 
						},
						success: function (data){  				
							//app.dialog.alert(data.message);     
							loadMiPlanificacion();       
						}
					});
					////////////////////////////////
				}
			}else{
				app.dialog.alert(data.mensaje);
			}
								
		}
	});	
}

function updateMiPlanificacion(THIS, IDs){
	var TEXTO = $("#txtCloud"+IDs).val();
	$.ajax({
		type: "PUT",
		headers: {"Authorization": localStorage.getItem("LS_USER_API_KEY")},
		url: URL_SERVER+"planificacionUser",
		dataType: 'json',
		data: '&txtId='+IDs+'&txtMiCategoria='+TEXTO,
		statusCode: { 
			401: function (error) { 
				app.loginScreen.open('.ap-login-screen');
			} 
		},
		success: function (data){  				
			//app.dialog.alert(data.message);      
		}
	});
}

function modeEditMiPlanificacion(){
	var API_USER = localStorage.getItem("LS_USER_API_KEY");
	var HTML = "";

	$("#divMenuPlanificacionUser").html(HTML);

	$.ajax({
		type: "GET",
		headers: {"Authorization": API_USER},
		url: URL_SERVER+"planificacionUser/0/0",
		dataType: 'json',
		success: function (data){
			HTML += '<div class="data-table card">';
			HTML += '<table>';
			HTML += '<thead>';
			HTML += '<tr>';
			HTML += '<th class="label-cell">Planificación</th>';
			HTML += '<th> <a href="#" class="link" onclick="loadMiPlanificacion();"><i class="icon f7-icons">cloud_upload</i></a> </th>';
			HTML += '</tr>';
			HTML += '</thead>';
			HTML += '<tbody>';

			$.each(data.PLANIFICACION, function(index, item) {
				if(data.PLANIFICACION == ""){
					HTML = "<li> <p style=\"text-align:center;\">Añadir una Planificación en el boton <b>+</b></p> </li>";
				}else{
					HTML += "<tr>";
					HTML += "<td>";
					HTML += '<input type="text" id="txtCloud'+item.id+'" value="'+ item.titulo +'" onkeyup="updateMiPlanificacion(this, '+item.id+');" />';                              
					HTML += "</td>";
					HTML += "<td>";
					// HTML += '<a href="#" class="link" onclick="updateMiPlanificacion(this, '+item.id+');"><i class="icon f7-icons">check_round</i></a> ';
					HTML += ' <a href="#" class="link" onclick="deleteMiPlanificacion(this, '+item.id+');"><i class="icon f7-icons" style="color:red;">delete_round_fill</i></a>';
					HTML += "</td>";
					HTML += "</tr>";
				}

				
			});

			HTML += '</tbody>';
			HTML += '</table>';
			HTML += '</div>';
			
			$("#divMenuPlanificacionUser").html(HTML);
		}
	});		

}

function loadMiPlanificacion(){
	var API_USER = localStorage.getItem("LS_USER_API_KEY");
	var HTML = "";

	$.ajax({
		type: "GET",
		headers: {"Authorization": API_USER},
		url: URL_SERVER+"planificacionUser/0/0",
		dataType: 'json',
		success: function (data){
			$.each(data.PLANIFICACION, function(index, item) {
				HTML += "<li>";
				HTML += "<a href=\"/MAIN-NIVELES-USER/"+ item.id +"/0/\" data-view=\".view-main\" class=\"item-link item-content\" onclick=\"localStorage.setItem('LS_TXT_PLANIFICACION_USER', '"+ item.titulo +"');\">";                              
				HTML += "<div class=\"item-inner\">";
				HTML += "<div class=\"item-title\">"+ item.titulo +"</div>";
				HTML += "</div>";
				HTML += "</a>";
				HTML += "</li>";
			});   
			
			$("#divMenuPlanificacionUser").html(HTML);
		}
	});        
	app.dialog.alert("Cambios realizados con exito.");          
}

function myPlanificacion(THIS){
	var IDCATEGORIA = $(THIS).attr("data-rel");
	var TIPO = IDCATEGORIA == 0 ? "POST" : "PUT";
	var form_data = $("#myFormCategoriasPlanificacion").serialize() + "&txtId="+IDCATEGORIA;

	$.ajax({
		type: TIPO,
		headers: {"Authorization": localStorage.getItem("LS_USER_API_KEY")},
		url: URL_SERVER+"planificacionUser",
		dataType: 'json',
		data:form_data,
		statusCode: { 
			401: function (error) { 
				app.loginScreen.open('.ap-login-screen');
			} 
		},
		success: function (data){  
				
			app.dialog.alert(data.message);     
			loadMiPlanificacion();       
		}
	});

	return false;
}

function loadMiCategoria(IDs, TITULO){
	localStorage.setItem('LS_TXT_PLANIFICACION_USER', TITULO);
	$("#btnMiCategoriasSave").attr("data-rel", IDs);
	$("#btnDeleteMiPlanificacion").attr("data-id", IDs);
	$("#txtIdMiCategoria").val(IDs);

	$.ajax({
		type: "get",
		headers: {"Authorization": localStorage.getItem("LS_USER_API_KEY")},
		url: URL_SERVER+"planificacionUser/"+IDs,
		dataType: 'json',
		statusCode: { 
			401: function (error) { 
				app.loginScreen.open('.ap-login-screen');
			} 
		},
		success: function (data){  
			$("#txtIdMiCategoria").val(data.id);
			$("#txtMiCategoria").val(data.titulo);
			$("#txtDescripcionMiCategoria").val(data.descripcion);  
			$("#divDeleteMiPlanificacion").show();      
		}
	});

	return false;
}

function deleteMiPlanificacion(THIS, IDs){

	if(IDs == 0){
		app.dialog.alert("Tienes que seleccionar una categoria.");
	}else{
		app.dialog.confirm('Seguro que desea eliminar esta categoria?', function () {
			$.ajax({
				type: "DELETE",
				headers: {"Authorization": localStorage.getItem("LS_USER_API_KEY")},
				url: URL_SERVER+"planificacionUser/"+IDs,
				dataType: 'json',
				statusCode: { 
					401: function (error) { 
						app.loginScreen.open('.ap-login-screen');
					} 
				},
				beforeSend: function(){ app.preloader.show(); },
				success: function (data){
					$(THIS).closest('tr').remove();
					app.dialog.alert(data.message);
					app.preloader.hide();
					
				},error: function (xhr, status, errorThrown) {
					a = _projectTexts.get();
					app.dialog.alert("Code: "+xhr.status+"<br>"+a.t_error_server);
					app.preloader.hide();
				}
			});
			
		});

	}
}
/** FIN FUNCIONES PARA MI PLANIFICACION */


function loadMiPlanificacionNiveles(ID){
	var API_USER = localStorage.getItem("LS_USER_API_KEY");
	//localStorage.setItem("LS_USER_CLOUD_IDs", ID);
	
	$("#btnEditMiCLoud").attr("data-id", ID);
    $("#btnAddMiCLoud").attr("data-id", ID);

	var HTML = "";
	$.ajax({
		type: "GET",
		headers: {"Authorization": API_USER},
		url: URL_SERVER+"planificacionUser/"+ID+"/0",
		dataType: 'json',
		success: function (data){
			$.each(data.PLANIFICACION, function(index, item) {
				HTML += "<li>";
				HTML += "<a href=\"/MAIN-TRIMESTRES-USER/"+ item.id +"/1/\" data-view=\".view-main\" class=\"item-link item-content\" onclick=\"localStorage.setItem('LS_TXT_NIVEL_USER', '"+ item.titulo +"');\">";                              
				HTML += "<div class=\"item-media\"><i class=\"f7-icons\">collection</i></div>";
				HTML += "<div class=\"item-inner\">";
				HTML += "<div class=\"item-title\">"+ item.titulo +"</div>";
				HTML += "</div>";
				HTML += "</a>";
				HTML += "</li>";
			});   
			
			$("#divMenuPlanificacionNivelesUser").html(HTML);
		}
	});                  
}

function modeEditMiCloud(THIS, TIPO){
	var regex = /(\d+)/g;
	var API_USER = localStorage.getItem("LS_USER_API_KEY");
	var IDCLOUD  = $(THIS).attr("data-id");
	var HTML = "";

	if(TIPO == "SEMANAS"){
		$("#divMenuPlanificacionNivelesTrimestresSemanasUser").html(HTML);

		$.ajax({
			type: "GET",
			headers: {"Authorization": API_USER},
			url: URL_SERVER+"planificacionUser/"+IDCLOUD+"/"+localStorage.getItem("LS_TXT_TRIMESTRE_USER"),
			dataType: 'json',
			success: function (data){
				HTML += '<div class="data-table card">';
				HTML += '<table>';
				HTML += '<thead>';
				HTML += '<tr>';
				HTML += '<th class="label-cell">'+TIPO+'</th>';
				HTML += '<th> <a href="#" class="link" onclick="loadMiCloudSemanas('+IDCLOUD+', '+localStorage.getItem("LS_TXT_TRIMESTRE_USER")+');"><i class="icon f7-icons">cloud_upload</i></a> </th>';
				HTML += '</tr>';
				HTML += '</thead>';
				HTML += '<tbody>';

				$.each(data.PLANIFICACION, function(index, item) {
					HTML += "<tr>";
					HTML += "<td>";
					HTML += '<input type="text" id="txtCloud'+item.id+'" value="'+ item.titulo +'" onkeyup="updateMiCloud(this, '+item.id+', \''+TIPO+'\');" />';                              
					HTML += "</td>";
					HTML += "<td>";
					// HTML += "<a href=\"#\" class=\"link\" onclick=\"updateMiCloud(this, "+item.id+", '"+TIPO+"');\"><i class=\"icon f7-icons\">check_round</i></a> ";
					HTML += " <a href=\"#\" class=\"link\" onclick=\"deleteMiCloud(this, "+item.id+", '"+TIPO+"');\"><i class=\"icon f7-icons\" style=\"color:red;\">delete_round_fill</i></a>";
					HTML += "</td>";
					HTML += "</tr>";
				});

				HTML += '</tbody>';
				HTML += '</table>';
				HTML += '</div>';
				
				$("#divMenuPlanificacionNivelesTrimestresSemanasUser").html(HTML);
			}
		});	
	}else if(TIPO == "ITEMS"){
		$("#liItemliItemsDivOtrosDivUser"+IDCLOUD).html(HTML);

		$.ajax({
			type: "GET",
			headers: {"Authorization": API_USER},
			url: URL_SERVER+"planificacionItemsUser/"+IDCLOUD+"/3",
			dataType: 'json',
			success: function (data){
				HTML += '<div class="data-table card">';
				HTML += '<table>';
				HTML += '<thead>';
				HTML += '<tr>';
				HTML += '<th class="label-cell">'+TIPO+'</th>';
				HTML += '<th> <a href="#" class="link" onclick="loadMiCloudItems('+IDCLOUD+');"><i class="icon f7-icons">document_check</i> Listo</a> </th>';
				HTML += '</tr>';
				HTML += '</thead>';
				HTML += '<tbody>';

				$.each(data.PLANIFICACIONITEM, function(index, item) {
					HTML += "<tr>";
					HTML += "<td>";
					HTML += '<input type="text" id="txtCloud'+item.id+'" value="'+ item.item +'"/>';                              
					HTML += "</td>";
					HTML += "<td>";
					HTML += "<a href=\"#\" class=\"link\" onclick=\"updateMiCloud(this, "+item.id+", '"+TIPO+"');\"><i class=\"icon f7-icons\">check_round</i></a> ";
					HTML += " <a href=\"#\" class=\"link\" onclick=\"deleteMiCloud(this, "+item.id+", '"+TIPO+"');\"><i class=\"icon f7-icons\" style=\"color:red;\">delete_round_fill</i></a>";
					HTML += "</td>";
					HTML += "</tr>";
				});

				HTML += '</tbody>';
				HTML += '</table>';
				HTML += '</div>';
				
				$("#liItemliItemsDivOtrosDivUser"+IDCLOUD).html(HTML);

				/*var H = $("#liItemliItemsDivOtrosDiv"+IDCLOUD).parent().height();
				var I = H + 50;
				$("#liItemliItemsDivOtrosDiv"+IDCLOUD).parent().css("max-height", I+"px");*/
			}
		});	

	}else{
		$("#divMenuPlanificacionNivelesUser").html(HTML);

		$.ajax({
			type: "GET",
			headers: {"Authorization": API_USER},
			url: URL_SERVER+"planificacionUser/"+IDCLOUD+"/0",
			dataType: 'json',
			success: function (data){
				HTML += '<div class="data-table card">';
				HTML += '<table>';
				HTML += '<thead>';
				HTML += '<tr>';
				HTML += '<th class="label-cell">'+TIPO+'</th>';
				HTML += '<th> <a href="#" class="link" onclick="loadMiPlanificacionNiveles('+IDCLOUD+');"><i class="icon f7-icons">cloud_upload</i></a> </th>';
				HTML += '</tr>';
				HTML += '</thead>';
				HTML += '<tbody>';

				$.each(data.PLANIFICACION, function(index, item) {
					HTML += "<tr>";
					HTML += "<td>";
					HTML += '<input type="text" id="txtCloud'+item.id+'" value="'+ item.titulo +'" onkeyup="updateMiPlanificacion(this, '+item.id+', \''+TIPO+'\');" />';                              
					HTML += "</td>";
					HTML += "<td>";
					//HTML += "<a href=\"#\" class=\"link\" onclick=\"updateMiPlanificacion(this, "+item.id+", '"+TIPO+"');\"><i class=\"icon f7-icons\">check_round</i></a> ";
					HTML += " <a href=\"#\" class=\"link\" onclick=\"deleteMiCloud(this, "+item.id+", '"+TIPO+"');\"><i class=\"icon f7-icons\" style=\"color:red;\">delete_round_fill</i></a>";
					HTML += "</td>";
					HTML += "</tr>";
				});

				HTML += '</tbody>';
				HTML += '</table>';
				HTML += '</div>';
				
				$("#divMenuPlanificacionNivelesUser").html(HTML);
			}
		});	
	}

	

}

function addMiCloud(THIS, TIPO){
	var IDCLOUD       = $(THIS).attr("data-id"); //TIPO == "ITEMS" ? $(THIS).attr("data-id") : 0; 
	var SEMANA        = localStorage.getItem("LS_TXT_SEMANA_USER");
 	var TRIMESTRE     = localStorage.getItem("LS_TXT_TRIMESTRE_USER");
 	var PLANIFICACION = localStorage.getItem("LS_TXT_NIVEL_USER_ID");
	var form_data = "txtTipo="+TIPO+"&txtId="+IDCLOUD+"&txtSemana="+SEMANA+"&txtTrimestre="+TRIMESTRE+"&txtPlanificacion="+PLANIFICACION;

	if(TIPO == "NIVELES"){
		$.ajax({
			type: "GET",
			headers: {"Authorization": localStorage.getItem("LS_USER_API_KEY")},
			url: URL_SERVER+"tengoAcceso/mod_cloud_nivel",
			dataType: 'json',
			success: function (data){
				if(data.tengo_acceso == "SI"){
					if(data.error_mod == true){
						app.dialog.alert(data.num_mensaje);
					}else{
						////////////////////////////////
						$.ajax({
							type: "POST",
							headers: {"Authorization": localStorage.getItem("LS_USER_API_KEY")},
							url: URL_SERVER+"micloud",
							dataType: 'json',
							data:form_data,
							statusCode: { 
								401: function (error) { 
									app.loginScreen.open('.ap-login-screen');
								} 
							},
							success: function (data){  	
								loadMiPlanificacionNiveles(PLANIFICACION);
								app.dialog.alert(data.message);         
							}
						});
						////////////////////////////////
					}
				}else{
					app.dialog.alert(data.mensaje);
				}
									
			}
		});	
	}else{
		$.ajax({
			type: "POST",
			headers: {"Authorization": localStorage.getItem("LS_USER_API_KEY")},
			url: URL_SERVER+"micloud",
			dataType: 'json',
			data:form_data,
			statusCode: { 
				401: function (error) { 
					app.loginScreen.open('.ap-login-screen');
				} 
			},
			success: function (data){  	
				if(TIPO == "SEMANAS"){
					loadMiCloudSemanas(IDCLOUD, TRIMESTRE);
				}	
				
				if(TIPO == "NIVELES"){
					loadMiPlanificacionNiveles(PLANIFICACION);
				}
				
				if(TIPO == "ITEMS"){
					loadMiCloudItems(IDCLOUD);
				}
				app.dialog.alert(data.message);         
			}
		});
	}

	return false;
}

function updateMiCloud(THIS, IDCLOUD, TIPO) {
	var VALOR = $("#txtCloud"+IDCLOUD).val();
	var form_data = "txtValor="+VALOR+"&txtTipo="+TIPO+"&txtId="+IDCLOUD;

	$.ajax({
		type: "PUT",
		headers: {"Authorization": localStorage.getItem("LS_USER_API_KEY")},
		url: URL_SERVER+"micloud",
		dataType: 'json',
		data:form_data,
		statusCode: { 
			401: function (error) { 
				app.loginScreen.open('.ap-login-screen');
			} 
		},
		success: function (data){  			  
			//app.dialog.alert(data.message);
		}
	});

	return false;
}

function deleteMiCloud(THIS, IDs, TIPO){

	if(IDs == 0){
		app.dialog.alert("Tienes que seleccionar una registro.");
	}else{
		app.dialog.confirm('Seguro que desea eliminar este registro?', function () {
			$.ajax({
				type: "DELETE",
				headers: {"Authorization": localStorage.getItem("LS_USER_API_KEY")},
				url: URL_SERVER+"micloud/"+IDs+"/"+TIPO,
				dataType: 'json',
				statusCode: { 
					401: function (error) { 
						app.loginScreen.open('.ap-login-screen');
					} 
				},
				beforeSend: function(){ app.preloader.show(); },
				success: function (data){
					app.dialog.alert(data.message);
					$(THIS).closest('tr').remove();
					app.preloader.hide();
					
				},error: function (xhr, status, errorThrown) {
					a = _projectTexts.get();
					app.dialog.alert("Code: "+xhr.status+"<br>"+a.t_error_server);
					app.preloader.hide();
				}
			});
			
		});

	}
}

function loadMiCloudSemanas(ID, TRIMESTRES){
	$("#txtTitulo").html( localStorage.getItem("LS_TXT_PLANIFICACION_USER")+" "+localStorage.getItem("LS_TXT_NIVEL_USER") );
	$("#txtTrimestre").html( localStorage.getItem("LS_TXT_TRIMESTRE_USER")+" TRIMESTRE");

	$("#btnEditMiCLoud").attr("data-id", ID);
	$("#btnAddMiCLoud").attr("data-id", ID);

	var API_USER = localStorage.getItem("LS_USER_API_KEY");
	var HTML = "";
	$.ajax({
		type: "GET",
		headers: {"Authorization": API_USER},
		url: URL_SERVER+"planificacionUser/"+ID+"/"+TRIMESTRES,
		dataType: 'json',
		success: function (data){
			$.each(data.PLANIFICACION, function(index, item) {
				HTML += "<li onclick=\"localStorage.setItem('LS_TXT_SEMANA_USER', '"+ item.id_semana +"');\">";
				HTML += '<a href="/MAIN-SEMANAS-ITEMS-USER/'+item.id+'/'+item.id_semana+'/" data-view=".view-main" class=" item-content">';
				HTML += '<div class="item-media"><i class="f7-icons">bookmark</i></div>';
				HTML += '<div class="item-inner">';
				HTML += '<div class="item-title-row">';
				HTML += '<div class="item-title">SEMANA '+ item.id_semana +'</div>';
				HTML += '</div>';
				HTML += '<div class="item-text">'+ item.descripcion +'</div>';
				HTML += '</div>';
				HTML += '</a>';
				HTML += '<div class="sortable-handler"></div>';
				HTML += '</li>';
			});   
			
			$("#divMenuPlanificacionNivelesTrimestresSemanasUser").html(HTML);
		}
	});                  
}

function loadMiCloudItems(IDITEM2){
	var HTML3 = "";
	$("#liItemliItemsDivOtrosDivUser"+IDITEM2).html("");

	$.ajax({
		type: "GET",
		headers: {"Authorization": localStorage.getItem("LS_USER_API_KEY")},
		url: URL_SERVER+"planificacionItemsUser/"+IDITEM2+"/3",
		dataType: 'json',
		success: function (data){
			$.each(data.PLANIFICACIONITEM, function(index, item) {
				var EYE    = item.lotengo == 0 ? "" : '<i class="f7-icons">eye</i>';
				var CREADO = item.creado == 0 ? "" : 'style="font-weight: bold;"';
				HTML3 += "<li><a href=\"#\" class=\"item-link\" "+CREADO+" data-edit="+item.edit+" onclick=\"abrir_ejercicio_desde_planificacionUser('"+item.id+"');\">"+ item.item + " " + EYE +"</a></li>";
			});

			$("#liItemliItemsDivOtrosDivUser"+IDITEM2).html(HTML3);
			var H = $("#liItemliItemsDivOtrosDivUser"+IDITEM2).parent().height(); //("max-height");
			var I = H + 50;
			$("#liItemliItemsDivOtrosDivUser"+IDITEM2).parent().css("max-height", I+"px");
		}
	});
}