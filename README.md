<div align="center">
  <h1><code>&lt;/&gt;</code> NEXORA <code>&lt;/&gt;</code></h1>
  <p><b>Ecommerce moderno de ropa desarrollado como proyecto académico y open source.</b></p>
</div>

<br/>

## 🛠️ Stack Tecnológico

| Área | Tecnologías |
| :--- | :--- |
| <br>**🖥️🎨 Frontend**<br><br> | <br>![Next JS](https://img.shields.io/badge/Next-black.svg?style=for-the-badge&logo=next.js&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Shadcn/ui](https://img.shields.io/badge/shadcn/ui-%23000000.svg?style=for-the-badge&logo=shadcnui&logoColor=white)<br><br> |
| <br>**💻 Backend**<br><br> | <br>![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)<br><br> |
| <br>**💾 Base de Datos**<br><br> | <br>![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) ![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)<br><br> |
| <br>**☁️ Servicios**<br><br> | <br>![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=Cloudinary&logoColor=white) ![AWS S3](https://img.shields.io/badge/AWS_S3-569A31?style=for-the-badge&logo=amazon-s3&logoColor=white) ![Stripe](https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=Stripe&logoColor=white) ![Mercado Pago](https://img.shields.io/badge/Mercado_Pago-00B1EA?style=for-the-badge&logo=mercadopago&logoColor=white) ![WebAuthn](https://img.shields.io/badge/WebAuthn-343434?style=for-the-badge&logo=passbolt&logoColor=white)<br><br> |
| <br>**⚙️ DevOps**<br><br> | <br>![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white) ![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)<br><br> |

---

## 🚀 Ejecución Rápida (Docker)

```bash
# clonar repositorio
git clone <https://github.com/XATEDAY/NEXORA.git>

# entrar al proyecto
cd nexora

# crear variables de entorno
cp .env.example .env

# levantar todo el proyecto
docker compose --profile full up --build
```

## 🧑‍💻 Modo Desarrollo

Si deseas aportar al proyecto o trabajar con Hot-Reload (recarga rápida), este es el flujo de trabajo ideal para tu entorno local.

>Requisitos: Asegúrate de tener instalados Node.js y pnpm en tu máquina.

```bash
# Levanta únicamente los servicios base en segundo plano (Postgres y Redis):
docker compose up -d postgres redis

# Instala las dependencias del monorepo:
pnpm install

# Configurar variables de entorno
cp .env.example .env

# Sincronizar base de datos
pnpm prisma:push

# Inicia el entorno de desarrollo:
pnpm dev
```

<p align="center">
  <img src="./assets/go.jpg" alt="Advertencia Divertida del Go Gopher" width="200">
</p>

> **Configuración del Monorepo**
> 
> Para que los comandos de ejecución funcionen correctamente, asegúrate de tener definidos los siguientes scripts en el archivo `package.json` de la raíz del proyecto:
>
> ```json
> {
>   "scripts": {
>     "dev": "pnpm --parallel --filter web --filter api dev",
>     "prisma:push": "pnpm --filter api prisma db push"
>   }
> }
> ```
--

## 📂 Estructura del Proyecto

```txt
nexora/
├── apps/
│   ├── web/                # Aplicación Frontend en Next.js
│   └── api/                # API Backend en NestJS
├── packages/               # Lógica compartida, tipos de TS, UI o configs
├── docs/
│   └── ADR/                # Architecture Decision Records
├── .env.example            # Variables de entorno de referencia
├── .gitignore
├── docker-compose.yml      # Base de datos local, Redis y servicios auxiliares
└── README.md