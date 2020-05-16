## Bexbank

### Descrição
* Pequena plataforma destinada ao gerenciamento de perguntas e respostas de nossos usuários.

## Requisitos para execução (Local)
* Clone ou baixe o projeto em sua máquina
* Inicialize uma instância do MongoDb. Sugerimos a utilização do Docker:
```
docker run -–name api-bexs –p 27017:27017 –d –t mongo
```
* Verifique em sua máquina a presença no NodeJs em sua versão LTS mais recente.
* Existem duas aplicações no diretório principal, sendo uma a aplicação cliente (front-end) e a segunda a API, (back-end).
* Execute o comando ``` yarn``` ou ``` npm install``` nos dois diretórios e aguarde a instalação das dependências.
* Por fim, inicialize a aplicação *back-end* com o comando ```yarn dev:server``` ou ```npm run dev:server```
* Inicialize também a aplicação *front-end* com o comando ```yarn start``` ou ```npm start```
* Após as instruções anteriores, a aplicação já estará em execução.

## Executando Testes
* Para rodar os testes, acesse a raiz da aplicação *front-end* e execute o comando ```yarn test``` ou ```npm test```.

## Documentação API
* Na raíz da aplicação você encontra um arquivo *json* exportado do *Postman* contendo a implementação de todas as rotas da aplicação. Abaixo listamos a composição básica de acesso:

#### Questões / Questions

* ```GET {{base_url}}/questions```
* ```GET{{base_url}}/questions/{{question_id ou question_code}}```
* ```POST {{base_url}}/questions```

#### Answers
* ```POST {{base_url}}/questions/{{question_id ou question_code}/answers```

#### Likes
* ```POST {{base_url}}/questions/{{question_id ou question_code}/answers/{{answer_code}}/likes```
* ```DELETE {{base_url}}/questions/{{question_id ou question_code}/answers/{{answer_code}}/likes/{{username}}```


#### Observações
* Para acessar os parâmetros necessários para as requisições *POST*, acesse o *workspace* do *Postman*, encontrado na raiz da aplicação.
* Todos os *codes* dos produtos devem ser gerados pelo *uuidv4*. As coleções contam com esse código adicional para que a experiência de geração de conteúdo no front-end possa ser favorecida.
* Qualquer dúvida, fico à disposição.
