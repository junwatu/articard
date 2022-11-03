export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>TELP</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>{children}</body>
    </html>
  );
}
