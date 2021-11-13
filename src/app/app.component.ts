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
  usurarioObservable(nome: string, email: string): Observable<Usuario> {
    return new Observable(sobrescrever => {
      if (nome === 'Luiz') {
        let usuario = new Usuario(nome, email)

        setTimeout(() => {
          sobrescrever.next(usuario)
        }, 1000)

        setTimeout(() => {
          sobrescrever.next(usuario)
        }, 2000)

        setTimeout(() => {
          sobrescrever.next(usuario)
        }, 3000)

        setTimeout(() => {
          sobrescrever.next(usuario)
        }, 4000)

        setTimeout(() => {
          sobrescrever.next(usuario)
        }, 5000)
        setTimeout(() => {
          sobrescrever.next(usuario)
        }, 6000)



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
      next: (valor: any) => console.log('Next', valor),
      error: (erro: any) => console.log('Erro', erro),
      complete: () => console.log('Fim')
    }

    // const obs = this.minhaObservable('Luiz')
    // obs.subscribe(observer)
    
    const obs = this.usurarioObservable('Luiz','luiz999@gmai.com')
    const subs = obs.subscribe(observer)

    //cancelando a subscription
    setTimeout(()=>{
      subs.unsubscribe()
      //console.log('Conexão fechada?: ' + subs.closed)
      console.log(`Conexão fechada : ${subs.closed ? "Sim" : "Não"}`)
    },3000)
  }
}

export class Usuario {

  nome: string
  email: string
  constructor(nome: string, email: string) {
    this.nome = nome;
    this.email = email
  }


}