# Bloco de notas

### Requisitos
> Postgres

> Node js

### Clonar o repósitorio no github
> `git clone https://github.com/letticiamoura/apsDesenvolvimentoWeb.git`

### Banco de dados
Navegar até a pasta database no arquivo index.js
> `./src/database/index.ts`

Configurando o banco de dados
> `Em USERNAME colocar o nome do seu banco de dados`

> `Em PASSWORD colocar a senha do seu banco de dados`

> `Em DATABASE o nome do seu banco de dados`

Criar a tabela tasks
```
 > CREATE TABLE tasks(
	id SERIAL PRIMARY KEY,
	title VARCHAR(60) NOT NULL,
	description TEXT,
	done BOOLEAN DEFAULT(FALSE),
	state INTEGER DEFAULT(1),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP
);
```

### BACKEND
* Instalar as dependencias
> `npm install`

* Executando o backend
> `npm run dev`


### FRONT END
Abrir o arquivo principal no navegador
> `index.html`

Utilizar o seguinte login:
> `USER: user`

> `PASSWORRD: 123`
