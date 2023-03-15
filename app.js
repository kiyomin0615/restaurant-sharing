const fs = require("fs");
const path = require("path");

const express = require("express");

const app = express();

// 모든 요청을 처리하는 use 메소드
// static("폴더이름");
// 모든 요청에 대해서 static 파일(css, js)에 대한 요청인지 확인한다
// static 파일 요청에 응답해서 static 파일을 전송한다
app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));

app.get("/", (req, res) => {
  const htmlFilePath = path.join(__dirname, "views", "index.html");

  // sendFile("파일경로")
  // 응답으로 파일 전송
  res.sendFile(htmlFilePath); // index.html
});

app.get("/index", (req, res) => {
  const htmlFilePath = path.join(__dirname, "views", "index.html");

  res.sendFile(htmlFilePath); // index.html
});

app.get("/restaurants", (req, res) => {
  const htmlFilePath = path.join(__dirname, "views", "restaurants.html");

  res.sendFile(htmlFilePath); // restaurants.html
});

app.get("/recommend", (req, res) => {
  const htmlFilePath = path.join(__dirname, "views", "recommend.html");

  res.sendFile(htmlFilePath); // recommend.html
});

app.post("/recommend", (req, res) => {
  const newRestaurant = req.body;

  const filePath = path.join(__dirname, "data", "restaurants.json");

  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);

  storedRestaurants.push(newRestaurant);

  fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));

  // post 요청 특유의 재접속을 막는 현상 해결
  // redirect("URL경로");
  // 해당 URL로 이동시킨다(해당 URL에 대한 요청)
  res.redirect("/confirm")
});

app.get("/confirm", (req, res) => {
  const htmlFilePath = path.join(__dirname, "views", "confirm.html");

  res.sendFile(htmlFilePath); // confirm.html
});

app.get("/about", (req, res) => {
  const htmlFilePath = path.join(__dirname, "views", "about.html");

  res.sendFile(htmlFilePath); // about.html
});


app.listen(3000);