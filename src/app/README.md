# Arquitectura Limpia en Angular

Este proyecto sigue los principios de Arquitectura Limpia (Clean Architecture) para mantener un código organizado, mantenible y escalable.

## Estructura de Directorios

```
src/app/
├── core/                  # Núcleo de la aplicación
│   ├── models/            # Modelos de dominio
│   ├── interfaces/        # Interfaces y tipos
│   ├── enums/             # Enumeraciones
│   └── config/            # Configuraciones globales
├── data/                  # Capa de datos
│   ├── repositories/      # Implementaciones de repositorios
│   ├── datasources/       # Fuentes de datos (API, localStorage, etc.)
│   └── mappers/           # Convertidores entre modelos de datos y dominio
├── domain/                # Capa de dominio
│   ├── repositories/      # Interfaces de repositorios
│   ├── usecases/          # Casos de uso de la aplicación
│   └── entities/          # Entidades de dominio
├── presentation/          # Capa de presentación
│   ├── pages/             # Páginas principales
│   ├── components/        # Componentes reutilizables
│   ├── guards/            # Guards de rutas
│   └── interceptors/      # Interceptores HTTP
└── shared/                # Recursos compartidos
    ├── components/        # Componentes compartidos
    ├── directives/        # Directivas compartidas
    ├── pipes/             # Pipes compartidos
    └── utils/             # Utilidades y helpers
```

## Principios

1. **Independencia de Frameworks**: El núcleo de la aplicación no depende de frameworks externos.
2. **Separación de Responsabilidades**: Cada capa tiene una responsabilidad única y bien definida.
3. **Dependencias Unidireccionales**: Las dependencias apuntan hacia adentro, desde la capa externa hacia la interna.
4. **Entidades Centrales**: Las entidades de negocio están en el centro de la arquitectura.

## Convenciones de Nomenclatura

- Todas las variables, funciones y clases están nombradas en español.
- Se utiliza camelCase para variables y funciones.
- Se utiliza PascalCase para clases e interfaces.
- Los nombres deben ser descriptivos y evitar abreviaturas.

## Flujo de Datos

1. **Componentes/Pages** → Muestran datos y capturan eventos del usuario.
2. **Casos de Uso** → Contienen la lógica de negocio y orquestan las operaciones.
3. **Repositorios** → Definen las operaciones disponibles para acceder a los datos.
4. **Fuentes de Datos** → Implementan el acceso a APIs, bases de datos, etc.

## Manejo de Estado

Se utiliza un enfoque unidireccional para el manejo del estado:

1. Los componentes disparan acciones.
2. Las acciones invocan casos de uso.
3. Los casos de uso actualizan el estado a través de repositorios.
4. Los componentes se actualizan en respuesta a cambios en el estado.