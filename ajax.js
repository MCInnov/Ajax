/*
Développer par Maximilien COSTA
21/11/2019
v5.1
*/

/*########################### Fichier de l'objet Ajax ###########################*/

/*
Exemple : 

var requete = new Ajax({
    url:String,
    data:Json/Array/String/etc,
    type:String,
    header:Array,
    success:function(result, status, xhr),
    error:function(result, status, xhr),
    loadstart:function,
    loadend:function,
    responseType:[json,text,...],
    credentials:boolean    
});
*/

class Ajax{
    
    constructor(options){
        this.url = null;
        this.methode = "GET";
        this.data = "";
        this.success = null;
        this.error = null;
        this.loadstart = null;
        this.loadend = null;
        this.header = [];
        this.responseType = null;
        this.credentials = true;
        this.version = "[AJAX] v5.1";
        
        if(options){
            for(let item in options){
                switch (item) {
                    case "url" : this.url = options[item]; break;
                    case "methode" : this.methode = options[item]; break;
                    case "data" : this.data = options[item]; break;
                    case "success" : this.success = options[item]; break;
                    case "error" : this.error = options[item]; break;
                    case "loadstart" : this.loadstart = options[item]; break;
                    case "loadend" : this.loadend = options[item]; break;
                    case "header" : this.header = options[item]; break;
                    case "responseType" : this.responseType = options[item]; break; 
                    case "credentials": this.credentials = options[item]; break; 
                    default: this.consoleLog("Option inconnue :","INIT",item,"warning"); break;
                }
            }
        }
        
        var xhr = getXMLHttpRequest(this.credentials);
        
        this.run(xhr);
    }
    
    /**
    * Affichage de message pour l'objet AJAX
    * @param {string} msg Message a afficher
    * @param {string} title Titre du message
    * @param {any} data Données a afficher
    * @param {string} type Type d'affichage [log,warning,error]
    */
    consoleLog(msg, title="INFO", data="", type="log") {
        switch (type) {
            case "warning": console.warn("[AJAX] [" + title + "] " + msg, data); break;
            case "error": console.error("[AJAX] [" + title + "] " + msg, data); break;
            default: console.log("[AJAX] [" + title + "] " + msg, data); break;
        }
        return;
    }
    
    /**
    * Initialisation de l'objet xhr qui permettra de faire des requêtes http
    * @param {boolean} credentials Indique si des requêtes Access-Control d'origines différentes peuvent être effectuées avec des informations d'authentification telles que des cookies ou des en-têtes d'autorisation
    */
    getXMLHttpRequest(credentials=true) {
        var xhr = null;
        if (window.XMLHttpRequest || window.ActiveXObject) {
            if (window.ActiveXObject) {
                try {
                    xhr = new ActiveXObject("Msxml2.XMLHTTP");
                } catch (e) {
                    xhr = new ActiveXObject("Microsoft.XMLHTTP");
                }
            } else {
                xhr = new XMLHttpRequest();
            }
            xhr.withCredentials = credentials;
        } else {
            alert("Ton navigateur ne supporte pas l'objet AJAX");
            return null;
        }
        return xhr;
    }
    
    /**
    * Vérification de l'url
    */
    isValid(){
        if (this.url == null || this.url == "") {
            this.consoleLog("Url missing", "TEST", this.url, "error"); 
            return false;
        }else{
            return true;
        }
    }
    
    /**
    * Exécution de la requête HTTP
    * @param {XMLHttpRequest} xhr Objet XMLHttpRequest
    */
    run(xhr) {
        
        if (this.isValid()) {
            
            xhr.open(this.methode, this.url);
            
            if (this.header.length != 0) {
                this.header.forEach(function (value) {
                    xhr.setRequestHeader(value[0], value[1]);
                });
            }
            
            xhr.loadstart = (this.loadstart != null) ? this.loadstart() : null;
            xhr.loadend = (this.loadend != null) ? this.loadend() : null;
            
            xhr.error = function () {
                this.consoleLog("Error : ","ERROR",xhr);
            };
            
            xhr.onreadystatechange = function () {
                if (xhr.readyState == XMLHttpRequest.DONE) {
                    if (xhr.status == 200) {
                        var res = xhr.response;
                        if (this.responseType != null) {
                            res = (this.responseType == "json") ? JSON.parse(xhr.response) : xhr.response;
                        }
                        (this.success != null) ? this.success(res, xhr.status, xhr) : null;
                    }
                    else {
                        var res = xhr.response;
                        if (this.responseType != null) {
                            res = (requet.responseType == "json") ? JSON.parse(xhr.response) : xhr.response;
                        }
                        (this.error != null) ? this.error(res, xhr.status, xhr) : null; // Affiche dans la console si il y a une erreur dans le cas où xhr.status est différent de 200
                    }
                }
            }
            
            xhr.send((this.data != null) ? this.data : ""); //Send to serve
        }
    }
}