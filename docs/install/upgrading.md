---
sidebar_position: 99
---

# Upgrading

## Aura Panel

```bash title="Update and restart"
cd /opt/aura && docker compose pull && docker compose down && docker compose up -d && docker compose logs -f
```

```bash title="Clean unused images"
docker image prune
```

## Aura Node

```bash title="Update and restart"
cd /opt/auranode && docker compose pull && docker compose down && docker compose up -d && docker compose logs -f
```
