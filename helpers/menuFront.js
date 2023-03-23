const getMenuFrontEnd = ( role = 'USER_ROLE' )=> {
    const menu =  [
        {
          title: 'Dashboard',
          icon: 'mdi mdi-gauge',
          submenu: [
            { title: 'Main', url:'/' },
            { title: 'ProgressBar', url:'progress' },
            { title: 'Graficas', url:'grafica1' },
            { title: 'Promesas', url:'promesas' },
            { title: 'RxJS', url:'rxjs' }
          ]
        },
        {
          title: 'Mantenimiento',
          icon: 'mdi mdi-folder-lock-open',
          submenu: [
            //{ title: 'Usuarios', url:'usuarios' },
            { title: 'Hospitales', url:'hospitales' },
            { title: 'Médicos', url:'medicos' }        
          ]
        }
    ];

    if (role === 'ADMIN_ROLE') {
        menu[1].submenu.push(
            { title: 'Usuarios', url:'usuarios' }
        )
    }
    return menu

}

module.exports = {
    getMenuFrontEnd
}