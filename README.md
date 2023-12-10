# OMG

Project for Junction's BRIDG3 24 Hackathon

## Installation

## Gitlab CI/CD

Set up the following CI/CD variables :
- `KNOWN_HOSTS` - the web server's public ssh key(s), to get the value connect to the server, and visit the `~/.ssh/known_hosts` file to copy the added lines after the first connection
- `SSH_HOST` - contains the username, the IP of the server, and the web server root location in the format debian@[ip]:/path/to/web/root
- `SSH_PRIVATE_KEY` - to connect to the server, generate a SSH keypair, add the **public** key to the server's `~/.ssh/known_hosts`, then set this variable to the **private** key (starting by "-----BEGIN OPENSSH PRIVATE KEY-----")

GitLab's CI/CD will then build and push the generated files to the server.

## NGINX web server

If using NGINX, use this server file :

```nginx
server {
        root /home/debian/omg/dist;
        server_name omg.swansondev.me;

        location / {
                # First attempt to serve request as file, then
                # as directory, then fall back to the root index.html
                try_files $uri $uri/ /index.html;
        }

    listen 80;
}
```

After having added a domain that points to the server's IP, you can install SSL using certbot :

```bash
sudo apt install python3-certbot python3-certbot-nginx
sudo certbot
```
