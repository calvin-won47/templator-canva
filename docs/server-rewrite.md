# SPA history fallback

Directly entering `/blog/<slug>` should load the SPA entry. Add a history fallback on the server:

- **Nginx** (inside the relevant `server` block):
  ```
  location / {
      try_files $uri $uri/ /index.html;
  }
  ```

- **Apache** (e.g., in `.htaccess`):
  ```
  <IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
  </IfModule>
  ```
