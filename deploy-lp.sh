#!/bin/bash
# Upload LP files to production (nexoquote.com on 76.13.114.85)
# Usage: bash deploy-lp.sh [remote_path]
#
# Set REMOTE if your SSH host alias differs:
#   REMOTE=root@76.13.114.85 bash deploy-lp.sh /home/nexoquote/htdocs/nexoquote.com

set -euo pipefail

REMOTE="${REMOTE:-root@76.13.114.85}"
# nginx's actual document root (CloudPanel-managed, owned by the `nexoquote`
# system user) — verified against /etc/nginx/sites-enabled/nexoquote.com.conf
# on the VPS. /var/www/nexoquote.com exists but nginx never reads it.
REMOTE_PATH="${1:-/home/nexoquote/htdocs/nexoquote.com}"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "Uploading index.html to ${REMOTE}:${REMOTE_PATH}/"
scp "${SCRIPT_DIR}/index.html" "${REMOTE}:${REMOTE_PATH}/index.html"
ssh "${REMOTE}" "chown nexoquote:nexoquote '${REMOTE_PATH}/index.html'"

echo "Done. Verify:"
echo "  curl -sS https://nexoquote.com/ | grep track.nexoquote.com"
echo "  curl -sS https://nexoquote.com/ | grep data-no-viewcontent"
