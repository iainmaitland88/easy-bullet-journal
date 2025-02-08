# Easy Bullet Journal

Easy Bullet Journal is a simple, easy-to-use app for maintaining a [bullet journal](https://en.wikipedia.org/wiki/Bullet_journal) built with React and TypeScript. I started using bullet journals in 2024 and have found them to be a great way to keep me organised at work. What I haven't found great is trying to read my own handwriting, losing my notebook, etc. After a few miserable attempts at using Notion I've decided to have a go at building my own app.

As a primarily backend engineer with not that much React experience I've been interested in building an offline-first app with no backend for a while and this seemed as good a reason as any to try. My goals for this project then are:

- First and foremost, build a simple, easy-to-use bullet journalling app that is a joy to use
- Have it work offline-first with no backend
- Persist data locally in the browser between sessions
- Export/import data so that it can be used on different devices
  - Eventually add support for syncing with other devices via iCloud, Google Drive, Dropbox or similar
- Where practical, use keyboard shortcuts -- I hate using the mouse if I can avoid it.

## Keyboard Shortcuts

I'll try to remember to document the shortcuts here as I add them, but the main ones are:

- `ctrl+N` - Add a new task
- `ctrl+L` - Toggle light/dark mode
