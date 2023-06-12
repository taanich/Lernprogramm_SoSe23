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
        const i = Math.floor(Math.random() * (20 - 3 +1)) + 3;
        xhr.onreadystatechange = xhrHandler;
        xhr.open("GET", "https://irene.informatik.htw-dresden.de:8888/api/quizzes/" + i, true)
        xhr.setRequestHeader('Authorization', 'Basic ' + btoa('test@gmail.com:secret'));
        xhr.send(null);
        console.log("gesendet!");
    }
}