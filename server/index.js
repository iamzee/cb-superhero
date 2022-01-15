require("dotenv").config();
const express = require("express");
const sgMail = require("@sendgrid/mail");
const Handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

const generatePdfs = require("./helpers/generatePDF");

const app = express();
// parse JSON
app.use(express.json());

app.use(express.static(path.resolve(__dirname, "..", "dist")));
app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname, "..", "dist", "index.html"))
);

app.post("/api/send", async (req, res) => {
  try {
    // get data
    const { data } = req.body;

    // get campus-superhero template
    const templatePath = path.resolve(
      __dirname,
      "templates",
      "campus-superhero.hbs"
    );
    const hbs = fs.readFileSync(templatePath).toString("utf-8");

    // get html from handlebars
    const template = Handlebars.compile(hbs);
    for (let i = 0; i < data.length; i++) {
      data[i]["html"] = template(data[i]);
    }

    // create a directory to store pdfs
    fs.mkdirSync(path.resolve(__dirname, "pdfs"));

    // generate PDF using puppeteer and add 'pdf' field to data object
    await generatePdfs(data);

    // set api key for sendGrid mail
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    // construct messages to be mailed
    const messages = [];
    for (let i = 0; i < data.length; i++) {
      let msg = {
        to: data[i].email,
        from: "zeeshan99adeen@gmail.com",
        subject: "NOTHING",
        text: "This is from nothing",
        attachments: [
          {
            content: data[i]["pdf"].toString("base64"),
            filename: "nothing.pdf",
            type: "application/pdf",
            disposition: "attachment",
            content_id: "nothing",
          },
        ],
      };

      messages.push(msg);
    }

    // send mail
    await sgMail.send(messages);

    // delete directory
    fs.rmSync(path.resolve(__dirname, "pdfs"), {
      recursive: true,
      force: true,
    });

    res.json({
      success: true,
      message: "Mail sent successfully.",
    });
  } catch (e) {
    console.log("err", e);
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
