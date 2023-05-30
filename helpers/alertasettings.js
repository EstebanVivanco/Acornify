  document.getElementById('myLink').addEventListener('click', function(e) {
    e.preventDefault(); // Evita que el enlace se comporte como un enlace normal

    // Utiliza SweetAlert para mostrar la alerta con dos botones
    swal({
      title: 'Alerta con dos botones',
      text: 'Mensaje de la alerta',
      buttons: {
        cancel: 'Cancelar',
        confirm: 'Aceptar'
      },
      closeOnClickOutside: false
    }).then(function(value) {
      if (value) {
        // Si se hace clic en "Aceptar", realiza alguna acción aquí
        console.log('Se hizo clic en Aceptar');
      } else {
        // Si se hace clic en "Cancelar", realiza alguna acción aquí
        console.log('Se hizo clic en Cancelar');
      }
    });
  });
