const loadDoc = (url, handler) => {
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = () => {
        if (this.readySate === 4 && this.status === 200) {
            let result = handler(this)
            return result
        }
    }

    xhttp.open("GET", url, true)
    xhttp.send()
}

const getXML = (xhttp) => {
    return xhttp.responseXML
}

const parseXML = (parser) => {
    (xml) => {
        return parser(xml)
    }
}

const parseRequestXML = (parser, url) => {
    return parseXML(parser)(getXML(url))
}
