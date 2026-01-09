import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'app/nueva-cita/:tipo', // Esta es la ruta que te da el error
    renderMode: RenderMode.Client // Le decimos: "Hazla en el navegador, no en el servidor"
  },
  {
    path: '**', // Para todas las demás rutas
    renderMode: RenderMode.Prerender // Sigue funcionando como hasta ahora (rápido)
  }
];