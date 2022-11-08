// CREAMOS LAS VARIABLES DE FECHA
let hoy = new Date();
let numDia = hoy.getDate();
let mes = hoy.getMonth();
let año = hoy.getFullYear();

// CUERPO DEL CALENDARIO
let calendario = document.getElementById("dias");

let meses = [
	"Enero",
	"Febrero",
	"Marzo",
	"Abril",
	"Mayo",
	"Junio",
	"Julio",
	"Agosto",
	"Septiembre",
	"Octubre",
	"Noviembre",
	"Diciembre"
];

// FUNCIONALIDAD DE BOTONES PARA RECORRER MES A MES
let sigbtn = document.getElementById("sig");
let prevBtn = document.getElementById("prev");

sigbtn.onclick = function() {
	sig();
};
prevBtn.onclick = function() {
	previo();
};



// INICIO DEL CALENDARIO
mostrarCalendario(mes, año);

function mostrarCalendario(mes, año) {
	// TOMANDO EL DIA QUE CORRESPONDE DE LA SEMANA
	let primerDia = new Date(año, mes).getDay();
	calendario.innerHTML = "";
	// SE CONTROLA LA CANTIDAD DE DIAS QUE TIENE EL MES, PARA EL LOOP DE DIAS
	let diasTotales = diasEnElMes(mes, año);
	
	// AGREGANDO LOS ESPACIOS EN BLANCO PARA QUE LA FECHA COMIENCE EN EL DIA CORRECTO DEL MES
	fechasVacias(primerDia);
	
	// AGREGANDO LAS FECHAS AL CALENDARIO
	for (let dia = 1; dia <= diasTotales; dia++) {
		
		let cell = document.createElement("li");

		//FUNCION HOVER PARA MOSTRAR EL DIA QUE SE SELECCIONA
		cell.addEventListener('mouseover', function(){
			document.getElementById("fecha").innerHTML = dia + "/" + (mes+1) + "/" + año;
		});

		
		// EN ESTE IF SE REALIZA LA COMPARACION PARA MARCAR LA CLASE CORRESPONDIENTE AL CURSADO DE LA MATERIA
        if(
            (
                (
                    ( año == 2022 && mes == 6 && dia >= 19) || ( año == 2022 && mes == 11 && dia <= 17)
                    ) 
                    ||año == 2022 && mes > 6 && mes < 11) 
                    )
            
            {
            cell.classList.add("cursado");
        }


		let cellText = document.createTextNode(dia);
		

		// CREANDO CLASE ACTIVO SI LA FECHA COINCIDE CON EL DIA DE HOY
		// MOSTRAMOS LA FECHA EN EL FOOTER
		if (
			numDia === dia &&
			mes === hoy.getMonth() &&
			año === hoy.getFullYear()
		) {
			cell.classList.add("activo");
			document.getElementById("hoy").innerHTML = numDia + "/" + (mes+1) + "/" + año;
		}
		

		//ANEXANDO LISTA DEL DIA AL CUERPO DEL CALENDARIO
		cell.appendChild(cellText);
		calendario.appendChild(cell);
	}



	// COLOCANDO EL NUMERO DEL MES CORRESPONDIENTE
	document.getElementById("mes").innerHTML = meses[mes];
	// COLOCANDO EL NUMERO DEL AÑO CORRESPONDIENTE
	document.getElementById("año").innerHTML = año;
}

function diasEnElMes(mes, año) {
	// EL NUMERO 0 RETORNA EL ULTIMA DIA DEL MES ANTERIOR
	return new Date(año, mes + 1, 0).getDate();
}

function fechasVacias(count) {
	// SE CREA UN LOOP PARA MOSTRAR LA CANTIDAD DE DIAS QUE CORRESPONDEN QUE ESTEN VACIOS
	for (let x = 0; x < count; x++) {
		let cell = document.createElement("li");
		let cellText = document.createTextNode("");
		cell.classList.add("vacia");	
		cell.appendChild(cellText);
		calendario.appendChild(cell);
	}
}

//FUNCION DE BOTON SIGUIENTE
function sig() {
	año = mes === 11 ? año + 1 : año;
	mes = (mes + 1) % 12;
	mostrarCalendario(mes, año);
}
//FUNCION DE BOTON PREVIO
function previo() {
	año = mes === 0 ? año - 1 : año;
	mes = mes === 0 ? 11 : mes - 1;
	mostrarCalendario(mes, año);
}

