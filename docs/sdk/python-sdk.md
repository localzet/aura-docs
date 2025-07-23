---
sidebar_position: 2
title: Python SDK
---

import Admonition from '@theme/Admonition';
import { FaPeopleGroup } from "react-icons/fa6";

Aura Python SDK is a library for convenient interaction with the RestAPI types.

✨ Key Features

- Controller-based design: Split functionality into separate controllers for flexibility. Use only what you need!
- Pydantic models: Strongly-typed requests and responses for better reliability.
- Fast serialization: Powered by orjson for efficient JSON handling.
- Modular usage: Import individual controllers or the full SDK as needed.
- Custom HTTP Client Support: You can pass your own httpx.AsyncClient with custom headers to bypass various checks.
- Caddy Token Integration: Direct support for passing the caddy_token during SDK initialization.

## Installation

```bash
pip install auranet_api
```

## Usage

<details>
<summary>Example usage</summary>

```python
import os
import asyncio

from auranet_api import AuranetSDK
from auranet_api.models import UsersResponseDto, UserResponseDto

async def main():
    # URL to your panel (ex. https://vpn.com or http://127.0.0.1:3000)
    base_url: str = os.getenv("REMNAWAVE_BASE_URL")
    # Bearer Token from panel (section: API Tokens)
    token: str = os.getenv("REMNAWAVE_TOKEN")

    # Initialize the SDK
    auranet = AuranetSDK(base_url=base_url, token=token)

    # Fetch all users
    response: UsersResponseDto = await auranet.users.get_all_users_v2()
    total_users: int = response.total
    users: list[UserResponseDto] = response.users
    print("Total users: ", total_users)
    print("List of users: ", users)

    # Disable a specific user
    test_uuid: str = "e4d3f3d2-4f4f-4f4f-4f4f-4f4f4f4f4f4f"
    disabled_user: UserResponseDto = await auranet.users.disable_user(test_uuid)
    print("Disabled user: ", disabled_user)

if __name__ == "__main__":
    asyncio.run(main())
```

</details>

<details>
<summary>Example usage with Caddy as web-server</summary>

```python
import os
import asyncio

from auranet_api import AuranetSDK
from auranet_api.models import UsersResponseDto, UserResponseDto

async def main():
    # URL to your panel (ex. https://vpn.com or http://127.0.0.1:3000)
    base_url: str = os.getenv("REMNAWAVE_BASE_URL")
    # Bearer Token from panel (section: API Tokens)
    token: str = os.getenv("REMNAWAVE_TOKEN")
    # Bearer Token for Caddy Auth
    caddy_token = os.getenv("CADDY_TOKEN_AUTH")

    # Initialize the SDK
    auranet = AuranetSDK(base_url=base_url, token=token, caddy_token=caddy_token)

    # Fetch all users
    response: UsersResponseDto = await auranet.users.get_all_users_v2()
    total_users: int = response.total
    users: list[UserResponseDto] = response.users
    print("Total users: ", total_users)
    print("List of users: ", users)

    # Disable a specific user
    test_uuid: str = "e4d3f3d2-4f4f-4f4f-4f4f-4f4f4f4f4f4f"
    disabled_user: UserResponseDto = await auranet.users.disable_user(test_uuid)
    print("Disabled user: ", disabled_user)

if __name__ == "__main__":
    asyncio.run(main())
```

</details>

<details>
<summary>Example usage with custom client</summary>

```python
import os
import asyncio
import httpx
from auranet_api import AuranetSDK

async def main():
    base_url = os.getenv("REMNAWAVE_BASE_URL")
    token = os.getenv("REMNAWAVE_TOKEN")

    # Custom client with headers
    async with httpx.AsyncClient(headers={"hello": "world"}) as client:
        # Initialize SDK with a custom client
        auranet = AuranetSDK(base_url=base_url, token=token, client=client)

        # Fetch all users
        response = await auranet.users.get_all_users_v2()
        print("Total users:", response.total)

asyncio.run(main())
```

</details>
