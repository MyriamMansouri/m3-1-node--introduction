"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");

const getBotMessage = (text) => {
  const commonGreetings = ["hi", "hello", "howdy"];
  const commonGoodbyes = ["bye", "goodbye", "goodnight"];
  const jokes = [
    "Why don't eggs tell jokes? They'd crack each other up.",
    "Did you hear the rumor about butter? Well, I'm not going to spread it!",
    "Why couldn't the bicycle stand up by itself? It was two tired.",
    "How many tickles does it take to make an octopus laugh? Ten tickles.",
    "How do you make a Kleenex dance? Put a little boogie in it!",
  ];

  let botMessage = `Bzzt "${text}"`;

  commonGreetings.forEach((greeting) => {
    if (text.toLowerCase().includes(greeting)) {
      botMessage = "Bzzt Hello.";
    }
  });

  commonGoodbyes.forEach((greeting) => {
    if (text.toLowerCase().includes(greeting)) {
      botMessage = "Bzzt Goodbye.";
    }
  });

  if (text.toLowerCase() === "yes") {
    const index = Math.floor(Math.random() * jokes.length);
    botMessage = jokes[index];
  } else {
    botMessage = "Goodbye.";
  }
  
  if (text.toLowerCase() === "something funny") {
    botMessage = "Do you want to hear a joke? Please answer YES or NO.";
  }



  return botMessage;
};

express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan("tiny"))

  // Any requests for static files will go into the public folder
  .use(express.static("public"))

  // Nothing to modify above this line
  // ---------------------------------
  // add new endpoints here 👇
  .get("/cat-message", (req, res) => {
    const message = { author: "cat", text: "Meow" };
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(200).json({ status: 200, message });
    }, randomTime);
  })

  .get("/monkey-message", (req, res) => {
    const messages = [
      "Don’t monkey around with me.",
      "If you pay peanuts, you get monkeys.",
      "I fling 💩 at you!",
      "🙊",
      "🙈",
      "🙉",
    ];

    const index = Math.floor(Math.random() * 6);

    const message = { author: "monkey", text: messages[index] };
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(200).json({ status: 200, message });
    }, randomTime);
  })

  .get("/parrot-message", (req, res) => {
    const message = { author: "parrot", text: req.query.message };
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(200).json({ status: 200, message });
    }, randomTime);
  })

  .get("/bot-message", (req, res) => {
    let botMsg = getBotMessage(req.query.message);

    const message = { author: "bot", text: botMsg };
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(200).json({ status: 200, message });
    }, randomTime);
  })
  // add new endpoints here ☝️
  // ---------------------------------
  // Nothing to modify below this line

  // this serves up the homepage
  .get("/", (req, res) => {
    res
      .status(200)
      .json({ status: 200, message: "This is the homepage... it's empty :(" });
  })

  // this is our catch all endpoint. If a user navigates to any endpoint that is not
  // defined above, they get to see our 404 page.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not the page you are looking for.",
    });
  })

  // Node spins up our server and sets it to listen on port 8000.
  .listen(8000, () => console.log(`Listening on port 8000`));
