---
sidebar_position: 2
---

# Create a Document

Documents are **groups of pages** connected through:

- a **sidebar**
- **previous/next navigation**
- **versioning**

## Create your first Doc

Create a markdown file at `docs/hello.md`:

```md title="docs/hello.md"
# Hello

This is my **first Docusaurus document**!
```

A new document is now available at `http://localhost:3000/docs/hello`.

## Configure the Sidebar

Docusaurus automatically **creates a sidebar** from the `docs` folder.

Add metadata to customize the sidebar label and position:

```md title="docs/hello.md" {1-4}
---
sidebar_label: 'Hi!'
sidebar_position: 3
---

# Hello

This is my **first Docusaurus document**!
```

It is also possible to create your sidebar explicitly in `sidebars.js`:

```diff title="sidebars.js"
module.exports = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Tutorial',
-     items: [...],
+     items: ['hello'],
    },
  ],
};
```

```bash npm2yarn
npm install @docusaurus/remark-plugin-npm2yarn
```


```plantuml V1
node client{
  component Redux
  component React
  component Socket_io_client
}

node serveur{
  component socket_io_serveur
  component koa
  component DiscordJs
  component Koa_Static_client
  component Store
  component Db
}

React <--> Redux
Socket_io_client <--> Redux

koa <--> socket_io_serveur
koa <--> DiscordJs
koa <--> Store
koa <--> Db
koa <--> Koa_Static_client
Db <--> Store
Db <--> DiscordJs
socket_io_serveur <--> DiscordJs
socket_io_serveur <--> Store
socket_io_serveur <--> Db

client --> serveur : Axios
serveur --> client : Socket.io
```


