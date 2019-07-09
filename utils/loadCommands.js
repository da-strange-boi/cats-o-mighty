//* loads all the js files (commands) in "./commands/general/"
fs.readdir("./commands/general/", (err, files) => {
  if (err) console.log(err);
  let jsFile = files.filter(f => f.split(".").pop() === "js");
  if (jsFile.length <= 0) {
    console.log("Couldn't find commands.");
    return;
  }

  jsFile.forEach((f, i) => {
    let props = require(`../commands/general/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
    props.help.aliases.forEach(alias => {
      bot.aliases.set(alias, props.help.name);
    });
  });
});

//* loads all the js files (commands) in "./commands/utility/"
fs.readdir("./commands/utility/", (err, files) => {
  if (err) console.log(err);
  let jsFile = files.filter(f => f.split(".").pop() === "js");
  if (jsFile.length <= 0) {
    console.log("Couldn't find commands.");
    return;
  }

  jsFile.forEach((f, i) => {
    let props = require(`../commands/utility/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
    props.help.aliases.forEach(alias => {
      bot.aliases.set(alias, props.help.name);
    });
  });
});

//* loads all the js files (commands) in "./commands/owner_commands/"
fs.readdir("./commands/owner_commands/", (err, files) => {
  if (err) console.log(err);
  let jsFile = files.filter(f => f.split(".").pop() === "js");
  if (jsFile.length <= 0) {
    console.log("Couldn't find commands.");
    return;
  }

  jsFile.forEach((f, i) => {
    let props = require(`../commands/owner_commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
    props.help.aliases.forEach(alias => {
      bot.aliases.set(alias, props.help.name);
    });
  });
});