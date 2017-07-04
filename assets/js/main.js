/* Hacemos un recorrido con nuestra data, donde le pediremos que nos imprima las
imaǵenes que correspondan a la palabra ingresada en el input que creamos en html.
Además, que añada un enlace a la paǵina web donde se encuentra la imagen*/
$(document).ready(function(){	
	var dibujarGifs = function(data){
		var gif = "";
		var url = "";
		data.forEach(function(element){
			gif = element.images.downsized_large.url;
			url = element.bitly_gif_url;
			$("#elementos").append(armarTemplate(gif, url));
		});
	}
/* Acá solo aramaremos la estructura que se moestrara en html,
con los datos que hemos solicitado anteriormente*/	
var armarTemplate = function(gif,url){
	var t = "<div class='elemento'><img src='"+ gif + "'/><a href='"+ url + "'<Ver más</a></div>"
	return t;
}

/* haremos el llamado a Ajax, en un url: pondremos la dirección de nuestra paǵina
donde buscaremos las imágenes, el type: es GET (obtener datos), datatype: es el tipo de datos
que se espera como respuesta, data: es la información que me tiene que enviar*/
var ajaxGif = function(gif){
	$.ajax({
		url: 'http://api.giphy.com/v1/gifs/search',
		type: 'GET',
		datatype: 'json',
		data: {
			q: gif,
			api_key: 'dc6zaTOxFJmzC'
		}
	})
	.done(function(response){
		console.log(response);
		dibujarGifs(response.data);
	})
	.fail(function(){
		console.log("error");
	});
}

/* Para finalizar al hacer clic sobre el botón, se mostrará un mensaje en la consola,
se limpiará el contenedor donde se pondrán las imágenes (en caso de que esté ocupado),
guardará el valor obtenido en el input en una variable y ese valor será pasado a la 
función que hará el llamado Ajax */
$("#buscar-gif").click(function(event){
	console.log("Entro");
	$("#elementos").empty();
	var gif = $("#gif-text").val();
	ajaxGif(gif);
});
});
