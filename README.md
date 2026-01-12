# Prueba de Carga - FakeStoreAPI Login

Este repositorio contiene los scripts y artefactos para la prueba de carga del servicio de login de FakeStoreAPI.

## Prerrequisitos
* **Sistema Operativo:** Windows 10/11, MacOS o Linux.
* **Java JDK:** Versión 17 (Requerido si se usa JMeter, en mi caso usé K6).
* **Herramienta de Carga:** K6 v0.45.0+ (Recomendado) o JMeter 5.6.
* **IDE:** IntelliJ IDEA 2024.x.

## Instalación
1. Clonar el repositorio.
2. Asegurar que `k6` está en el PATH del sistema.
3. Verificar el archivo de datos en `k6/data/users.csv`.

## Ejecución (K6)
Desde la terminal, navegue a la carpeta `k6/` y ejecute:

```bash
k6 run login-load.js
```

```bash
k6 run login-load.js --summary-export=reports/summary.json
```
