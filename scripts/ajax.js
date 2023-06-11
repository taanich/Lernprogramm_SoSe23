function getQuiz() {
    let xhr = getXhr();
    sendXhr(xhr);

    function xhrHandler() {
        console.log("Status: " +xhr.readyState);
        if (xhr.readyState !== 4 ){
            return;
        }
        console.log("Status "+ xhr.readyState + " " + xhr.status);
        if (xhr.status === 200) {
            console.log("Success");
        }
    }

    function getXhr() {
        if(window.XMLHttpRequest) {
            return new XMLHttpRequest();
        } else return false;
    }
    function sendXhr() {
        xhr.onreadystatechange = xhrHandler;
        xhr.open("GET", "https://irene.informatik.htw-dresden.de:8888")
        xhr.send(null);
        console.log("gesendet!");
    }
}