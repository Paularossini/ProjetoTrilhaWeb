
function validaFaleConosco(){
	
	var nome = document.frmfaleconosco.txtnome.value;
	var expRegNome = new RegExp("^[A-zÀ-ü]{3,}([ ]{1}[A-zÀ-ü]{2,})+$");
	
	if(!expRegNome.test(nome)){
		alert("Preencha o campo Nome corretamente.");
		document.frmfaleconosco.txtnome.focus();
		return false;
	}
	
	var fone = document.frmfaleconosco.txtfone.value;
	var expRegFone = new RegExp("^[(]{1}[1-9]{2}[)]{1}[0-9]{4,5}[-]{1}[0-9]{4}$");
	
	if(!expRegFone.test(fone)){
		alert("Preencha o campo Telefone corretamente.");
		document.frmfaleconosco.txtfone.focus();
		return false;
	}if(document.frmfaleconosco.txtemail.value==""){
		alert("Preencha o campo E-mail.");
		document.frmfaleconosco.txtemail.focus();
		return false;
		
	}if(document.frmfaleconosco.selmotivo.value==""){
		alert("Preencha o campo Motivo.");
		document.frmfaleconosco.selmotivo.focus();
		return false;
	}if((document.frmfaleconosco.selmotivo.value=="PR")&&(document.frmfaleconosco.selproduto.value=="") ){
		alert("Preencha o campo Produto.");
		document.frmfaleconosco.selproduto.focus();	
		return false;	
	}if(document.frmfaleconosco.txacomentatio.value==""){
		alert("Preencha o campo Comentário.");
		document.frmfaleconosco.txacomentatio.focus();
		return false;
		}
	return true;
}

function verificaMotivo(motivo){
	//capturamos a estrutura da div com o ID opcaoPProduto na variavel elemento
	var elemento = document.getElementById("opcaoProduto");
	
	if(motivo=="PR"){
		//Criamos um  elemento <select> e guardamos na variavel homogenia
		var select = document.createElement("select");
		//Set no select o atributo 'name' com alor 'selproduto'
		select.setAttribute("name", "selproduto");
		//Conteudo atual da variavel select:
		//<select name="selprodto"></select>
		//--------------------------------------
		//Criamos um elemento <option> e guardamos na variavel homonima
		var option = document.createElement("option");
		option.setAttribute("value", "");
		
		var texto = document.createTextNode("Escolha");
		option.appendChild(texto);
		//<option value="">Escolha</option>
		select.appendChild(option);
		//<select name="selprodto"><option value="">Escolha</option></select>
		//--------------------------
		//Criamos um elemento <option> e guardamos na variável homonima
		var option = document.createElement("option");
		option.setAttribute("value", "FR");
		
		var texto = document.createTextNode("Freezer");
		option.appendChild(texto);
		select.appendChild(option);
		//------------------------------------
		var option = document.createElement("option");
		option.setAttribute("value", "GE");
		
		var texto = document.createTextNode("Geladeira");
		option.appendChild(texto);
		select.appendChild(option);
		//--------------------------------------------
		//Colocamos o select criado como 'filho' da tag div capturada no inicio da funcao
		elemento.appendChild(select);
		//Se o valor da variavel motivo nao for "PR"...
	}else{
		//se a div possuir algum "primeiro filho"
		if(elemento.firstChild)
		//Remova ele
		elemento.removeChild(elemento.firstChild);
	}	
}//fim da funcao motivo

//Assim que o documeno HTML for carregodo po completo...
$(document).ready(function(){
	//carrega cabeçalho, menu, rodape
	$("header").load("/ProjetoTrilhaWeb/pages/site/general/cabecalho.html");
	$("nav").load("/ProjetoTrilhaWeb/pages/site/general/menu.html");
	$("footer").load("/ProjetoTrilhaWeb/pages/site/general/rodape.html");
});



 