---
sidebar_position: 1
title: TypeScript SDK
---

<Admonition type="tip" icon={<FaCheckCircle />} title="Official SDK">
This SDK is official and maintained by the Aura team.
</Admonition>

Aura TypeScript SDK is a library for convenient interaction with the RestAPI types.

It does not contain http-client, so you need to implement it yourself.

This SDK can be used in backend and frontend.

import Admonition from '@theme/Admonition';
import { FaCheckCircle } from "react-icons/fa";

## Installation

```bash
npm install @localzet/aura-contract
```

:::warning
Always pick and pin the correct version of the SDK to match the version of the Aura backend.
:::

| Contract Version | Aura Panel Version |
| ---------------- | ------------------ |
| 0.7.16           | 1.6.7              |
| 0.7.16           | 1.6.6              |
| 0.7.13           | 1.6.5              |
| 0.7.13           | 1.6.4              |
| 0.7.13           | 1.6.3              |
| 0.7.1            | 1.6.2              |
| 0.7.1            | 1.6.1              |
| 0.7.0            | 1.6.0              |
| 0.4.5            | 1.5.7              |
| 0.3.71           | 1.5.0              |

## Usage

<details>
<summary>Example backend service, using Axios and NestJS</summary>

```typescript
import axios from 'axios'

import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { GetUserByUsernameCommand } from '@localzet/aura-contract'

import { ICommandResponse } from '../types/command-response.type'

@Injectable()
export class AxiosService {
    public axiosInstance: AxiosInstance
    private readonly logger = new Logger(AxiosService.name)

    constructor(private readonly configService: ConfigService) {
        this.axiosInstance = axios.create({
            baseURL: this.configService.getOrThrow('REMNAWAVE_PANEL_URL'),
            timeout: 45_000,
            headers: {
                // highlight-next-line-green
                'x-forwarded-for': '127.0.0.1', // use this headers to bypass the panel reverse proxy restrictions. So you can access the panel from bridge networks: http://aura-backend:3000
                // highlight-next-line-green
                'x-forwarded-proto': 'https', // use this headers to bypass the panel reverse proxy restrictions. So you can access the panel from bridge networks: http://aura-backend:3000
                Authorization: `Bearer ${this.configService.get('REMNAWAVE_API_TOKEN')}`
            }
        })

        const caddyAuthApiToken = this.configService.get('CADDY_AUTH_API_TOKEN')

        if (caddyAuthApiToken) {
            this.axiosInstance.defaults.headers.common['X-Api-Key'] = caddyAuthApiToken
        }
    }

    public async getUserByUsername(
        username: string
    ): Promise<ICommandResponse<GetUserByUsernameCommand.Response>> {
        try {
            const response = await this.axiosInstance.request<GetUserByUsernameCommand.Response>({
                method: GetUserByUsernameCommand.endpointDetails.REQUEST_METHOD,
                url: GetUserByUsernameCommand.url(username)
            })

            return {
                isOk: true,
                response: response.data
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                this.logger.error('Error in Axios GetUserByUsername Request:', error.message)

                return {
                    isOk: false
                }
            } else {
                this.logger.error('Error in GetUserByUsername Request:', error)

                return {
                    isOk: false
                }
            }
        }
    }
}
```

</details>

## Full examples

You can find full examples in the [Aura Frontend](https://github.com/localzet/aura-frontend) repository and in the [Aura Subscription page](https://github.com/localzet/aura-subscriptions) repository.
