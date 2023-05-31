# :bar_chart: Partiman Backend

## Índice

- [Sobre](#Sobre)
- [Rotas](#Rotas)
  - [Listar participantes](#Listar-participantes)
  - [Criar/Atualizar participante](#Criar/Atualizar-participante)
  - [Deletar participante](#Deletar-participante)
- [Como rodar em desenvolvimento](#Como-rodar-em-desenvolvimento)

<br/>

## Sobre

Backend do Partiman.

<br/>

## Rotas

## Listar participantes

- Rota: `/api/participants`
- Método: `GET`
- Status code de sucesso: **200**
- Exemplo de Resposta:

  ```json
  [
    {
      "_id": "647784bfe4c1c1e68cbf1889",
      "firstname": "Carlos",
      "lastname": "Moura",
      "participation": 5,
      "createdAt": "2023-05-31T17:32:47.011Z",
      "updatedAt": "2023-05-31T17:32:46.951Z"
    }
  ]
  ```

<br/>

## Criar/Atualizar participante

- Rota: `/api/participants`
- Método: `POST`
- Status codes de sucesso: **200** ou **201**
- Exemplo de Body:

  ```json
  {
    "firstname": "Fernanda",
    "lastname": "Oliveira",
    "participation": 15
  }
  ```

- Exemplo de Resposta:

  ```json
  {
    "_id": "647784bfe4c1c1e68cbf1889",
    "firstname": "Fernanda",
    "lastname": "Oliveira",
    "participation": 15,
    "createdAt": "2023-05-31T17:32:47.011Z",
    "updatedAt": "2023-05-31T17:32:46.951Z"
  }
  ```

- Campos do body:

  | nome            | tipo   | obrigatório | exemplo | descrição                                 |
  | --------------- | ------ | ----------- | ------- | ----------------------------------------- |
  | `firstname`     | string | **sim**     | "Hugo"  | string com tamanho entre 3 e 30           |
  | `lastname`      | string | **sim**     | "Silva" | string com tamanho entre 3 e 30           |
  | `participation` | number | **sim**     | 20      | número maior que 0 e menor ou igual a 100 |

- Possíveis Status Codes:

  | status code | motivo                                                              |
  | ----------- | ------------------------------------------------------------------- |
  | 200         | participante atualizado com sucesso                                 |
  | 201         | participante criado com sucesso                                     |
  | 400         | body é inválido                                                     |
  | 400         | o total de _participation_ no banco de dados excedeu o limite (100) |

<br/>

## Deletar participante

- Rota: `/api/participants/:id`
- Método: `DELETE`
- Status code de sucesso: **204**
- Possíveis erros:

  | status code | motivo                                       |
  | ----------- | -------------------------------------------- |
  | 400         | parâmetro _id_ é inválido                    |
  | 404         | não existe participante com o _id_ fornecido |

<br/>

## Como rodar em desenvolvimento

**Atenção:** para rodar o projeto é preciso ter o [MongoDB](https://www.mongodb.com/docs/manual/installation/) instalado em sua máquina.

<br/>

1. Clone esse repositório:

   > ```bash
   > git clone https://github.com/analtfernandes/partiman.git
   > ```

2. Vá para a raiz do projeto

   > ```bash
   > cd partiman/backend
   > ```

3. Instale as dependências:

   > ```bash
   > npm install
   > ```

4. Configure o arquivo `.env` usando como base o arquivo `.env.example`

5. Inicie o projeto:

   > ```bash
   > npm run dev
   > ```

6. Divirta-se nas rotas usando de URL base: `http://localhost:{ENV_PORT}`

7. [*Opcional*] Rode os testes:

   > ```bash
   > npm run test
   > #ou
   > npm run test:watch
   > ```

8. [*Opcional*] Acompanhe a cobertura dos testes:
   > ```bash
   > npm run coverage
   > ```
