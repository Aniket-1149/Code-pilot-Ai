const { exec } = require('child_process');
const fs = require('fs/promises');
const path = require('path');
const os = require('os');
const { AppError } = require('../utils/errors');

async function executeCode({ code, language }) {
  if (!code) throw new AppError('No code provided', 400);
  
  if (language === 'typescript' || language === 'javascript') {
    const isTS = language === 'typescript';
    const ext = isTS ? 'ts' : 'js';
    const tmpDir = os.tmpdir();
    const fileName = `exec_${Date.now()}.${ext}`;
    const filePath = path.join(tmpDir, fileName);
    
    await fs.writeFile(filePath, code);
    
    return new Promise((resolve) => {
      // For typescript we would ideally use ts-node, but let's assume we can run js with node for now
      // Or bun if available. Let's just try node for JS, and npx tsx for TS.
      const cmd = isTS ? `npx tsx "${filePath}"` : `node "${filePath}"`;
      
      exec(cmd, { timeout: 10000 }, async (error, stdout, stderr) => {
        // Clean up
        try { await fs.unlink(filePath); } catch (e) { /* ignore */ }
        
        let output = stdout;
        if (stderr) {
          output += (output ? '\n' : '') + 'Error:\n' + stderr;
        }
        if (error && !stderr) {
          output += (output ? '\n' : '') + error.message;
        }
        resolve({ output: output.trim() || 'Done (no output)' });
      });
    });
  }
  
  throw new AppError('Language not supported.', 501);
}

module.exports = { executeCode };
