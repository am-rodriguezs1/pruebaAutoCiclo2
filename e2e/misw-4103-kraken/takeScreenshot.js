// Asume que este archivo está en una ruta como e2e/misw-4103-kraken/utils/takeScreenshot.js
// Ajusta las rutas relativas si es diferente.
const fs = require('fs');
const path = require('path');

async function takeKrakenScreenshot(driver, scenarioNumber, stepNumberOrName) {
    const stepId = String(stepNumberOrName).replace(/[^a-zA-Z0-9_-]/g, '_'); // Limpiar el nombre del paso para el nombre de archivo
    console.log(`[takeScreenshot] Iniciando. Scenario: ${scenarioNumber}, Step: ${stepId}`);
    try {
        // El working-directory del paso de GHA es e2e/misw-4103-kraken
        // Por lo tanto, process.cwd() dentro de la ejecución de Node será esa carpeta.
        // Queremos guardar en e2e/misw-4103-kraken/screenshots/
        const screenshotsDir = path.resolve(process.cwd(), 'screenshots'); 
        console.log(`[takeScreenshot] Directorio de screenshots objetivo (desde process.cwd()): ${screenshotsDir}`);

        if (!fs.existsSync(screenshotsDir)) {
            console.log(`[takeScreenshot] El directorio de screenshots no existe, creando en: ${screenshotsDir}`);
            fs.mkdirSync(screenshotsDir, { recursive: true });
            console.log(`[takeScreenshot] Directorio creado: ${screenshotsDir}`);
        } else {
            console.log(`[takeScreenshot] El directorio de screenshots ya existe: ${screenshotsDir}`);
        }

        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `S${scenarioNumber}_Step${stepId}_${timestamp}.png`;
        const filePath = path.join(screenshotsDir, filename);
        console.log(`[takeScreenshot] Ruta completa del archivo de screenshot: ${filePath}`);

        // Lógica para tomar el screenshot (esto depende de tu driver)
        // Ejemplo para WebdriverIO/Selenium:
        await driver.saveScreenshot(filePath);
        // Ejemplo para Puppeteer (si 'driver' es una 'page'):
        // await driver.screenshot({ path: filePath }); 

        console.log(`[takeScreenshot] >>> Screenshot DEBERÍA HABERSE GUARDADO en: ${filePath}`);
        
        // Verificar si el archivo realmente se creó
        if (fs.existsSync(filePath)) {
            console.log(`[takeScreenshot] CONFIRMADO: El archivo de screenshot existe en ${filePath}. Tamaño: ${fs.statSync(filePath).size} bytes.`);
        } else {
            console.error(`[takeScreenshot] ERROR CRÍTICO: El archivo de screenshot NO se encontró en ${filePath} después de intentar guardarlo.`);
        }

    } catch (error) {
        console.error(`[takeScreenshot] EXCEPCIÓN al intentar tomar/guardar screenshot: ${error.message}`, error.stack);
    }
}

// Asegúrate de que el nombre exportado coincida con cómo lo importas en step.js
module.exports = { takeKrakenScreenshot }; 
