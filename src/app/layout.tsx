'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import { AuthProvider } from '../context/AuthContext';
import AgeVerificationModal from '../components/ui/AgeVerificationModal'; // 🚀 Importamos el modal de edad
import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body 
        className="flex flex-col min-h-screen bg-brand-bg font-poppins text-gray-900 antialiased select-none"
        onContextMenu={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
      >
        {/* Modal de Verificación de Edad Global (Bloquea la entrada si no se confirma) */}
        <AgeVerificationModal />

        <AuthProvider>
          <Header />
          <main className="grow">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}