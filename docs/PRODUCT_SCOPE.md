# NEXORA - Product Scope

## 1. Vision General

NEXORA es una plataforma ecommerce de ropa moderna, pensada para vender prendas online con una experiencia visual premium y un panel administrativo simple para una propietaria no tecnica.

El proyecto debe funcionar como:

- Proyecto de clase presentable.
- Proyecto open source publicable en GitHub.
- Producto vendible para una tienda de ropa real.

NEXORA no busca ser una tienda generica. Debe sentirse como una marca fashion moderna, clara, visual y facil de administrar.

## 2. Problema

Muchas tiendas pequenas de ropa venden por redes sociales o mensajes directos, pero tienen problemas para:

- Mostrar su catalogo de forma ordenada.
- Controlar stock por talla y color.
- Gestionar pedidos sin confusiones.
- Recibir comentarios de clientes.
- Responder preguntas frecuentes sobre prendas.
- Administrar productos sin depender de una persona tecnica.

## 3. Propuesta de Valor

NEXORA centraliza la venta de ropa en una plataforma moderna que permite:

- Comprar prendas desde una experiencia visual atractiva.
- Consultar tallas, colores, stock y comentarios.
- Gestionar productos, pedidos y comentarios desde un panel simple.
- Mantener una base tecnica escalable y documentada.

## 4. Usuarios Principales

### Cliente

Persona que visita la tienda para descubrir, comparar y comprar ropa.

Necesita:

- Ver productos rapidamente.
- Filtrar por categoria, talla, color y precio.
- Revisar disponibilidad.
- Leer comentarios.
- Agregar productos al carrito.
- Realizar pedidos facilmente.

### Administradora

Propietaria de la tienda. Tiene 56 anos y poco conocimiento tecnico, pero puede adaptarse si el sistema es claro.

Necesita:

- Agregar prendas sin complicarse.
- Actualizar stock por talla y color.
- Ver pedidos pendientes.
- Revisar comentarios.
- Responder preguntas de clientes.
- Entender el estado de la tienda sin tecnicismos.

### Desarrollador / Evaluador

Persona que revisa el proyecto como codigo open source o proyecto academico.

Necesita:

- README claro.
- Instalacion sencilla.
- Arquitectura ordenada.
- Modelo de datos entendible.
- Roadmap y decisiones tecnicas documentadas.

## 5. Stack Oficial

```txt
Next.js + TypeScript
NestJS + TypeScript
PostgreSQL + Prisma
Redis
Cloudinary o S3
Mercado Pago / Stripe
WebAuthn / Passkeys
Docker
GitHub Actions
```

## 6. Alcance del MVP

El MVP debe demostrar que NEXORA puede funcionar como ecommerce real de ropa sin intentar construir todo desde el inicio.

### Cliente

Incluye:

- Home moderna con estilo editorial/fashion.
- Header moderno inspirado en navegacion tipo Scuffers, sin copiar marca ni diseno exacto.
- Menu desplegable con categorias.
- Catalogo de prendas.
- Filtros basicos:
  - Categoria.
  - Talla.
  - Color.
  - Precio.
  - Disponibilidad.
- Detalle de producto.
- Seleccion de talla y color.
- Stock visible por variante.
- Carrito de compras.
- Login y registro basico.
- Reviews basicos con estrellas y comentario escrito.

### Administracion

Incluye:

- Dashboard simple.
- Listado de productos.
- Crear producto.
- Editar producto.
- Publicar/pausar producto.
- Gestionar tallas, colores y stock.
- Subir o registrar imagenes de productos.
- Ver pedidos basicos.
- Cambiar estado de pedido.
- Ver comentarios.
- Ocultar o aprobar comentarios.

### Backend

Incluye:

- API REST con NestJS.
- Base de datos PostgreSQL.
- Prisma como ORM.
- Autenticacion basica con roles.
- Validacion de datos.
- Modelo de productos con variantes.
- Modelo de reviews.
- Modelo basico de pedidos.

### Documentacion

Incluye:

- README inicial.
- Documentacion de alcance.
- Roadmap.
- Modelo de datos inicial.
- Decisiones tecnicas importantes.
- Variables de entorno de ejemplo.

## 7. Fuera del MVP

No entra en la primera version:

- Pagos reales con Mercado Pago o Stripe.
- Passkeys/WebAuthn.
- Login con Google.
- Reviews con imagenes.
- Moderacion avanzada de comentarios.
- Preguntas y respuestas completas.
- Analytics avanzado.
- Notificaciones por correo.
- Automatizacion completa con GitHub Actions.
- Redis avanzado.
- Despliegue en produccion.
- Sistema multi-tienda.

Estas funcionalidades no se descartan. Se planifican para fases posteriores.

## 8. Modulos del Sistema

### Auth

Gestiona registro, login, logout, roles y sesiones.

MVP:

- Registro con email y contrasena.
- Login.
- Rol cliente.
- Rol administrador.

Futuro:

- Passkeys/WebAuthn.
- OAuth con Google.
- Recuperacion avanzada de cuenta.

### Products

Gestiona prendas base.

MVP:

- Nombre.
- Descripcion.
- Categoria.
- Precio.
- Estado.
- Imagenes.

Futuro:

- SEO avanzado.
- Productos relacionados.
- Colecciones inteligentes.

### Product Variants

Gestiona tallas, colores y stock.

MVP:

- Talla.
- Color.
- Stock.
- Precio opcional por variante.

Ejemplo:

```txt
Polo Oversize NEXORA Basic
- Negro / S / 10 unidades
- Negro / M / 5 unidades
- Blanco / S / 8 unidades
- Blanco / M / 0 unidades
```

### Cart

Gestiona productos seleccionados por el cliente.

MVP:

- Agregar producto.
- Quitar producto.
- Cambiar cantidad.
- Calcular subtotal.

### Orders

Gestiona pedidos realizados.

MVP:

- Crear pedido basico.
- Ver pedidos en admin.
- Cambiar estado del pedido.

Estados sugeridos:

```txt
Pendiente
Confirmado
Preparando
Enviado
Entregado
Cancelado
```

### Reviews

Gestiona comentarios de productos.

MVP:

- Rating de 1 a 5 estrellas.
- Comentario escrito.
- Estado de moderacion.
- Promedio por producto.

Estados sugeridos:

```txt
Pendiente
Visible
Oculto
Reportado
Rechazado
```

### Admin Dashboard

Gestiona la operacion de la tienda.

MVP:

- Ventas o pedidos del dia.
- Pedidos pendientes.
- Productos con bajo stock.
- Ultimos comentarios.
- Accesos rapidos.

## 9. UX Principal

### Tienda

La experiencia de cliente debe ser:

- Moderna.
- Visual.
- Rapida.
- Mobile-first.
- Clara para comprar.

Pantallas MVP:

- Home.
- Catalogo.
- Detalle de producto.
- Carrito.
- Login/registro.
- Perfil basico.

### Admin

La experiencia de administracion debe ser:

- Simple.
- Clara.
- En espanol.
- Con acciones visibles.
- Sin tecnicismos innecesarios.

Pantallas MVP:

- Dashboard.
- Productos.
- Crear/editar producto.
- Stock.
- Pedidos.
- Comentarios.

## 10. Criterios de Exito del MVP

El MVP se considera exitoso si:

- Un cliente puede navegar productos y agregarlos al carrito.
- Un cliente puede seleccionar talla y color.
- El sistema muestra stock real por variante.
- Un administrador puede crear y editar prendas.
- Un administrador puede actualizar stock.
- Un administrador puede ver pedidos.
- Un cliente puede dejar un comentario.
- Un administrador puede moderar comentarios.
- El proyecto se puede ejecutar localmente con instrucciones claras.
- El README permite entender el producto y el stack.

## 11. Roadmap por Fases

### Fase 0 - Definicion

- Cerrar alcance del MVP.
- Definir arquitectura.
- Definir modelo de datos.
- Definir pantallas principales.
- Crear documentacion inicial.

### Fase 1 - Base Tecnica

- Crear estructura del repo.
- Configurar Next.js.
- Configurar NestJS.
- Configurar PostgreSQL y Prisma.
- Configurar Docker local.
- Crear README inicial.

### Fase 2 - Catalogo y Productos

- Crear modelo de productos.
- Crear variantes.
- Crear stock por talla/color.
- Crear catalogo.
- Crear detalle de producto.

### Fase 3 - Carrito y Pedidos

- Crear carrito.
- Crear flujo basico de pedido.
- Crear panel admin de pedidos.

### Fase 4 - Admin Dashboard

- Crear dashboard.
- Crear CRUD de productos.
- Crear gestion de stock.
- Crear moderacion de comentarios.

### Fase 5 - Reviews

- Crear reviews basicos.
- Mostrar rating promedio.
- Agregar estados de moderacion.

### Fase 6 - Funciones Avanzadas

- Pagos reales.
- Passkeys/WebAuthn.
- Reviews con imagenes.
- Preguntas y respuestas.
- Notificaciones.
- Analytics.
- CI/CD.
- Despliegue.

## 12. Reglas de Producto

- Pensar en grande, pero construir por fases.
- Priorizar primero lo que demuestra valor.
- No sacrificar usabilidad por verse moderno.
- No hacer un admin dificil para la propietaria.
- No copiar referencias visuales literalmente.
- Mantener el proyecto explicable para clase.
- Mantener el repo profesional para GitHub.

## 13. Proxima Decision

Despues de este alcance, la siguiente decision recomendada es definir la estructura del repo:

```txt
nexora/
├── apps/
│   ├── web/
│   └── api/
├── packages/
├── docs/
└── docker-compose.yml
```

Vamos usar monorepo.

