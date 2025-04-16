# Plataforma de Blog/CMS

## Overview

Este projeto é uma plataforma completa de Blog e Sistema de Gerenciamento de Conteúdo (CMS) construída com tecnologias modernas de desenvolvimento web. Ele permite a criação, leitura, atualização e exclusão de posts, gerenciamento de usuários, categorias e tags, além de suportar comentários e upload de imagens.

## Tecnologias Utilizadas

### Frontend

* **Framework:** [Next.js](https://nextjs.org/) (versão 13 ou superior - utilizando a estrutura de diretórios `app` ou `pages`)
* **Biblioteca:** [React](https://react.dev/)
* **Linguagem:** [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) (com possíveis extensões como JSX)
* **Gerenciamento de Estado:** (A ser definido - pode ser Context API, Redux, Zustand, etc.)
* **Estilização:** (A ser definido - pode ser CSS Modules, Styled Components, Tailwind CSS, etc.)
* **Outras Bibliotecas:** (A serem adicionadas conforme necessário - por exemplo, para formulários, validação, etc.)

### Backend

* **Linguagem:** [TypeScript](https://www.typescriptlang.org/) (um superset do JavaScript que adiciona tipagem estática opcional e outros recursos)
* **Ambiente de Runtime:** [Node.js](https://nodejs.org/) (permite executar código JavaScript/TypeScript no servidor)
* **Framework:** [Express](https://expressjs.com/) (framework minimalista para Node.js que facilita a criação de APIs web)
* **Middleware para Upload de Arquivos:** [Multer](https://github.com/expressjs/multer) (para lidar com o upload de imagens)
* **Biblioteca para Interação com AWS S3:** [AWS SDK for JavaScript](https://aws.amazon.com/sdk-for-javascript/) (`aws-sdk`)
* **Biblioteca para Hashing de Senhas:** [bcrypt](https://www.npmjs.com/package/bcrypt)
* **Autenticação:** [JSON Web Tokens (JWT)](https://jwt.io/) (para autenticação e autorização de usuários)
* **Ferramentas de Build:** [tsc](https://www.typescriptlang.org/docs/handbook/compiler-options.html) (o compilador TypeScript para converter `.ts` em `.js`)
* **Outras Bibliotecas:** (A serem adicionadas conforme necessário - por exemplo, para validação, segurança, etc.)

### Banco de Dados

* **Sistema de Gerenciamento de Banco de Dados Relacional (SGBDR):** [PostgreSQL](https://www.postgresql.org/)
* **ORM (Object-Relational Mapper):** [Prisma](https://www.prisma.io/) ou [Sequelize](https://sequelize.org/) (Escolher um para facilitar a interação com o PostgreSQL)

### Storage

* **Armazenamento de Imagens na Nuvem:** [Amazon S3](https://aws.amazon.com/s3/)