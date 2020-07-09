routes = [
    {
      path: '/',
      url: './index.html',
    },{
      path: '/AP-LOGIN/',
      componentUrl:  './pages/ap_login.html',
    },{
      path: '/AP-REGISTER/',
      componentUrl:  './pages/ap_register.html',
    },{
      path: '/AP-POLITICA/',
      componentUrl:  './pages/ap_politica_privacidad.html',
    },{
      path: '/AP-TERMINOS-USO/',
      componentUrl:  './pages/ap_terminos_uso.html',
    },{
      path: '/AP-CANCELACION/',
      componentUrl:  './pages/ap_cancelacion.html',
    },{
      path: '/AP-LICENCIAS/',
      componentUrl:  './pages/ap_licencias.html',
    },{
      path: '/AP-PROFILER/',
      componentUrl:  './pages/ap_profiler.html',
    },{
      path: '/AP-SOPORTE/',
      componentUrl:  './pages/ap_soporte.html',
    },{
      name: 'AP_CONTACTO',
      path: '/AP-CONTACTO/:txt/',
      component:  './pages/ap_contacto.html',
    },

    // LOADER LEFT
    {
      id:   'left-tab1',
      path: '/LEFT-MENU/',
      url:  './pages/left_menu.html',
    },{
      id:   'left-tab2',
      path: '/LEFT-CONFIG/',
      url:  './pages/left_configuration.html',
    },{
      path: '/LEFT-CENTRO-ENTRENAMIENTO/',
      url:  './pages/left_centro_entrenamiento.html',
    },

    // VIDEO LIBRO
    {
      path: '/VIDEO-LIBRO/',
      componentUrl:  './pages/libro/libro.html',
    },{
      name: 'VIDEO_LIBRO_ITEMS',
      path: '/VIDEO-LIBRO-ITEMS/:id/',
      component:  './pages/libro/libro_items.html',
    },{
      name: 'VIDEO_LIBRO_ITEMS_CONSEJOS',
      path: '/VIDEO-LIBRO-ITEMS-CONSEJOS/:id/',
      component:  './pages/libro/libro_items_consejos.html',
    },
    
    // VIDEO EJERCICIOS
    {
      path: '/AP-EJERCICIOS/',
      componentUrl:  './pages/ejercicios/ejercicios.html',
    },

    // CALENDARIO
    {
      path: '/AP-CALENDAR/',
      componentUrl:  './pages/calendar/calendar.html',
    },

    // LOADER MAIN
    {
        path: '/RIGHT-EJECICIOS/',
        url:  './pages/right_ejercicios.html',
    },{
        name: 'MAIN_MENU',
        path: '/MAIN-MENU/',
        component:  './pages/planificacion/main_menu.html',
    },{
        name: 'NIVELES_MENU',
        path: '/MAIN-NIVELES/:idc/:trimestre/',
        component:  './pages/planificacion/menu_niveles.html',
    },{
        name: 'NIVELES_TRIMESTRES',
        path: '/MAIN-TRIMESTRES/:idc/:trimestre/',
        component:  './pages/planificacion/menu_trimestres.html',
    },{
        name: 'NIVELES_TRIMESTRES_SEMANAS',
        path: '/MAIN-SEMANAS/:idc/:trimestre/',
        component:  './pages/planificacion/menu_semanas.html',
    },{
        name: 'NIVELES_TRIMESTRES_SEMANAS_ITEMS',
        path: '/MAIN-SEMANAS-ITEMS/:idc/:trimestre/:TITLE/',
        component:  './pages/planificacion/menu_semanas_items.html',
    },{
      name: 'NIVELES_TRIMESTRES_SEMANAS_ITEMS_CALENDAR',
      path: '/MAIN-SEMANAS-ITEMS-CALENDAR/:idc/:trimestre/',
      component:  './pages/planificacion/menu_semanas_items_calendar.html',
    },

    // MIS PLANIFICACIONES
    {
      name: 'MIS_PLANIFICACIONES',
      path: '/MIS-PLANIFICACIONES/',
      component: './pages/miplanificacion/home.html',
    },{
      name: 'NIVELES_MENU_USER',
      path: '/MAIN-NIVELES-USER/:idc/:trimestre/',
      component:  './pages/miplanificacion/menu_niveles_user.html',
    },{
      name: 'NIVELES_TRIMESTRES_USER',
      path: '/MAIN-TRIMESTRES-USER/:idc/:trimestre/',
      component:  './pages/miplanificacion/menu_trimestres_user.html',
    },{
      name: 'NIVELES_TRIMESTRES_SEMANAS_USER',
      path: '/MAIN-SEMANAS-USER/:idc/:trimestre/',
      component:  './pages/miplanificacion/menu_semanas_user.html',
    },{
      name: 'NIVELES_TRIMESTRES_SEMANAS_ITEMS_USER',
      path: '/MAIN-SEMANAS-ITEMS-USER/:idc/:trimestre/',
      component:  './pages/miplanificacion/menu_semanas_items_user.html',
    },

    // OTROS
    {
      name: 'PAGOS_LICENCIA',
      path: '/PAGOS-LICENCIA/:euros/:tipo/',
      component:  './pages/ap_pagos.html',
    },



    {
      path: '(.*)',
      url: './index.html', // './pages/404.html',
    },
];