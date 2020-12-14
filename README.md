# Backend da Aplicação

Backend do projeto https://github.com/caio-ggomes/Vila-Market

Versão do NodeJs utilizada: v14.13.0

Porta: 4000

Para rodar o backend é necessário instalar o postgres 13.
É necessário também instalação global da biblioteca knex, através do npm:
```
npm i knex
```
No postgres é necessário criar a database:

```
CREATE DATABASE vila_market2;
```
Após instalação do knex, e dentro do diretório "backend" deve-se executar o seguinte comando para migrar as tabelas:
```
knex migrate:latest
```
O arquivo ".env" deve ser criado e disponibilizado no diretório "backend", contendo (informações passadas por email/classroom):
```
module.exports = {
    authSecret: '',
    db: {
        host : '',
        port: ,
        database: '',
        user: '',
        password: ''
    }
}
```

---

Após download do projeto e instalação e configuração do postgres e knex, deve-se executar o NPM para instalação das bibliotecas:
```
npm i
```

Para iniciar a aplicação, o comando é:

```
npm start
```

Obs: as duas aplicações (backend e frontend) devem estar ligadas para o sistema funcionar.
