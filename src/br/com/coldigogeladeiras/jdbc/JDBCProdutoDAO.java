package br.com.coldigogeladeiras.jdbc;


import br.com.coldigogeladeiras.jdbcinterface.ProdutoDAO;
import br.com.coldigogeladeiras.modelo.Produto;	
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import com.google.gson.JsonObject;
import java.sql.ResultSet;
import java.sql.Statement;

public class JDBCProdutoDAO implements ProdutoDAO{
	private Connection conexao;
	
	public JDBCProdutoDAO(Connection conexao) {
		this.conexao = conexao;
	}
	
	public boolean inserir(Produto produto) {
		
		String comando = "INSERT INTO produtos "
				+ "(id, categoria, modelo, capacidade, valor, marca_id) "
				+ "VALUES (?,?,?,?,?,?)";
		
		try {
			//prepara os parametros para serem inseridos no banco de foma mais segura
			PreparedStatement p = this.conexao.prepareStatement(comando);
			//substitui as ???
			p.setInt(1, produto.getId());
			p.setString(2, produto.getCategoria());
			p.setString(3, produto.getModelo());
			p.setInt(4, produto.getCapacidade());
			p.setFloat(5, produto.getValor());
			p.setInt(6, produto.getMarcaId());
			
			p.execute();
		} catch (SQLException e) {
			e.printStackTrace();
			System.out.print(e.getMessage());
			return false;
		}
		
		return true;
	}
	
	public List<JsonObject> buscarPorNome(String nome){
		
		String comando = "SELECT produtos.*, marcas.nome as marca FROM produtos"
				+ " INNER JOIN marcas ON produtos.marca_id = marcas.id";
		
		if (!nome.equals("")) {
			//concatena no comando, buscanfo o nome do produto
			comando += " WHERE modelo LIKE '%" + nome+"%' ";
		}
		//finaliza o comando por ordem alfabetica
		comando += " ORDER BY categoria ASC, marcas.nome ASC, modelo ASC";
		
		//O JsonObject cria codigos no fomato JSON, mas como um objeto Java
		List<JsonObject> listaProdutos = new ArrayList<JsonObject>();
		JsonObject produto = null;
		
		try {
			Statement stmt = conexao.createStatement();
			ResultSet rs = stmt.executeQuery(comando);
			
			while(rs.next()) {
				
				int id = rs.getInt("id");
				String categoria = rs.getString("categoria");
				String modelo = rs.getString("modelo");
				int capacidade = rs.getInt("capacidade");
				float valor = rs.getFloat("valor");
				String marcaNome = rs.getString("marca");
				
				if (categoria.equals("1")) {
					categoria = "Geladeira";
				} else if(categoria.equals("2")) {
					categoria = "Freezer";
				}
				
				produto = new JsonObject();
				produto.addProperty("id", id);
				produto.addProperty("categoria", categoria);
				produto.addProperty("modelo", modelo);
				produto.addProperty("capacidade", capacidade);
				produto.addProperty("valor", valor);
				produto.addProperty("marcaNome", marcaNome);
				
				listaProdutos.add(produto);
			}
		}catch(Exception e) {
			e.printStackTrace();
			System.out.print(e.getMessage());
		}
		
		return listaProdutos;
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	public boolean deletar(int id) {
		String comando = "DELETE FROM produtos WHERE id = ?";
		PreparedStatement p;
		try {
			p = this.conexao.prepareStatement(comando);
			p.setInt(1,id);
			p.execute();
		} catch(SQLException e) {
			e.printStackTrace();
			return false;
		}
		
		return true;
	}
	
	public Produto buscarPorId(int id) {
		String comando = "SELECT * FROM produtos WHERE produtos.id = ?";
		Produto produto = new Produto();
		try {
			PreparedStatement p = this.conexao.prepareStatement(comando);
			p.setInt(1,id);
			ResultSet rs = p.executeQuery();
			while (rs.next()) {
				String categoria = rs.getString("categoria");
				String modelo = rs.getString("modelo");
				int capacidade = rs.getInt("capacidade");
				float valor = rs.getFloat("valor");
				int marcaId = rs.getInt("marca_id");
				
				produto.setId(id);
				produto.setCategoria(categoria);
				produto.setMarcaId(marcaId);
				produto.setModelo(modelo);
				produto.setCapacidade(capacidade);
				produto.setValor(valor);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return produto;
	}
	
	public boolean alterar(Produto produto) {
		String comando = "UPDATE produtos "
				+ "SET categoria=?, modelo=?, capacidade=?, valor=?, marca_id=?"
				+ " WHERE id =?";
		PreparedStatement p;
		try {
			p = this.conexao.prepareStatement(comando);
			p.setString(1, produto.getCategoria());
			p.setString(2, produto.getModelo());
			p.setInt(3, produto.getCapacidade());
			p.setFloat(4, produto.getValor());
			p.setInt(5, produto.getMarcaId());
			p.setInt(6, produto.getId());
			p.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
			System.out.print(e.getMessage());
			return false;
		}
		
		return true;
	}
	public boolean verificaModelo(String verificaNome) {
		String comando = "SELECT * FROM produtos WHERE modelo = ?";
		Produto produto = new Produto();
		boolean verifica = false;
		try {
			PreparedStatement p = this.conexao.prepareStatement(comando);
			p.setString(1,verificaNome);
			ResultSet rs = p.executeQuery();
			while (rs.next()) {
				String categoria = rs.getString("categoria");
				int id = rs.getInt("id");
				int capacidade = rs.getInt("capacidade");
				float valor = rs.getFloat("valor");
				int marcaId = rs.getInt("marca_id");
				
				produto.setId(id);
				produto.setCategoria(categoria);
				produto.setMarcaId(marcaId);
				produto.setModelo(verificaNome);
				produto.setCapacidade(capacidade);
				produto.setValor(valor);
			}
			if (produto.getId() > 0) {
				verifica = true;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return verifica;
	}
}
