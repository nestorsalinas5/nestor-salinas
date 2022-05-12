function reloj() {
	//Variables
	horareal = new Date()
	hora = horareal.getHours()
	minuto = horareal.getMinutes()
	segundo = horareal.getSeconds()
	... Codigo para mostrar el reloj en pantalla
	verhora = hora + " : " + minuto + " : " + segundo
	document.reloj_javascript.reloj.value = verhora
	setTimeout("reloj()",1000)
}