# Sismo App Store


sdf

Welcome to the [Sismo App Store](https://app-store-resources.sismo.io/), the central hub for discovering all apps built with [Sismo Connect](https://docs.sismo.io/sismo-docs/build-with-sismo-connect/getting-started). 


## Building Applications with Sismo Connect

You have two approaches to start building applications with Sismo Connect:
1. **Templated App**:  Leverage our ready-made templates. Modify the parameters according to your requirements to create your own Sismo Connect application. 
Available templates include:
    - zkForm template: More than just a gated form.
    - zkTelegramBot template: Facilitates privacy-preserving gated telegram group chats.

2. Custom apps (soon): You will be able to build custom apps

### Configuration

All configurations for templates are located in the [space-configs](./space-configs/) folder.

For example, the [configuration](./space-configs/demo/aave-chan-initiative.ts) for the [aave-chan-initiative](https://demo.apps.sismo.io/aave-chan-initiative/aci-swag) the configuration is setup in this files tree.
```bash
space-configs/
├── main
│   ├── aave-chan-initiative.ts
│   ├── cow-swap.ts
│   ├── ...
├── demo
│   ├── aave-chan-initiative.ts
│   ├── cow-swap.ts
│   ├── ...
├── images
│   ├── aave_chan_initiative_apps_swag_1014x720.png
│   ├── aave_chan_initiative_apps_swag_400x400.png
│   └── ...
└── types.ts
```

### Installation
To set up your environment, follow these steps:


```bash
yarn install
```

### Running Locally

Firstly, ensure that you have set up environment variables in the .env.local file:

```bash
cp .env.example .env.local
```

The environment variable NEXT_PUBLIC_NODE_ENV lets you choose your environment.

- If you want to use the main configuration, set `NEXT_PUBLIC_NODE_ENV=main`.
- For using the demo configuration, set `NEXT_PUBLIC_NODE_ENV=demo`.

To run the application:

```bash
yarn dev
```

Now, access the application at http://localhost:3000

### Testing

Test are made using jest
```bash
yarn test
```

## Contact us

Contact us in [Telegram](https://bit.ly/builders-telegram) or [Discord](https://discord.gg/sismo) when you create a Pull Request. We will quickly review it. Once the PR is merged, your Space will appear in the App Store. 

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.



