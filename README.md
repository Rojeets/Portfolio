# �️ Terminal-Based Portfolio

An interactive terminal/CLI-style portfolio built with React, Tailwind CSS, and Framer Motion. Inspired by retro computer interfaces with a modern twist.

## 🎨 Features

- **Interactive Terminal Interface**: Type commands to explore your portfolio
- **Command-based Navigation**: No scrolling needed - just type!
- **Command History**: Use arrow keys to navigate previous commands
- **Tab Autocomplete**: Press Tab to autocomplete commands
- **Smooth Animations**: Framer Motion for elegant transitions
- **Retro Aesthetic**: Classic terminal/CLI design with modern colors
- **Responsive**: Works on desktop and mobile devices

## 📦 Available Commands

| Command | Description |
|---------|-------------|
| `help` | Show all available commands |
| `about` | Learn more about Rojit |
| `skills` | View technical skills with proficiency levels |
| `projects` | See 6 featured enterprise projects |
| `experience` | Show professional experience |
| `contact` | Get contact information |
| `social` | View social media links |
| `clear` | Clear the terminal |

## 🚀 Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## 🏗️ Project Structure

```
src/
├── components/
│   └── Terminal.jsx        # Main terminal interface
├── App.jsx                 # Main app component
├── index.css               # Global styles + Tailwind
└── main.jsx                # React entry point
```

## 🎯 How It Works

The terminal component features:

- **Command Parser**: Routes user input to appropriate command handlers
- **Output System**: Displays results as terminal text lines
- **History System**: Keeps track of previous commands (↑↓)
- **Autocomplete**: Smart Tab completion for commands
- **Interactive Input**: Real-time cursor and text input

## 🎨 Customization

### Colors
Edit terminal theme in [Terminal.jsx](src/components/Terminal.jsx):
- Border & text: `text-green-400`
- Command prompt: `text-cyan-400`
- Cursor: `text-green-400`

### Adding Commands
Add new commands to the `COMMANDS` object in [Terminal.jsx](src/components/Terminal.jsx):

```javascript
newCommand: {
  description: 'Command description',
  action: () => {
    return [
      'Output line 1',
      'Output line 2',
      // ... more output
    ]
  },
}
```

### Content
Update command responses in [Terminal.jsx](src/components/Terminal.jsx):
- `about`: Your background
- `skills`: Technical skills with proficiency
- `projects`: Your featured work
- `experience`: Professional history
- `contact`: Contact details

## 💡 Tips

- Commands are case-insensitive
- Tab key autocompletes commands
- Arrow up/down navigates command history
- Click anywhere in terminal to focus input
- Commands return multi-line arrays for formatted output

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 🚀 Deployment

Build and deploy to your hosting:
```bash
npm run build
```

The `dist` folder contains your production-ready files.

## 🎨 Inspiration

This portfolio design takes inspiration from:
- Retro computer terminals
- CLI/command-line interfaces
- Classic hacker aesthetic
- Modern terminal applications

## 📄 License

MIT

