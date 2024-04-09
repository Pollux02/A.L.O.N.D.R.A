const btnStart = document.getElementById('btnStart');
const btnStop = document.getElementById('btnStop');
const textArea = document.getElementById('textArea');

const recognition = new webkitSpeechRecognition();

let dialogue = "";

recognition.continuous = true;
recognition.lang = 'es-ES';
recognition.interimResult = false;

function iniciar(){ 
    dialogue = "Hola, me presento, soy Alondra. ¿En qué puedo ayudarte hoy?."
    textArea.value = dialogue;
    leerTexto(dialogue);
} 

btnStart.addEventListener('click', () => {
    recognition.start();
});

btnStop.addEventListener('click', () => {
    dialogue = "Muy bien, ya no podré escucharte.";

    textArea.value = dialogue;
    leerTexto(dialogue);
    recognition.abort();
});

recognition.onresult = (event) => {
    const texto = event.results[event.results.length - 1][0].transcript;
    ejecutarFuncion(texto);
    console.log(texto);
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

function ejecutarFuncion (text) {
    // Separar el texto en palabras
    const palabras = text.split(/\s+/);
    
    // Inicializar una variable para indicar si se encontró alguna palabra
    let palabraEncontrada = false;
    
    // Utilizar un switch para verificar cada palabra
    palabras.forEach(palabra => {
        switch (palabra.toLowerCase()) {
            case "navegador":
                dialogue = "En fa te lo hago. Abriendo navegador.";

                textArea.value = dialogue;
                leerTexto(dialogue);

                palabraEncontrada = true;
                break;
            case "página":
                 // Crear una expresión regular para encontrar la palabra junto con todo lo que la precede
                const regex = new RegExp('.*?' + "página", 'i');
                
                // Reemplazar todo lo que coincide con la expresión regular por una cadena vacía
                resultado = text.replace(regex, '');

                resultado = resultado.replace(/\s+/g, '');
                
                console.log(resultado);

                window.open('http://www.'+resultado);

                dialogue = "En fa te lo hago. Abriendo la página "+resultado;

                textArea.value = dialogue;
                leerTexto(dialogue);

                palabraEncontrada = true;
                break;
            case "hola":
                dialogue = "Hola, un gusto saludarte.";

                textArea.value = dialogue;
                leerTexto(dialogue);

                palabraEncontrada = true;
                break;
            default:
                // Si no se encuentra ninguna palabra coincidente, no hacer nada
                break;
        }
    });
    
    // Si no se encontró ninguna palabra coincidente
    if (!palabraEncontrada) {
        console.log("No se encontraron palabras específicas en el texto.");

        dialogue = "Lo siento, pero la instrucción "+text+" no está en mi programación.";

        textArea.value = dialogue;
        leerTexto(dialogue);
    }
}