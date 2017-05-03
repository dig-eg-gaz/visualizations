function loadDoc(url,handler) {
    let xhttp = new XMLHttpRequest()

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            handler(this)
        }
    }

    xhttp.open("GET", url, true)
    xhttp.send()
}

const getXML = (xhttp) => {
    return xhttp.responseText
}

const parseXML = (parser) => {
    (xml) => {
        return parser(xml)
    }
}

const parseRequestXML = (parser, url) => {
    return parseXML(parser)(getXML(url))
}
