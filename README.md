# Ticket Manager – Pixibytes

Aplicación móvil desarrollada en **React Native** con **Expo**, conectada a **Firebase** (Authentication + Firestore + Storage), para la gestión y seguimiento de tickets en tiempo real.  
Permite crear, visualizar y actualizar el estado de tickets de forma sencilla y rápida.

---

## Funcionalidades principales

- **Autenticación de usuarios** (registro e inicio de sesión con Firebase Authentication).
- **Creación de tickets** con título, descripción y usuario asignado.
- **Actualización de estado** de tickets con control de flujo (no se puede retroceder en estados).
- **Visualización en tiempo real** de los tickets gracias a Firestore.
- **Interfaz amigable** y optimizada para móviles.
- **Enlace directo a detalle de ticket**.
- **Compilación APK lista para instalar**.

---

## Tecnologías utilizadas

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Cloud Firestore](https://firebase.google.com/docs/firestore)
- [Firebase Storage](https://firebase.google.com/docs/storage)
- [PropTypes](https://www.npmjs.com/package/prop-types)

---

## 📦 Instalación y ejecución

1. **Clona el repositorio**:
   ```bash
   git clone https://github.com/Angelafd/ticket-manager-clean.git
   cd ticket-manager-clean


2. Instala dependencias:
npm install


3. Inicia la app:
npx expo start

4. Escanea el código QR con la app Expo Go en tu dispositivo móvil o presiona "a" para abrir en el emulador de Android.