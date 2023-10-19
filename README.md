# Relics Ban Hammer

Relics Ban Hammer is a specialized Discord bot developed for the [Relics](https://twitter.com/@relics_global) Organisation. Built with Node.js and JavaScript, its primary function is to enforce bans or unbans across multiple servers simultaneously, ensuring consistent moderation actions throughout the organization's Discord servers.

## Core Functionality

### Chain Banning/Unbanning

The bot's main feature is its ability to chain ban or unban a user across multiple servers. This ensures that when a user is banned or unbanned in one server, the action is mirrored across all other servers the bot is a part of, providing consistent and efficient moderation.

## Getting Started

To set up and run the Relics Ban Hammer on your local machine, follow these steps:

1. **Clone the Repository**:
   ```
   git clone https://github.com/Vinayak1337/RelicsBanHammer.git 
   ```

2. **Navigate to the Directory and Install Dependencies**:
   ```
   cd RelicsBanHammer
   npm install
   ```

3. **Edit Configuration Values**:
   
   Before starting the bot, you need to provide your configuration values. Open the `settings.js` file located at [data/keys/settings.js](https://github.com/Vinayak1337/RelicsBanHammer/blob/master/data/keys/settings.js) and modify the following:

   ```
   exports.token = 'YOUR_DISCORD_BOT_TOKEN';
   exports.tag = 'YOUR_PREFIX';
   exports.seprator = 'YOUR_SEPARATOR';
   exports.owners = ['OWNER_ID'];
   exports.clientID = 'YOUR_CLIENT_ID';
   ```

4. **Start the Bot**:
   ```
   npm start
   ```

## License

This project is licensed under the terms of the [MIT License](https://github.com/Vinayak1337/RelicsBanHammer/blob/master/LICENSE).
