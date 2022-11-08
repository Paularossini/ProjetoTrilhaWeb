package br.com.coldigogeladeiras.rest;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;
import com.google.gson.Gson;

public class UtilRest {
	
	public Response buildResponse(Object result) {
		
		try {
			/*Retorna o objeto de resposta con status 200 9ok0, tendo 
			 * em seu corpo o objeto valorResposta (resultado convertido do Json)
			 */
			String valorResposta = new Gson().toJson(result);
			return Response.ok(valorResposta).build();
			
		}catch (Exception ex) {
			ex.printStackTrace();
			//Se algo der esado acima, cria Response de erro
			return this.buildErrorResponse(ex.getMessage());
		}
	}
	
	public Response buildErrorResponse(String str) {
		//O objeto recebe o status erro
		ResponseBuilder rb = Response.status(Response.Status.INTERNAL_SERVER_ERROR);
		
		//Define a entidade (objeto), que nesse caso é uma msg retornado ao cliente
		rb = rb.entity(str);
		
		//Define o tipo deretorno desta entidade, no caso simples
		rb = rb.type("text/plain");
		
		/*retona o objeto resposta con status 500 (erro),
		junto com a Strinng Contendo a mensagem erro*/
		return rb.build();
	}

}
