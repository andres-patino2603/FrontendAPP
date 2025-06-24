# 💼 PropuestaApptiva – Sistema de Gestión de Créditos

Desarrollado por: **Andrés Patiño**  
Tecnologías: **React + Node.js (Express) + MySQL**  
Deploy en Render:  
🔗 [Frontend](https://TU-FRONTEND.onrender.com)  
🔗 [Backend](https://backendapp-twgq.onrender.com)

---

## 📌 Descripción General

Este proyecto es una solución **full stack** que permite a una institución financiera gestionar clientes y sus créditos de forma sencilla y eficiente.  
Ofrece:

- Registro de clientes.
- Asignación de créditos tanto a clientes nuevos como existentes.
- Visualización de todos los créditos emitidos con detalle.

---

## 🧩 Estructura Tecnológica

### 🖥️ Frontend: React + Vite

- **Librería:** React (componentes funcionales).
- **Empaquetador:** Vite (desarrollo ultrarrápido).
- **Estilos:** CSS puro con una estructura limpia y responsiva.
- **Consumo de API:** `fetch` con manejo de errores y estados.

#### Funcionalidades

- Registro de clientes desde formulario principal.
- Asignación de crédito mediante formulario separado si ya existe el cliente.
- Tabla dinámica con información de créditos y clientes.
- Alertas y validaciones amigables.

---

### 🛠️ Backend: Node.js + Express

- **Framework:** Express para construir las rutas de API.
- **Base de datos:** MySQL con conexión mediante `mysql2/promise`.
- **CORS:** Activado para permitir la conexión desde frontend.
- **Variables de entorno:** Controladas vía `.env`.

#### Rutas API

```bash
POST /api/clientes
GET /api/clientes?cedula=xxxxxx
POST /api/creditos
GET /api/clientes_creditos
```
## 🚀 Despliegue en Render

### 📁 Backend

Crear repositorio separado con los siguientes archivos:

- `server.js`
- `.env` (privado, no subir al repositorio)
- `package.json`

## En Render:

- Tipo: **Web Service**
- Root directory: `backend`
- Start command: `node server.js`

Variables de entorno necesarias en Render:

- `DB_HOST`
- `DB_PORT`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`
- `PORT`

---

### 💻 Frontend
```bash
Copiar
Editar
cd frontend
npm install
npm run dev
```
## 💡 Decisiones de diseño
-**Separación de responsabilidades:** Backend y frontend en repos separados para claridad y escalabilidad.

-**Manejo de estado simple:** Uso de useState y useEffect para mantener un código accesible y mantenible.

-**Consultas eficientes:** LEFT JOIN en la consulta principal para combinar información de clientes y créditos.

-**Código mantenible:** Separación de funciones por lógica y componentes reutilizables en React.

## 🧪 Datos de prueba
Se insertaron 10 clientes con IDs del 9 al 18.
Créditos asignados para demostrar funcionalidad de consulta y visualización.
Puedes realizar pruebas buscando por cédula desde el buscador del frontend.

## 🎯 Mejoras propuestas
-Autenticación con roles (asesor, admin).
-Historial de pagos y cálculo de amortizaciones.
-Dashboard con métricas visuales y gráficas.
-Exportación de reportes a PDF y Excel.
-Notificaciones automáticas por email o SMS.

## 🖼️ Capturas de pantalla (opcional)
Puedes agregar capturas aquí para mostrar el funcionamiento visual de la app.

## 📩 Contacto
## 📧 andrespatino.dev@gmail.com

## 🔗 GitHub: andres-patino2603

Este proyecto fue desarrollado como una propuesta técnica moderna para la gestión y análisis de créditos, cuidando tanto la presentación como la arquitectura técnica y el despliegue en producción.

