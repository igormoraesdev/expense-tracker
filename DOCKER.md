# Configuração Docker para o Expense Tracker

Este projeto está configurado para ser executado em um ambiente Docker, facilitando a configuração e execução em qualquer máquina.

## Pré-requisitos

- [Docker](https://www.docker.com/get-started) instalado na sua máquina
- [Docker Compose](https://docs.docker.com/compose/install/) instalado na sua máquina

## Estrutura do Docker

O ambiente Docker consiste em três serviços principais:

1. **app** - Aplicação Next.js (Expense Tracker)

## Instruções de Uso

### Comandos Docker Compose manuais

1. Construa e inicie os containers:

   ```bash
   docker-compose up --build -d
   ```

2. Para visualizar os logs da aplicação:

   ```bash
   docker-compose logs -f app
   ```

3. Para parar os containers:
   ```bash
   docker-compose down
   ```

## Acessando os Serviços

- **Aplicação (Expense Tracker)**: http://localhost:3000

## Variáveis de Ambiente

As principais variáveis de ambiente estão configuradas no arquivo `docker-compose.yml`. Se precisar ajustá-las, edite o arquivo antes de iniciar os containers.

## Resolução de Problemas

### Portas em uso

Se alguma porta já estiver em uso na sua máquina (3000, 5432, 5050), você pode alterá-las no arquivo `docker-compose.yml`.

### Erro de conexão com o banco de dados

Verifique se todos os containers estão rodando:

```bash
docker-compose ps
```

Se o container do PostgreSQL não estiver rodando ou apresentar problemas, você pode verificar os logs:

```bash
docker-compose logs postgres
```

### Resetando completamente o ambiente

Para remover todos os containers, volumes e redes:

```bash
docker-compose down -v --remove-orphans
```
