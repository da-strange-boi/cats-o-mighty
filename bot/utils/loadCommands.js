exports.run = async (bot, fs) => {
  fs.readdir("./bot/commands/general/", (err, files) => {
    if(err) bot.log(`priority`, `Failed to load all commands\n===============\n\n${err}`);
    let jsFile = files.filter(f => f.split(".").pop() === "js");
    if (jsFile.length <= 0) {
      bot.log(`priority`, `Failed to find commands\n===============\n\n${err}`);
      return;
    }

    jsFile.forEach((f, i) => {
      let props = require(`../commands/general/${f}`);
      bot.log(`system`, `Loading Command: ${f}`);
      bot.commands.set(props.help.name, props);
      props.help.aliases.forEach(alias => {
        bot.aliases.set(alias, props.help.name);
      });
    });
  });
  fs.readdir("./bot/commands/owner_commands/", (err, files) => {
    if(err) bot.log(`priority`, `Failed to load all commands\n===============\n\n${err}`);
    let jsFile = files.filter(f => f.split(".").pop() === "js");
    if (jsFile.length <= 0) {
      bot.log(`priority`, `Failed to find commands\n===============\n\n${err}`);
      return;
    }

    jsFile.forEach((f, i) => {
      let props = require(`../commands/owner_commands/${f}`);
      bot.log(`system`, `Loading Command: ${f}`);
      bot.commands.set(props.help.name, props);
      props.help.aliases.forEach(alias => {
        bot.aliases.set(alias, props.help.name);
      });
    });
  });
  fs.readdir("./bot/commands/admin_commands/", (err, files) => {
    if(err) bot.log(`priority`, `Failed to load all commands\n===============\n\n${err}`);
    let jsFile = files.filter(f => f.split(".").pop() === "js");
    if (jsFile.length <= 0) {
      bot.log(`priority`, `Failed to find commands\n===============\n\n${err}`);
      return;
    }

    jsFile.forEach((f, i) => {
      let props = require(`../commands/admin_commands/${f}`);
      bot.log(`system`, `Loading Command: ${f}`);
      bot.commands.set(props.help.name, props);
      props.help.aliases.forEach(alias => {
        bot.aliases.set(alias, props.help.name);
      });
    });
  });
  fs.readdir("./bot/commands/utility/", (err, files) => {
    if(err) bot.log(`priority`, `Failed to load all commands\n===============\n\n${err}`);
    let jsFile = files.filter(f => f.split(".").pop() === "js");
    if (jsFile.length <= 0) {
      bot.log(`priority`, `Failed to find commands\n===============\n\n${err}`);
      return;
    }

    jsFile.forEach((f, i) => {
      let props = require(`../commands/utility/${f}`);
      bot.log(`system`, `Loading Command: ${f}`);
      bot.commands.set(props.help.name, props);
      props.help.aliases.forEach(alias => {
        bot.aliases.set(alias, props.help.name);
      });
    });
  });
  fs.readdir("./bot/commands/fun/", (err, files) => {
    if(err) bot.log(`priority`, `Failed to load all commands\n===============\n\n${err}`);
    let jsFile = files.filter(f => f.split(".").pop() === "js");
    if (jsFile.length <= 0) {
      bot.log(`priority`, `Failed to find commands\n===============\n\n${err}`);
      return;
    }

    jsFile.forEach((f, i) => {
      let props = require(`../commands/fun/${f}`);
      bot.log(`system`, `Loading Command: ${f}`);
      bot.commands.set(props.help.name, props);
      props.help.aliases.forEach(alias => {
        bot.aliases.set(alias, props.help.name);
      });
    });
  });
}