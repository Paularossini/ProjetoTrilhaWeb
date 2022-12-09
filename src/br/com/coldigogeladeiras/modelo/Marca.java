package br.com.coldigogeladeiras.modelo;

import java.io.Serializable;
// não entendi pq o serializable
public class Marca implements Serializable{
	// não entendi pq o serializable
	private static final long serialVersionUID = 1L;

	private int id;
	private String nome;
	private int status;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome=nome;
	}
	public int getStatus() {
		return this.status;
	}
	public void setStatus(int status) {
		this.status=status;
	}
}
