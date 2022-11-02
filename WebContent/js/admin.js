//Cria o objeto COLDIGO, que será usado como indentificados do projeto
COLDIGO = new Object();

$(document).ready(function(){
	$("header").load("/ProjetoTrilhaWeb/pages/admin/general/header.html")
	$("footer").load("/ProjetoTrilhaWeb/pages/admin/general/footer.html")
	
	//Função para carregamento de pagina de comteúdo, que recebe como
	//paramentro o nome da pasta com a página a ser carregada
	COLDIGO.carregaPagina = function(pagename){
		//limp a tag section, execluido todo o contúdo de dentro dela
		$("section").empty();
		//carrega a pagina solicitada dentro da tag section
		$("section").load(pagename+"/", function(response, status, info){
			if(status == "error"){
				var msg = "Houve um erro ao encontrar a página: "+ info.status +" - "+ info.statusText;
				$("section").html(msg);
			}	
		});
	}
});