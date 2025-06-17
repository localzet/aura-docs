---
sidebar_position: 1
---

# Requirements

**Aura Panel** is the main component of Aura. It will be used to manage your users, nodes and all the other stuff.  
**Aura Node** is a lightweight container with included Xray-core.

## Aura Panel

### Hardware

- **OS**: Recommended **Ubuntu** or **Debian**.
- **RAM**: Minimum 2GB, recommended 4GB.
- **CPU**: Minimum 2 cores, recommended 4 cores.
- **Storage**: Minimum and recommended 20GB.

:::tip
Aura can run with lower specs, but it's not recommended. Some of background processes can be resource-intensive.
:::

## Aura Node

### Hardware

- **OS**: Recommended **Ubuntu** or **Debian**.
- **RAM**: Minimum 1GB.
- **CPU**: Minimum 1 core.

:::tip
Aura Node by itself does not require much resources, but Xray-core can consume a lot of CPU and RAM under heavy load.
:::

## Software

Aura Panel and Aura Node requires [**Docker**](https://docs.docker.com/get-started/get-docker/) with the **Docker Compose plugin**.

<details>
<summary>Quick install</summary>

```bash
sudo curl -fsSL https://get.docker.com | sh
```

</details>
