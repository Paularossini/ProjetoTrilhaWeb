package br.com.coldigogeladeiras.rest;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;
import com.google.gson.Gson;
import javax.ws.rs.GET;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import br.com.coldigogeladeiras.bd.Conexao;
import br.com.coldigogeladeiras.jdbc.JDBCProdutoDAO;
import br.com.coldigogeladeiras.modelo.Marca;
import br.com.coldigogeladeiras.modelo.Produto;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import com.google.gson.JsonObject;
import javax.ws.rs.DELETE;
import javax.ws.rs.PathParam;
import javax.ws.rs.PUT;
import br.com.coldigogeladeiras.jdbc.JDBCMarcaDAO;

@Path("produto")
public class ProdutoRest extends UtilRest{
	
	@POST
	@Path("/inserir")
	@Consumes("application/*")//Algo deve ser recebido
	public Response inserir(String produtoParam) {
		try {
			Produto produto = new Gson().fromJson(produtoParam, Produto.class);//ele procura um atributo na classe que tenha o mesmo nome e guarda
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			
			JDBCProdutoDAO jdbcProduto = new JDBCProdutoDAO(conexao);
			boolean retorno = jdbcProduto.inserir(produto);
			String msg = "";

			if (retorno) {
				msg = "Produto cadastrado com sucesso!";
			} else {
				msg = "Erro ao cadastrar produto";
			}	
				
			conec.fecharConexao();
			
			return this.buildResponse(msg);
			
		} catch (Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}
	
	
}
