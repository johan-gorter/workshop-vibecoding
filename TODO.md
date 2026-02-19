# TODO

## Finish workshop presentation

- msx idea
- browser extension
  - Needs framework?

## Set up hosting

### Workshopserver opzetten (Hetzner VPS)

1. **Hetzner VPS aanmaken** — CX32 (4 vCPU, 8 GB RAM) voor 10-15 deelnemers
2. **DNS instellen** bij domeinregistrar van johangorter.com:
   - A-record: `workshop` → `<VPS IP>`
   - A-record: `*.workshop` → `<VPS IP>`
3. **Basisinstallatie op VPS**:
   ```bash
   apt update && apt upgrade -y
   apt install nginx certbot python3-certbot-nginx postgresql
   ```
4. **Wildcard SSL-certificaat** aanvragen:
   ```bash
   certbot certonly --manual --preferred-challenges dns \
     -d workshop.johangorter.com \
     -d "*.workshop.johangorter.com"
   ```
5. **Nginx wildcard config** — routeer `<deelnemer>.workshop.johangorter.com` naar juiste map/poort:
   ```nginx
   server {
       listen 443 ssl;
       server_name ~^(?<deelnemer>.+)\.workshop\.johangorter\.com$;
       ssl_certificate     /etc/letsencrypt/live/workshop.johangorter.com/fullchain.pem;
       ssl_certificate_key /etc/letsencrypt/live/workshop.johangorter.com/privkey.pem;
       root /home/$deelnemer/public_html;
   }
   ```
6. **Deelnemers aanmaken** (SSH + database per deelnemer):
   ```bash
   for i in $(seq 1 15); do
     USER="deelnemer${i}"
     useradd -m -s /bin/bash $USER
     echo "$USER:workshop2026!" | chpasswd
     mkdir -p /home/$USER/public_html
     chown $USER:$USER /home/$USER/public_html
     sudo -u postgres createuser $USER
     sudo -u postgres createdb -O $USER "db_${USER}"
   done
   ```
7. **Resultaat per deelnemer**:
   - SSH: `ssh deelnemer3@workshop.johangorter.com`
   - Website: `https://deelnemer3.workshop.johangorter.com`
   - Database: `db_deelnemer3`
