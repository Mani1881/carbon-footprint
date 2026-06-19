
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import helmet from 'helmet';
import compression from 'compression';

const app = express();
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 8080;

// Security and Efficiency Middleware
app.use(helmet());
app.use(compression());

// Resolve __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static assets from Vite's distribution folder
app.use(express.static(path.join(__dirname, 'dist')));

// SPA Router Fallback - return index.html for all other routes
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 EcoTrace production server running on port ${PORT}`);
  console.log(`Serving static files from ${path.join(__dirname, 'dist')}`);
});
