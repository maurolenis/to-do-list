# 📝 To-Do List App

Aplicación móvil de gestión de tareas construida con **Ionic + Angular** y **Capacitor**, siguiendo principios de **Clean Architecture**.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Arquitectura del Proyecto](#arquitectura-del-proyecto)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Ejecución en Local](#ejecución-en-local)
- [Ejecución en Dispositivos](#ejecución-en-dispositivos)
- [Generar Builds](#generar-builds)
- [Scripts Disponibles](#scripts-disponibles)

---

## ✨ Características

- ✅ Gestión de tareas con categorías
- ✅ Interfaz intuitiva con Ionic Components
- ✅ Soporte multiplataforma (iOS y Android)
- ✅ Persistencia de datos con Firebase
- ✅ Arquitectura limpia y escalable

---

## 🛠️ Tecnologías

- **Framework**: Angular 20
- **UI**: Ionic Framework 8
- **Plataforma Móvil**: Capacitor 8
- **Backend**: Firebase 12
- **Lenguaje**: TypeScript
- **Estilos**: SCSS

---

## 🏗️ Arquitectura del Proyecto

Este proyecto sigue los principios de **Clean Architecture**, separando la lógica de negocio de los detalles de implementación.

```
to-do-list/
├── src/
│   ├── app/
│   │   ├── config/              # Configuración global de la app
│   │   │   ├── icons/           # Configuración de iconos
│   │   │   ├── menu/            # Configuración del menú
│   │   │   └── services/        # Servicios de configuración
│   │   │
│   │   ├── domain/              # CAPA DE DOMINIO (Lógica de negocio)
│   │   │   ├── entities/        # Entidades del dominio
│   │   │   ├── models/          # Modelos e interfaces del dominio
│   │   │   ├── repositories/    # Interfaces de repositorios
│   │   │   ├── datasources/     # Interfaces de fuentes de datos
│   │   │   └── use-cases/       # Casos de uso (reglas de negocio)
│   │   │
│   │   ├── data/                # CAPA DE DATOS (Implementación)
│   │   │   ├── datasources/     # Implementación de datasources (API, DB)
│   │   │   ├── models/          # DTOs y modelos de datos
│   │   │   ├── repositories/    # Implementación de repositorios
│   │   │   └── services/        # Servicios de acceso a datos
│   │   │
│   │   ├── presentation/        # CAPA DE PRESENTACIÓN (UI)
│   │   │   ├── pages/           # Páginas de la aplicación
│   │   │   ├── components/      # Componentes reutilizables
│   │   │   └── services/        # Servicios de presentación
│   │   │
│   │   ├── app.component.ts     # Componente raíz
│   │   └── app.routes.ts        # Configuración de rutas
│   │
│   ├── assets/                  # Recursos estáticos (imágenes, iconos)
│   ├── environments/            # Configuración de entornos
│   ├── theme/                   # Estilos globales y temas
│   └── index.html               # Punto de entrada HTML
│
├── android/                     # Proyecto nativo Android (Capacitor)
├── ios/                         # Proyecto nativo iOS (Capacitor)
├── www/                         # Build de producción (generado)
│
├── capacitor.config.ts          # Configuración de Capacitor
├── angular.json                 # Configuración de Angular
├── ionic.config.json            # Configuración de Ionic
├── package.json                 # Dependencias y scripts
└── tsconfig.json                # Configuración de TypeScript
```

### 📦 Explicación de las Capas

#### **1. Domain (Dominio)**

Contiene la **lógica de negocio pura**, independiente de frameworks y tecnologías:

- **Entities**: Objetos del dominio con reglas de negocio
- **Use Cases**: Casos de uso que orquestan la lógica de negocio
- **Repositories**: Interfaces que definen cómo acceder a los datos
- **Datasources**: Interfaces para fuentes de datos externas

**¿Por qué?** Mantener la lógica de negocio independiente facilita testing, mantenimiento y migración a otras tecnologías.

#### **2. Data (Datos)**

Implementa las **interfaces definidas en Domain**:

- **Datasources**: Implementación de acceso a Firebase, APIs, Storage local
- **Models**: DTOs para serialización/deserialización de datos
- **Repositories**: Implementación concreta de los repositorios
- **Services**: Servicios específicos de acceso a datos

**¿Por qué?** Separa la implementación de la abstracción, permitiendo cambiar tecnologías sin afectar la lógica de negocio.

#### **3. Presentation (Presentación)**

Contiene todo lo relacionado con la **interfaz de usuario**:

- **Pages**: Pantallas completas de la aplicación
- **Components**: Componentes reutilizables (botones, cards, etc.)
- **Services**: Servicios de UI (manejo de estado, navegación)

**¿Por qué?** Aísla la UI de la lógica de negocio, facilitando cambios de diseño sin afectar funcionalidades.

#### **4. Config (Configuración)**

Configuraciones globales de la aplicación:

- **Icons**: Registro de iconos
- **Menu**: Estructura del menú
- **Services**: Servicios compartidos (autenticación, storage)

**¿Por qué?** Centraliza configuraciones para fácil mantenimiento y modificación.

---

## 📋 Requisitos Previos

### Para desarrollo en general:

- **Node.js** 18 o superior
- **npm** 9 o superior
- **Ionic CLI**: `npm install -g @ionic/cli`
- **Git**

### Para Android:

- **Android Studio** (última versión)
- **Android SDK** (API 24 o superior)
- **Java 21** (OpenJDK)
- **Variables de entorno configuradas**:
  ```bash
  export ANDROID_HOME=$HOME/Library/Android/sdk
  export JAVA_HOME=/opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk/Contents/Home
  export PATH=$PATH:$ANDROID_HOME/platform-tools:$ANDROID_HOME/emulator
  ```

### Para iOS (solo macOS):

- **Xcode** (última versión desde App Store)
- **Xcode Command Line Tools**
- **CocoaPods**: `sudo gem install cocoapods`
- **Cuenta de Apple ID** (para desarrollo en dispositivos)

---

## 🚀 Instalación

1. **Clonar el repositorio**:

   ```bash
   git clone <url-del-repositorio>
   cd to-do-list
   ```

2. **Instalar dependencias**:

   ```bash
   npm install
   ```

3. **Configurar Firebase** (si es necesario):
   - Crea un proyecto en [Firebase Console](https://console.firebase.google.com/)
   - Descarga el archivo de configuración
   - Actualiza las credenciales en `src/environments/`

---

## 💻 Ejecución en Local

### Servidor de Desarrollo (Navegador)

```bash
# Iniciar servidor de desarrollo
npm start

# O usando Ionic CLI
ionic serve
```

La aplicación estará disponible en: `http://localhost:8100`

**Hot Reload**: Los cambios se reflejan automáticamente al guardar archivos.

### Build de Producción

```bash
# Compilar para producción
npm run build

# Compilar y sincronizar con plataformas nativas
npm run build:demo
```

Los archivos compilados se generan en la carpeta `www/`.

---

## 📱 Ejecución en Dispositivos

### Android

#### 1. Preparar el Proyecto

```bash
# Compilar la aplicación web
npm run build

# Agregar plataforma Android (solo primera vez)
npx cap add android

# Sincronizar código web con Android
npx cap sync android
```

#### 2. Ejecutar en Emulador

```bash
# Opción 1: Usando el script configurado (con livereload)
npm run android

# Opción 2: Usando Capacitor directamente
npx cap run android

# Opción 3: Abrir en Android Studio
npx cap open android
# Luego: Selecciona emulador y presiona Run ▶️
```

**Listar emuladores disponibles**:

```bash
npx cap run android --list
```

**Ejecutar en emulador específico**:

```bash
TARGET_ID="Pixel_5_API_30" npm run android:target
```

#### 3. Ejecutar en Dispositivo Físico

1. **Habilitar modo desarrollador** en Android:
   - Ajustes → Acerca del teléfono
   - Toca 7 veces en "Número de compilación"

2. **Habilitar depuración USB**:
   - Ajustes → Opciones de desarrollador
   - Activar "Depuración USB"

3. **Conectar dispositivo** con cable USB

4. **Verificar conexión**:

   ```bash
   adb devices
   ```

5. **Ejecutar**:
   ```bash
   npm run android
   ```

---

### iOS (solo macOS)

#### 1. Preparar el Proyecto

```bash
# Compilar la aplicación web
npm run build

# Agregar plataforma iOS (solo primera vez)
npx cap add ios

# Sincronizar código web con iOS
npx cap sync ios

# Instalar pods (primera vez o después de agregar plugins)
cd ios/App
pod install
cd ../..
```

#### 2. Ejecutar en Simulador

```bash
# Opción 1: Usando el script configurado (con livereload)
npm run ios

# Opción 2: Abrir Xcode y ejecutar
npx cap open ios
# En Xcode: Selecciona simulador y presiona Run ▶️
```

**Listar simuladores disponibles**:

```bash
xcrun simctl list devices
```

#### 3. Ejecutar en Dispositivo Físico

1. **Conectar iPhone/iPad** con cable USB

2. **Abrir Xcode**:

   ```bash
   npx cap open ios
   ```

3. **Configurar firma** (primera vez):
   - Selecciona el proyecto "App"
   - Pestaña "Signing & Capabilities"
   - Marca "Automatically manage signing"
   - Selecciona tu Team (Apple ID)

4. **Seleccionar dispositivo**:
   - En la barra superior de Xcode, selecciona tu iPhone/iPad

5. **Ejecutar**:
   - Presiona el botón Run ▶️

6. **Confiar en el desarrollador** (primera vez en el dispositivo):
   - En el iPhone: Ajustes → General → VPN y gestión de dispositivos
   - Toca tu Apple ID → Confiar

---

### 🔄 Livereload en Dispositivos

Para desarrollo con recarga automática en dispositivos físicos:

**Android**:

```bash
npm run android
```

**iOS**:

```bash
npm run ios
```

**Dispositivo específico**:

```bash
TARGET_ID="<device-id>" npm run android:target
TARGET_ID="<device-id>" npm run ios:target
```

**Nota**: El dispositivo debe estar en la **misma red WiFi** que tu computadora.

---

## 📦 Generar Builds

### APK para Android (Testing)

```bash
# APK de debug (rápido, sin firma)
npm run apk:debug

# Ubicación del APK:
# android/app/build/outputs/apk/debug/app-debug.apk
```

**Instalar APK en dispositivo**:

```bash
# Vía ADB
adb install android/app/build/outputs/apk/debug/app-debug.apk

# O enviarlo por email/AirDrop al dispositivo e instalarlo
```

### AAB para Google Play Store

```bash
# 1. Compilar
npm run build -- --configuration production
npx cap sync android

# 2. Generar AAB firmado
cd android
./gradlew bundleRelease

# Ubicación del AAB:
# android/app/build/outputs/bundle/release/app-release.aab
```

**Nota**: Requiere configurar `keystore` para firmar. Ver [Documentación de Android](https://developer.android.com/studio/publish/app-signing).

### IPA para iOS (Testing)

**Opción 1: Desde Xcode (recomendado)**:

1. Compilar y sincronizar:

   ```bash
   npm run build -- --configuration production
   npx cap sync ios
   npx cap open ios
   ```

2. En Xcode:
   - Seleccionar "Any iOS Device"
   - Menú: Product → Archive
   - En Organizer: Distribute App → Debugging → Export

**Opción 2: Instalar directamente** (sin generar IPA):

1. Conectar iPhone/iPad
2. En Xcode, seleccionar dispositivo
3. Presionar Run ▶️
4. La app se instala directamente

**Nota**: Generar IPA para distribución requiere **Apple Developer Program** ($99/año).

---

## 🎯 Scripts Disponibles

### Desarrollo

```bash
npm start              # Servidor de desarrollo en navegador
npm run build          # Build de producción
npm run watch          # Build con watch mode
npm test              # Ejecutar tests
npm run lint          # Linter
npm run format        # Formatear código con Prettier
```

### Móvil

```bash
npm run ios           # Ejecutar en iOS con livereload
npm run android       # Ejecutar en Android con livereload
npm run build:demo    # Build y sync con plataformas
npm run apk:debug     # Generar APK de debug
npm run ios:demo      # Build y abrir Xcode
```

### Capacitor

```bash
npx cap sync          # Sincronizar código web con plataformas nativas
npx cap open ios      # Abrir proyecto iOS en Xcode
npx cap open android  # Abrir proyecto Android en Android Studio
npx cap add <platform># Agregar plataforma (ios/android)
npx cap update        # Actualizar plugins de Capacitor
```

---

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

---

## 📞 Contacto

**Mauricio Lenis** - [GitHub](https://github.com/mauricio.lenis)

---

## 🔗 Enlaces Útiles

- [Documentación de Ionic](https://ionicframework.com/docs)
- [Documentación de Angular](https://angular.io/docs)
- [Documentación de Capacitor](https://capacitorjs.com/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

---

**¡Feliz desarrollo! 🚀**
