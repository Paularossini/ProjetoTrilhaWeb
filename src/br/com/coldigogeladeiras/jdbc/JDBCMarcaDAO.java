package br.com.coldigogeladeiras.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import com.google.gson.JsonObject;
import java.sql.Statement;
import br.com.coldigogeladeiras.modelo.Marca;
import br.com.coldigogeladeiras.jdbcinterface.MarcaDAO;

public class JDBCMarcaDAO implements MarcaDAO{

	private Connection conexao;
	
	public JDBCMarcaDAO(Connection conexao) {
		this.conexao = conexao; 
	}
	
	public List<Marca> buscar(){
		String comando = "SELECT * FROM marcas";
		List<Marca> listMarcas = new ArrayList<Marca>();
		
		Marca marca = null;
		try {
			
			Statement stmt = conexao.createStatement();
			ResultSet rs = stmt.executeQuery(comando);
			
			while (rs.next()) {
				marca = new Marca();
				
				int id = rs.getInt("id");
				String nome = rs.getString("nome");
				
				marca.setId(id);
				marca.setNome(nome);
				listMarcas.add(marca);
			}
			
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		
		return listMarcas;
	}
	
}
