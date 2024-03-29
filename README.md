# Objet AJAX JS

Par Maximilien COSTA

![GitHub release (latest by date including pre-releases)](https://img.shields.io/github/v/release/MCYnov/Ajax?include_prereleases&style=flat-square) ![Scrutinizer code quality (GitHub/Bitbucket)](https://img.shields.io/scrutinizer/quality/g/MCYnov/Ajax?style=flat-square) ![GitHub All Releases](https://img.shields.io/github/downloads/MCYnov/Ajax/total?style=flat-square) ![GitHub](https://img.shields.io/github/license/MCYnov/Ajax?style=flat-square)

[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)

## Description

Objet qui permet d'exécuter des requêtes HTTP de manière asynchrone en Javascript.

## Utilisation

```javascript
var requete = new Ajax({
	url:"http://localhost/",
	data:"data",
	methode:"GET",
	header:[
		["Content-Type", "application/json"]
	],
	success:function(result, status, xhr){
		console.log(result);
	},
	error:function(result, status, xhr){
		console.log(result);
	},
	loadstart:function(){
		console.log("Start");
	},
	loadend:function(){
		console.log("End)
	},
	responseType:"json",
	credentials:true,
});
```

## Options

Option  | Type | Description
------------- | ------------- | -------------
url | String | `require` Url de la requête
methode | String | `default : Get` Verbe de la requête
data | Any | Données envoyé dans la requête
header | Array | Header de la requête
success| Fonction | Fonction exécuté en cas de succès 
error | Fonction | Fonction exécuté en cas d'erreur
loadstart | Fonction | Fonction exécuté au lancement de la réquête
loadend | Fonction | Fonction exécuté à la fin de la requête
responseType | String | Format de la réponse de la requête
credentials | Boolean | `default : true` Indique si des requêtes Access-Control d'origines différentes peuvent être effectuées avec des informations d'authentification telles que des cookies ou des en-têtes d'autorisation
