# :bar_chart: Partiman

Gerenciador de contribuintes de uma organização.

<div align=center>
 
  <img alt="Partiman preview" src="https://raw.githubusercontent.com/analtfernandes/partiman/main/frontend/public/partiman-preview.gif" />
  
</div>

<br />

## :hammer_and_wrench: Rodar o projeto (com Docker)
_Não se esqueça de também olhar o README do backend e do frontend para mais informações de cada um_ :wink:

**Atenção:** para rodar o projeto é preciso ter o [Docker](https://docs.docker.com/engine/install/) e o [Docker Compose](https://docs.docker.com/compose/install/) instalado na sua máquina.

1. Clone esse repositório:

   > ```bash
   > git clone https://github.com/analtfernandes/partiman.git
   > ```

2. Configure o arquivo `.env` do frontend e do backend utilizando como base seus respectivos arquivos `.env.example`

3. Na raiz da pasta criada, inicie o projeto:

   > ```bash
   > docker compose up --build -d
   > ```

4. Acesse http://localhost:80 no seu navegador e aproveite <3

5. [*Opcional*] Acesse http://localhost:80/partiman para usar somente o back-end

6. [*Opcional*] Encerre o projeto:

   > ```bash
   > docker compose down
   > ```

<br />

## :hammer_and_wrench: Abrir e rodar o projeto (sem Docker)

_Não se esqueça de também olhar o README do backend e do frontend para mais informações de cada um_ :wink:

<br />

- **Método 1:**

  - Clone esse repositório:

    > ```bash
    > git clone https://github.com/analtfernandes/partiman.git
    > ```

  - Configure o arquivo `.env` do frontend e do backend utilizando como base seus respectivos arquivos `.env.example`

  - Na raiz do projeto, instale e inicie o projeto:

    > ```bash
    > (cd backend/ && npm i && npm run dev) & (cd frontend/ && npm i && npm run dev)
    > ```

  - Acesse http://localhost:5173/dashboard no seu navegador e aproveite <3

  - **Atenção:** Ao finalizar o projeto no terminal, execute o comando para finalizar os processos:
    > ```bash
    > fuser -k 5000/tcp 5173/tcp
    > ```

<br />

- **Método 2:**

  - Clone esse repositório:

    > ```bash
    > git clone https://github.com/analtfernandes/partiman.git
    > ```

  - Vá para a raiz do backend:

    > ```bash
    > cd partiman/backend
    > ```

  - Instale as dependências:

    > ```bash
    > npm install
    > ```

  - Configure o arquivo `.env` usando como base o arquivo `.env.example`

  - Inicie o projeto:

    > ```bash
    > npm run dev
    > ```

  - Em outra aba do terminal, vá para a raiz do frontend:

    > ```bash
    > cd partiman/frontend
    > ```

  - Instale as dependências:

    > ```bash
    > npm install
    > ```

  - Configure o arquivo `.env` usando como base o arquivo `.env.example`

  - Inicie o programa:

    > ```bash
    > npm run dev
    > ```

  - Acesse http://localhost:5173/dashboard no seu navegador e aproveite <3
 
<br />

