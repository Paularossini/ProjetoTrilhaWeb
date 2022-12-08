package br.com.coldigogeladeiras.rest;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import com.google.gson.Gson;

public class UtilRest {
	
	public Response buildResponse(Object result) {
		
		try {
			String valorResposta = new Gson().toJson(result);
			
			return Response.ok(valorResposta).build();
		} catch(Exception ex) {
			ex.printStackTrace();
			return this.buildErrorResponse(ex.getMessage());
		}
	}
	// funcao de devolver o erro em formato de texto
	public Response buildErrorResponse(String str) {
		
		ResponseBuilder rb = Response.status(Response.Status.INTERNAL_SERVER_ERROR);

		//define uma entidade (objeto) que retornara ao cliente
		rb = rb.entity(str);
		//define o tipo de retorno da entidade, no caso texto simples
		rb = rb.type("text/plain");
		
		return rb.build();
	}
}
