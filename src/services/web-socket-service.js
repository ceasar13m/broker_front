const webSocket = new WebSocket('ws://localhost:8090');

webSocket.onopen = event => {
    console.log("Соединение установлено")
}

webSocket.onmessage = event => {
    console.log("Сервер ответил" + event.data);
}

webSocket.onclose = event => {
    if(event.wasClean) {
        console.log("Соединение закрыто");
    } else {
        console.log("Соединение разорвано");
    }
}

webSocket.onerror = event => {
    console.log(event);
}

export function sendMessage(message) {
    webSocket.send(JSON.stringify(message));
}
export default sendMessage;
