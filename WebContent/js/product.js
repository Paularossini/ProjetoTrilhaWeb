COLDIGO.produto = new Object();

$(document).ready(function(){	
	COLDIGO.produto.carregarMarcas = function(){

		$.ajax({
			type: "GET",
			url: COLDIGO.PATH+"marca/buscar",
			success: function(marcas){
				
				// se existirem marcas
				if (marcas!=""){
					
					$("#selMarca").html("");
					var option = document.createElement("option");
					option.setAttribute("value", "");
					option.innerHTML = ("Escolha");
					$("#selMarca").append(option);
					
					for (var i = 0; i < marcas.length; i++){
					
						var option = document.createElement("option");
						option.setAttribute("value", marcas[i].id);
						option.innerHTML = (marcas[i].nome);
						$("#selMarca").append(option);	
					}
					
				}else{
					$("#selMarca").html("");
					
					var option = document.createElement("option");
					option.setAttribute("value", "");
					option.innerHTML = ("Cadastre uma marca primeiro!");
					$("#selMarca").append(option);
					$("#selMarca").addClass("aviso");
				}
			},
			error: function(info){
				
				COLDIGO.exibirAviso("Erro ao buscar as marcas: "+info.status+" - "+info.statusText);
				
				$("#selMarca").html("");
				var option = document.createElement("option");
				option.setAttribute("value", "");
				option.innerHTML = ("Erro ao carregar marcas!");
				$("#selMarca").append(option);
				$("#selMarca").addClass("aviso");
			}
		});
	}
	
	COLDIGO.produto.carregarMarcas();
	
	//Cadastra no bd o produto informado
	COLDIGO.produto.cadastrar = function(){
		
		var produto = new Objetct();
		produto.categoria = document.frmAddProduto.categoria.value;
		produto.marcaId = document.frmAddProduto.marcaId.value;
		produto.modelo = document.frmAddProduto.modelo.value;
		produto.capacidade = document.frmAddProduto.capacidade.value;
		produto.valor = document.frmAddProduto.valor.value;
		
		if((produto.categoria == "") || (produto.marcaId == "") || (produto.modelo == "")
		|| (produto.capacidade == "")|| (produto.valor == "")){
			COLDIGO.exibirAviso("Preencha todos os campos!");
		
		}else{
			$ajax({
				type:"POST",
				url: COLDIGO.PATH+"produto/inserir",
				data:JSON.stringify(produto), //Transforma o objeto e string em formato json
				success: function(msg){
					COLDIGO.exibirAviso(msg);
					$("#addProduto").trigger("reset");
				},
				error:function (info){
					COLDIGO.exibirAviso("Erro ao cadastrar um produto novo: "+info.status+" - "+info.statusText);
				}
			})
			
		}
	}
	
	//Busca no BD e exibe na pagina os produtos que atendem a solicitaçao do usuario
	COLDIGO.produto.buscar = function(){
		
		var valorBusca = $("#campoBuscaProduto").val();
		
		$.ajax({
			type:"GET",
			url: COLDIGO.PATH+"produto/buscar", 
			data:"vaorBusca="+valorBusca,
			success: function(dados){
				
				dados = JSON.parse(dados);
				console.log(dados);
				////-------pag 10 -------
				
			},
			error:function(info){
				COLDIGO.exibirAviso("Erro ao consultar os contatos: "+info.status+" - "+info.statusText);
			}
		});
	};
	
});