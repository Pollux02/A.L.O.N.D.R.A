const btnStart = document.getElementById('miBoton');

const textArea = document.getElementById('textArea');

const recognition = new webkitSpeechRecognition();

var elemento = document.getElementById("textBox");

var textAnswerBox=document.getElementById("answer");

var respuesta = "";

let flag=true;

recognition.continuous = true;
recognition.lang = 'es-ES';
recognition.interimResult = false;

function iniciar(){ 
    dialogue = "Hola, me presento, soy Alondra. ¿En qué puedo ayudarte hoy?."
    leerTexto(dialogue);
    writeBox(2,dialogue);
}

btnStart.addEventListener('click', () => {
    if(flag == true){
        recognition.start();
        flag=false;
        btnStart.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ff0000" d="M192 0C139 0 96 43 96 96V256c0 53 43 96 96 96s96-43 96-96V96c0-53-43-96-96-96zM64 216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 89.1 66.2 162.7 152 174.4V464H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h72 72c13.3 0 24-10.7 24-24s-10.7-24-24-24H216V430.4c85.8-11.7 152-85.3 152-174.4V216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 70.7-57.3 128-128 128s-128-57.3-128-128V216z"/></svg>';

    }
    else{
        recognition.abort();
        flag=true
        btnStart.innerHTML ='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M192 0C139 0 96 43 96 96V256c0 53 43 96 96 96s96-43 96-96V96c0-53-43-96-96-96zM64 216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 89.1 66.2 162.7 152 174.4V464H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h72 72c13.3 0 24-10.7 24-24s-10.7-24-24-24H216V430.4c85.8-11.7 152-85.3 152-174.4V216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 70.7-57.3 128-128 128s-128-57.3-128-128V216z"/></svg>';
        respuesta = "Muy bien, ya no podré escucharte.";
        leerTexto(respuesta);
        writeBox(2,respuesta);
    }
});

recognition.onresult = (event) => {
    const texto = event.results[event.results.length - 1][0].transcript;
    procesarString(texto);
}
function writeBox(option,texto){
    texto+="<br>";
    if(option==1){
        elemento.innerHTML=texto;
    }
    else{
        textAnswerBox.innerHTML =texto;
    }
    

}

recognition.onerror = (event) => {
    console.error('Error de reconocimiento de voz:', event.error);
};

function leerTexto(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1.5;
    speech.lang = 'es-ES'

    window.speechSynthesis.speak(speech);
}

function traducirDescripcion(descripcion) {
    switch(descripcion.toLowerCase()) {
        case 'clear sky':
            return 'cielo despejado';
        case 'few clouds':
            return 'algunas nubes';
        case 'scattered clouds':
            return 'nubosidad dispersa';
        case 'broken clouds':
            return 'nubes dispersas';
        case 'overcast clouds':
            return 'nublado';
        case 'light rain':
            return 'lluvia ligera';
        case 'moderate rain':
            return 'lluvia moderada';
        case 'heavy intensity rain':
            return 'lluvia intensa';
        case 'snow':
            return 'nevando';
        case 'mist':
            return 'neblina';
        case 'thunderstorm':
            return 'tormenta eléctrica';
        case 'hail':
            return 'granizo';
        case 'drizzle':
            return 'llovizna';
        case 'wind':
            return 'viento fuerte';
        default:
            return 'descripción no disponible';
    }
}

function obtenerClima(ciudad) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&units=metric&appid=108dd9a67c96f23039937fe6f3c91963`;

    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const temperatura = data.main.temp;
                const descripcion = traducirDescripcion(data.weather[0].description);
                const respuesta = `La temperatura en ${ciudad} es de ${temperatura}°C. El clima es ${descripcion}.`;
                resolve(respuesta);
            })
            .catch(error => {
                reject("Ha ocurrido un error al consultar el clima en " + ciudad);
            });
    });
}

function procesarString(str) {
    var partes = str.toLowerCase().split("alondra");

    if (partes.length > 1) {
        writeBox(1,"Alondra" + partes[1]);
        ejecutarFuncion(partes[1])
    } else {
        console.log("No se escuchó alondra")
    }
}

async function ejecutarFuncion (text) {
    // Separar el texto en palabras
    const palabras = text.split(/\s+/);
    
    // Inicializar una variable para indicar si se encontró alguna palabra
    let palabraEncontrada = false;

    var index = -1;
    
    // Utilizar un switch para verificar cada palabra
    for (const palabra of palabras) {
        index = index+1;
        switch (palabra.toLowerCase()) {
            
            case "navegador":
                textArea.value = "Abriendo navegador";

                respuesta="Abriendo navegador"

                //si quieres que escriba en el recuadro de alondra pon el numero 2

                palabraEncontrada = true;
                break;
            case "página":
            case "abre":
            
                 // Crear una expresión regular para encontrar la palabra junto con todo lo que la precede
                const regex = new RegExp('.*?' + palabra, 'i');
                
                // Reemplazar todo lo que coincide con la expresión regular por una cadena vacía
                resultado = text.replace(regex, '');

                resultado = resultado.replace(/\s+/g, '');

                window.open('http://www.'+resultado+".com");

                //textArea.value = "Abriendo la página "+resultado;
                respuesta="Abriendo la página "+resultado;
                

                palabraEncontrada = true;
                break;
            case "busca":
            case "buscar":
            case "investiga":
            case "investigar":
            case "indagar":
                // Crear una expresión regular para encontrar la palabra "buscar" junto con todo lo que la sigue
                const regexBuscar = new RegExp('.*?' + palabra, 'i');
                
                // Reemplazar todo lo que coincide con la expresión regular por una cadena vacía
                resultado = text.replace(regexBuscar, '');
            
                // Abrir una nueva ventana o pestaña con la búsqueda en Google
                window.open('https://www.google.com/search?q=' + resultado);
                respuesta="buscando "+resultado +"en la web";
                palabraEncontrada = true;
                break;
                
            case "hola":
            case "holi":
                respuesta = "¡Hola!, en qué puedo ayudarte?";
                palabraEncontrada = true;
                break;
            case "¿qué":
                if (index < palabras.length - 1 && palabras[index + 1] === "tal?") {
                    respuesta = "¡Qué tal!, ¿cómo puedo ayudarte hoy?";
                    palabraEncontrada = true;
                }
                break;
            case "buenos":
                if (index < palabras.length - 1 && palabras[index + 1] === "días") {
                    respuesta = "¡Buenos dias!, ¿qué puedo hacer hoy por ti?";
                    palabraEncontrada = true;
                }
                break;
            case "buenas":
                if (index < palabras.length - 1 && palabras[index + 1] === "tardes") {
                    respuesta = "¡Buenas tardes!, un mundo de informacion nos espera, ¿en que puedo ayudarte?";
                    palabraEncontrada = true;
                }
                break;
            case "buenas":
                if (index < palabras.length - 1 && palabras[index + 1] === "noches") {
                    respuesta = "¡Buenas noches!, mañana será un gran día siempre y cuando durmamos durante un buen rato, pero por lo pronto a indagar en la web, ¿que puedo hacer por ti?";
                    palabraEncontrada = true;
                }
                break;
            case "encender":
                try {
                    // Realizar la solicitud HTTP para encender el LED
                    await fetch('http://192.168.100.4/on', { mode: 'no-cors' });
                    respuesta = "Encendiendo led";
                } catch (error) {
                    respuesta = "Ocurrió un error al encender el led.";
                }
                palabraEncontrada = true;
                break;
            case "apagar":
                try {
                    // Realizar la solicitud HTTP para apagar el LED
                    await fetch('http://192.168.100.4/off', { mode: 'no-cors' });
                    respuesta = "Apagando led";
                } catch (error) {
                    respuesta = "Ocurrió un error al apagar el led.";
                }
                palabraEncontrada = true;
                break;
            case "clima":
                ciudad = text.replace(/.*\ben\b\s*/, '');
                palabraEncontrada = true;
                
                try {
                    // Obtener el clima de la ciudad
                    const respuestaClima = await obtenerClima(ciudad);
                    respuesta = respuestaClima;
                } catch (error) {
                    respuesta = "Ha ocurrido un error al consultar el clima en " + ciudad;
                }
            default:

                break;
        }
    };
    
    // Si no se encontró ninguna palabra coincidente
    if (palabraEncontrada==false) {
        respuesta = "Lo siento, pero la instrucción "+text+" no está en mi programación."
        leerTexto(respuesta);
        writeBox(2,respuesta);
    }else{
        leerTexto(respuesta);
        writeBox(2,respuesta);
    }
}