import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
    <div style="text-align:center" class="content">
      <h1>
        Welcome to {{title}}!
      </h1>
     
    
  `,
  styles: []
})
export class AppComponent implements OnInit {

  title = 'RXJS';

  //criando uma promise
  minhaPromise(nome: string): Promise<string> {
    return new Promise((resolver, rejeitar) => {
      if (nome === 'Luiz') {
        setTimeout(() => {
          resolver(`Seja bem vindo ${nome}`)
        }, 1000)
      } else {
        rejeitar('!!!!!! Nome incorreto !!!!!!')
      }
    })
  }

  //criando uma observable
  minhaObservable(nome: string): Observable<string> {
    return new Observable(sobrescrever => {
      if (nome === 'Luiz') {
        sobrescrever.next(`Olá ${nome}`)
       
        setTimeout(() => {
          sobrescrever.next('Resposta com delay ' + nome)
        }, 3000)
      } else {
        sobrescrever.error('Erro ao detectar o nome')
      }


    })
  }


  ngOnInit(): void {
    //  this.minhaPromise('Luiz').then(resultado =>{
    //    console.log(resultado)
    //  })
    //  this.minhaPromise('Luizz').then(resultado =>{
    //    console.log(resultado)
    //  }).catch(erro => console.log(erro))



    //this.minhaObservable('Luisz').subscribe(resultado => console.log(resultado), erro => console.log(erro))
    //USAR O SUBSCRIBE DESSE MODO
    //this.minhaObservable('Luiz').subscribe({next:(resultado) =>console.log(resultado), error:(erro)=>console.log(erro)})

    const observer = {
      next: (valor:string) => console.log('Next', valor),
      error: (erro:string) => console.log('Erro', erro),
      complete: () =>console.log('fim')
    }

    const obs = this.minhaObservable('Luiz')
    obs.subscribe(observer)
 
  }



}
