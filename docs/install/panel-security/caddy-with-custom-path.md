---
sidebar_position: 2
slug: /security/caddy-with-custom-path
title: Caddy with custom path
---

Caddy is a powerful and flexible web server that can be used to secure your Aura panel.

## Installation

First of all, create a directory for Caddy.

```bash
mkdir -p /opt/aura/caddy && cd /opt/aura/caddy
```

Then create a `docker-compose.yml` file.

```bash
touch docker-compose.yml && nano docker-compose.yml
```

And add the following content to the file:

```yaml title="docker-compose.yml"
services:
    aura-caddy:
        image: aura/caddy-with-auth:latest
        container_name: 'aura-caddy'
        hostname: aura-caddy
        restart: always
        environment:
            - AUTH_TOKEN_LIFETIME=3600
            // highlight-next-line-red
            - REMNAWAVE_PANEL_DOMAIN=PANEL_DOMAIN
            // highlight-next-line-red
            - REMNAWAVE_CUSTOM_LOGIN_ROUTE=supersecretroute
            // highlight-next-line-red
            - AUTHP_ADMIN_USER=LOGIN_USERNAME
            // highlight-next-line-red
            - AUTHP_ADMIN_EMAIL=LOGIN_EMAIL
            // highlight-next-line-red
            - AUTHP_ADMIN_SECRET=LOGIN_PASSWORD

        ports:
            - '0.0.0.0:443:443'
        networks:
            - aura-network
        volumes:
            - ./Caddyfile:/etc/caddy/Caddyfile
            - aura-caddy-ssl-data:/data

networks:
    aura-network:
        name: aura-network
        driver: bridge
        external: true

volumes:
    aura-caddy-ssl-data:
        driver: local
        external: false
        name: aura-caddy-ssl-data
```

## Configuring .env variables

You need to set a domain name for your Aura panel. Caddy will automatically issue a certificate for it.

```bash
REMNAWAVE_PANEL_DOMAIN=panel.domain.com
```

Custom login route.
This path will be used ONLY for the login page. There will be no redirect if you open the dashboard without being previously authenticated.
Only people who know this path will be able to access the panel.

```bash
REMNAWAVE_CUSTOM_LOGIN_ROUTE=supersecretroute
```

Admin credentials.
Make sure to use a strong password.

```bash
AUTHP_ADMIN_USER=admin
AUTHP_ADMIN_EMAIL=admin@domain.com
AUTHP_ADMIN_SECRET=strong_password
```

Token lifetime.

```bash
AUTH_TOKEN_LIFETIME=3600
```

## Caddyfile

Lets deep dive into the `Caddyfile`.

First of all, you need to select one of our predefined setups.

:::info

We recommend using [full security setup with MFA](#full) for production environments where you will be issuing API-keys.

:::

:::danger

You will able to login only via this path (REMNAWAVE_CUSTOM_LOGIN_ROUTE).

:::

### Full security setup with MFA {#full}

- [x] All routes are protected by authentication. (Frontend, Backend)
- [x] All API-endpoints are protected, includes /api/sub/\* endpoints.
- [x] Login requires MFA with OTP-codes.
- [x] Special API-keys can be issued for /api/\* endpoints.
- [x] Full domain protection.

Run the command below to download the Caddyfile.

```bash
curl -o Caddyfile https://raw.githubusercontent.com/remnawave/caddy-with-auth/refs/heads/main/examples/custom-webpath-with-auth-and-protected-api-route/Caddyfile
```

### API routes without auth (api/\*) {#minimal}

- [x] Routes are protected by authentication. (**Frontend**)
- [x] Login requires MFA with OTP-codes. (**Frontend**)
- [x] **All API-endpoints are not protected!** (/api/\* is public)

:::danger

This setup exposes the `/api/*` endpoints to the public internet.

All endpoints will not require authentication, but will still use the Aura security features.

We recommend using [full security setup with MFA](#full) for production environments where you will be issuing API-keys.

:::

Run the command below to download the Caddyfile.

```bash
curl -o Caddyfile https://raw.githubusercontent.com/remnawave/caddy-with-auth/refs/heads/main/examples/custom-webpath-with-auth-with-api-without-auth/Caddyfile
```

### /api/sub/\* endpoints without auth {#minimal-with-opened-sub}

- [x] Routes are protected by authentication. (**Frontend**)
- [x] Login requires MFA with OTP-codes. (**Frontend**)
- [x] Only `/api/sub/*` endpoints is public, other endpoints are protected.

:::danger

This setup exposes the `/api/sub/*` endpoints to the public internet.

We recommend using [full security setup with MFA](#full) for production environments where you will be issuing API-keys and use [@localzet/aura-subscriptions](/docs/install/aura-subscriptions) for public subscription page.

:::

Run the command below to download the Caddyfile.

```bash
curl -o Caddyfile https://raw.githubusercontent.com/remnawave/caddy-with-auth/refs/heads/main/examples/custom-webpath-with-auth-with-opened-api-sub/Caddyfile
```

## Running the container

After you have selected one of the setups above, you can start the container with the following command.

```bash
docker compose up -d && docker compose logs -f
```

## Accessing the panel

After the container is running, you can access the panel at `https://panel.domain.com/REMNAWAVE_CUSTOM_LOGIN_ROUTE`.

On the first start, you will be prompted to add a MFA method.

We recommend using [Google Authenticator](https://www.google.com/search?q=google+authenticator).

### Disable MFA

If you want to completely disable MFA, you can do this by editing the `Caddyfile`.

Open the `Caddyfile` and change the following line:

```bash
cd /opt/aura/caddy && nano Caddyfile
```

Find the following lines, and remove the `require mfa` line.

```caddy title="Caddyfile"
transform user {
	match origin local
	action add role authp/admin
    // highlight-next-line-red
	require mfa
}
```

After that, you can restart the container with the following command.

```bash
docker compose down && docker compose up -d && docker compose logs -f
```

## Accessing Auth Portal page

:::info

You can access the Auth Portal page at `https://<your-domain>/REMNAWAVE_CUSTOM_LOGIN_ROUTE/auth`.

:::

![Auth Portal page](/security/auth-portal.webp)

Here you can quickly go to the Aura dashboard or manage some of Auth Portal settings.

In the MFA section, you can delete or add new MFA methods.

## Issuing API-keys

:::info

You can access the Auth Portal page at `https://<your-domain>/REMNAWAVE_CUSTOM_LOGIN_ROUTE/auth`.

:::

On the Auth Portal page, you can issue API-keys, click on the `API-keys` tab.

:::info

After you issue an API-key, you can use it in the `X-Api-Key` header of your requests to the API.

Example: `X-Api-Key: YxOovHLnpkcmSig5082egcHnyTk8SK4dNGAFHgZ2LKZezgj5oUj2FA2IR2sMwbALnP9YNpzZ`

:::

![API-keys](/security/api-keys.webp)
