//VALIDADOR DE RUT

let rutInput = document.getElementById('rut');
let submitBtn = document.getElementById('submit-btn-vali');
let validacionRut = document.getElementById('validacion-rut');

rutInput.addEventListener('input', function() {

  let rut = this.value;

  if(/^[0-9]{7,8}-[0-9Kk]{1}$/.test(rut) && validarRut(rut) && !esRutConDigitosIguales(rut)) {
    submitBtn.disabled = false;
    }else{
        submitBtn.disabled = true;
    }
    
});

function validarRut(rut) {

    let [numero, digitoVerificador] = rut.split('-');
    let suma = 0;
    let multiplicador = 2;

    for (let i = numero.length - 1; i >= 0; i--) {
      suma += multiplicador * numero.charAt(i);
      multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
    }

    let resto = suma % 11;
    let digitoCalculado = 11 - resto;
    if (digitoCalculado === 11) {
      digitoCalculado = '0';
    } else if (digitoCalculado === 10) {
      digitoCalculado = 'K';
    }

    return digitoCalculado.toString() === digitoVerificador.toUpperCase();
  }

  function esRutConDigitosIguales(rut) {
    let [numero] = rut.split('-');
    return numero.split('').every(d => d === numero[0]);
}