# TypeScript 2.1 + React + Redux + Hot Reloading + CSS Modules Boilerplate + Webpack 2 + @Types

This is a simple boilerplate which aims to combine TypeScript 2.0 with React, Redux and CSS Modules. Hot Reloading is working as well.

## Gotchas and Weirdness

With this Boilerplate I wanted to use CSS Modules to the fullest. So I included basscss with which I tried to build up the whole CSS.
It's probably not something you want to do in production, as it's kinda weird and annoying. But have a look yourself.

As I still needed some CSS in the global namespace, I export everything with a `.global.css` extension into the global namespace.
Or else it would be really annoying to do stuff like `* { box-sizing: border-box; }`.

This does use Webpack 2.0, so be aware if you want to use plugins that are not updated yet!

Hot Reloading has still some problems which I couldn't solve (mostly with the stores), if someone has some pointers,
I would be super grateful, I tried nearly everything.

## @types

With TypeScript 2.0 all types will be available via npm through the `@types` organisation. TypeScript 2.0
will automatically pick up those and use them. This project uses @types exclusivly.

## Usage

1. `npm install` or `yarn install`
3. `npm start` for developing. The server runs at [http://localhost:8080](http://localhost:8080)
4. `npm run-script build` for a production build
