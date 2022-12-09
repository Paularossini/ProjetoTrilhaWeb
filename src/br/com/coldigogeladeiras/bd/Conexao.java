package br.com.coldigogeladeiras.bd;

import java.sql.Connection;

public class Conexao {
	// connection do driver 
	private Connection conexao;
	
	// tenta fazer a conex�o com as credenciais inseridas na fun��o do driver
	// Se n�o der certo, ir� retornar a mensagem de erro
	public Connection abrirConexao() {
		try {
			// indica��o de qual driver estamos utilizando
			Class.forName("com.mysql.cj.jdbc.Driver").newInstance();
			conexao = java.sql.DriverManager.
					getConnection("jdbc:mysql://localhost/bdcoldigo?"+"user=root&password=root&useTimezone=true&serverTimezone=UTC");
		} catch(Exception e) {
			e.printStackTrace();
		}
		return conexao;
	}
	
	public void fecharConexao() {
		try {
			conexao.close();
		} catch(Exception e) {
			e.printStackTrace();
		}
	}
}
