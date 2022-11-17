COLDIGO.marca = new Object();

$(document).ready(function(){	
	
	COLDIGO.marca.cadastrar = function(){
		var marca = new Object();
		marca.nome = document.frmAddMarca.nome.value;
		
		if ((marca.nome == "")){
			COLDIGO.exibirAviso("Preencha todos os campos!");
		} else {
			$.ajax({
				type: "POST",
				url: COLDIGO.PATH+"marca/inserir",
				data: JSON.stringify(marca),
				success: function(msg){
					COLDIGO.exibirAviso(msg);
					COLDIGO.marca.buscar();
				},
				error: function (info){
					COLDIGO.exibirAviso("Erro ao cadastrar uma nova marca"+ info.status+ " - " + info.statusText);
				}
			});
		}
	}
	COLDIGO.marca.exibir = function(listaDeMarcas){
		
		var tabela = "<table>" +
		"<tr>"+
		"<th>Id</th>"+
		"<th>Nome</th>"+
		"<th>Ativo</th>"+
		"<th class='acoes'>Ações</th>"+
		"</tr>";
		if (listaDeMarcas != undefined && listaDeMarcas.length > 0){
			for (var i=0; i<listaDeMarcas.length; i++){
				var status = "";
				if (listaDeMarcas[i].status == 1){
					status = "checked";
				}
				tabela += "<tr>"+
				"<td>"+listaDeMarcas[i].id+"</td>"+
				"<td>"+listaDeMarcas[i].nome+"</td>"+
				"<td><label class='switch'><input id='status' type='checkbox' onclick=\"COLDIGO.marca.editarStatus('"+listaDeMarcas[i].id+"')\" "+status+"><span class='slider round'></span></label></td>"+
				"<td>"+
					"<a onclick=\"COLDIGO.marca.exibirEdicao('"+listaDeMarcas[i].id+"')\"><img src='../../imgs/edit.png' alt='Editar registro'> </a>"+
					"<a onclick=\"COLDIGO.marca.excluir('"+listaDeMarcas[i].id+"')\"><img src='../../imgs/delete.png' alt='Editar registro'> </a>"+
				"</td>"+
				"</tr>";
			}
		} else if (listaDeMarcas == ""){
			tabela += "<tr><td colspan='6'>Nenhum registro encontrato</td></tr>";
		}
		tabela += "</table>";
		
		return tabela;
	};
	COLDIGO.marca.buscar = function(){
		var valorBusca = $("#campoBuscaMarca").val();
		
		$.ajax({
			type: "GET",
			url: COLDIGO.PATH + "marca/buscarPorNome",
			data: "valorBusca="+valorBusca,
			success: function(dados){
				dados = JSON.parse(dados);
				$("#listaMarcas").html(COLDIGO.marca.exibir(dados));
			},
			error: function(info){
				COLDIGO.exibirAviso("Erro ao consultar os registros: "+info.status+" - "+info.statusText);
			}
		})
	};
	
	COLDIGO.marca.excluir = function(id){
		$.ajax({
			type:"DELETE",
			url: COLDIGO.PATH+"marca/excluir/"+id,
			success: function(msg){
				COLDIGO.exibirAviso(msg);
				COLDIGO.marca.buscar();
			},
			error: function(info){
				COLDIGO.exibirAviso("Erro ao excluir marca: "+info.status+" - "+info.statusText)
			}
		});
	};
	COLDIGO.marca.exibirEdicao = function(id){
		$.ajax({
			type:"GET",
			url:COLDIGO.PATH + "marca/buscarPorId",
			data:"id="+id,
			success: function(marca){
				document.frmEditaMarca.idMarca.value = marca.id;
				document.frmEditaMarca.nome.value = marca.nome;
				
				var modalEditaMarca = {
					title: "Editar Marca",
					height: 400,
					width: 550,
					modal: true,
					buttons: {
						"Salvar": function(){
							COLDIGO.marca.editar();
						},
						"Cancelar": function(){
							$(this).dialog("close");
						}
					},
					close: function (){
						
					}
				};
				
				$("#modalEditaMarca").dialog(modalEditaMarca);
			},
			error: function(info){
				COLDIGO.exibirAviso("Erro ao buscar marca para edição: "+info.status+" - "+info.statusText)
			}
		})
	}
	COLDIGO.marca.editar = function(){
		
		var marca = new Object();
		marca.id = document.frmEditaMarca.idMarca.value;
		marca.nome = document.frmEditaMarca.nome.value;
		
		$.ajax({
			type: "PUT",
			url: COLDIGO.PATH + "marca/alterar",
			data: JSON.stringify(marca),
			success: function(msg){
				COLDIGO.exibirAviso(msg);
				COLDIGO.marca.buscar();
				$("#modalEditaMarca").dialog("close");
			},
			error: function(info){
				COLDIGO.exibirAviso("Erro ao editar marcas: "+info.status+" - "+info.statusText);
			}
		});
	};
	
	COLDIGO.marca.editarStatus = function(id){
		var marca =  new Object();
		marca.id = id;
		$.ajax({
			type: "PUT",
			url: COLDIGO.PATH + "marca/alterarStatus",			
			data: JSON.stringify(marca),
			success: function(msg){
				COLDIGO.exibirAviso(msg);
				COLDIGO.marca.buscar();
			},
			error: function(info){
				COLDIGO.exibirAviso("Erro ao editar marcas: "+info.status+" - "+info.statusText);
			}
		});
	};
	
	COLDIGO.marca.buscar();
});