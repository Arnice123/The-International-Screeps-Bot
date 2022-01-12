# The International - A Fully Automated Screeps Bot

![The International](images/header.png)

[![Badge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)
[![Badge](https://forthebadge.com/images/badges/open-source.svg)](https://forthebadge.com)
[![Badge](https://forthebadge.com/images/badges/contains-tasty-spaghetti-code.svg)](https://forthebadge.com)
[![Badge](https://forthebadge.com/images/badges/0-percent-optimized.svg)](https://forthebadge.com)

## About

The International is `Carson A&0#6757` bot for [Screeps](https://screeps.com/), thematically based after [communist](https://en.wikipedia.org/wiki/Communism) aesthetics. Owned rooms are called communes, offensive and defensive forces are called the Red Army, economic workers are known as the Proletariat, and the Revolutionaries establish new communes and rebuild destroyed ones.

I forked it using the TS that he used, I would use his code because his is much more complex with good explanations of his code through comments

Feel welcome to fork it and otherwise use it, however do not be overly aggressive on the Screeps world, especially to newer players. The bot is intended to be automated, but can perform manual actions via the console. It has an information panel showing progress, events, economy and military, and more.

If you have specific questions or want to discuss the bot, DM me on discord: `Ar_nice123#6257` but if you need help message `Carson A&0#6757`

## Progress and Design

[Progress board](https://trello.com/b/l6Min9hr/typescript-international-screeps-bot)

[Flowchart](https://www.zenflowchart.com/docs/view/50r4KGRb480B2bBLZQxg)

[Videos](https://www.youtube.com/playlist?list=PLGlzrjCmziEj7hQZSwcmkXkMXgkQXUQ6C)

## Requirements

Please read the about section before installing and using this bot.

First you'll want to download the repository. It's the big green button that says code - you can't miss it.

### NPM

Next, if you don't have it already, install Node Package Manager so we can install other things:

```
npm install
```

Then, when in the project folder, you'll want to install the devDependencies like so:

```
npm install --only=dev
```

And that's it. Contact me on discord `Carson A&0#6757` if you need help.

## Usage

Using rollup we will translate the code into a single js file, which will be used in environments set in the screeps.json file. This reduces cpu usage, and compiles the code so it can be run by Screeps.

First, rename example.screeps.json to screeps.json and fill in the required information for each environment you want to run the bot in.

To then run the bot, use the command `rollup -cw --environment DEST:mmo` replacing mmo with the environment you want to compile to. This wiil initially compile to the environment, as well as automatically compiling and pushing to the environment on code changes.

If you'd like to use this method to compile to a private server, you'll need to download and configure [screepsmod-auth](https://github.com/ScreepsMods/screepsmod-auth).
