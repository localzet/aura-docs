---
sidebar_position: 1
title: Useful commands
---

## Aura Panel

### Rescue CLI

Rescue CLI provides a few rescue commands like reset superadmin and other useful commands.

```bash
docker exec -it aura aura
```

### Restart Aura Panel

```bash
cd /opt/aura && docker compose down && docker compose up -d && docker compose logs -f -t
```

### Access PM2 monitor

```bash
docker exec -it aura pm2 monit
```

## Aura Node

### Access Xray Core logs {#logs}

```bash
docker exec -it auranode tail -n +1 -f /var/log/supervisor/xray.out.log
```

or

```bash
docker exec -it auranode tail -n +1 -f /var/log/supervisor/xray.err.log
```

### Restart Aura Node

```bash
cd /opt/auranode && docker compose down && docker compose up -d && docker compose logs -f -t
```
