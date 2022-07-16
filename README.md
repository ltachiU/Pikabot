# Discord-JS-Template

**Discord.js V13 Template**<br>
Works with discord.js `V12`, just make some little changes (I think the only change you need to do is the way to send a embed in each command file that sends embed). (Read the [`discord.js`](https://discord.js.org/#/docs/discord.js/main/general/welcome) docs for more informations)<br>

## Differentials of this template
- Easy to donwload and use
- Events and Commands handler
- Commands parameters
	- **aliases** - Command aliases
	- **whitelistOnly** - Only allowed IDs can use a command with this parameter
	- **adminOnly** - Only users with administrator role can use a command with this parameter
	- **nsfw** - Check if is a NSFW channel
	- Check `files/scripts/template/command.js` for more details
- Useful functions file at `files/scripts/functions.js`
- Multi Language support

## What to change to use?
- At the config folder change the default infos to your bot's infos (All the three files)
- Change the IDs at `files/scripts/memberlist-check.js`
- Change the default values at `events/client/ready.js`
- Change the command's messages at `files/translations`
	- Each file need to have the same key name and amount (`"KEY": "VALUE"` - Basic JSON notation)
	- You can easily and a new JSON language file following the rules above or totally remove the multi language method with some little changes, I know you can do wathever you want ;)
