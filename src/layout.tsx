import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Загружаем SDK Telegram */}
        <script
          src="https://telegram.org/js/telegram-web-app.js" 
        />
      </head>
      <body className="font-sans antialiased min-h-screen bg-background">
        <div className="tg-webapp-container">
          {children}
        </div>
      </body>
    </html>
  );
}
