import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OportunidadeService {

  apiUrl = 'http://localhost:8080/oportunidades';

  constructor(private httpClient: HttpClient) { }

  listar() {
    return this.httpClient.get(this.apiUrl);
  }

  salvar(oportunidade: any) {
    if (oportunidade.id) {
      return this.httpClient.put(this.apiUrl.concat("/" + oportunidade.id), oportunidade);
    }
    return this.httpClient.post(this.apiUrl, oportunidade);
  }

  deletar(id: bigint) {
    return this.httpClient.delete(this.apiUrl.concat("/" + id));
  }

}
