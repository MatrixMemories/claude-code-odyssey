#!/usr/bin/env python3
"""Dev server with SPA fallback — serves shell.html for any path that
isn't a real file, so custom URLs like /claude-md/progressive-disclosure work."""
import http.server, socketserver, os, urllib.parse

PORT = 8080

class SPAHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        path = urllib.parse.urlparse(self.path).path.lstrip('/')
        if path and not os.path.isfile(path):
            self.path = '/shell.html'
        super().do_GET()

    def log_message(self, fmt, *args):
        print(f'  {self.address_string()} — {fmt % args}')

class ReusableTCPServer(socketserver.TCPServer):
    allow_reuse_address = True

with ReusableTCPServer(('', PORT), SPAHandler) as httpd:
    print(f'Serving at http://localhost:{PORT}/shell.html')
    httpd.serve_forever()
