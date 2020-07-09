function compartirComiteTecnico(){
    app.preloader.show();
    var idEntrenador = localStorage.getItem("LS_USER_ID");
    var idAlumno     = jQuery("#btnEditAlumno").attr("data-rel");
    window.plugins.socialsharing.share('Comite Tecnico', 'Comite Tecnico', 'http://aulapadel.com/services/api/comiteTecnico/index.php?idEntrenador='+idEntrenador+'&idAlumno='+idAlumno);
    setTimeout(function(){ app.preloader.hide(); }, 20000);

    return false;
}