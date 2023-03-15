const fs = require("fs");
const path = require("path");

const express = require("express");

const app = express();

// set();
// 서버에 대한 몇가지 옵션을 설정한다
// 템플릿 기능 사용 가능
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// 모든 요청을 처리하는 use 메소드
// static("폴더이름");
// 모든 요청에 대해서 static 파일(css, js)에 대한 요청인지 확인한다
// static 파일 요청에 응답해서 static 파일을 전송한다
app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));

app.get("/", (req, res) => {
  // render("템플릿파일이름");
  // 템플릿 엔진의 도움을 받아 템플릿 파일을 분석해서 html 파일로 바꾸고
  // 요청에 대한 응답으로 html 파일 전송
  res.render("index"); // index.ejs
});

app.get("/index", (req, res) => {
  res.render("index") // index.ejs
});

app.get("/restaurants", (req, res) => {
  const filePath = path.join(__dirname, "data", "restaurants.json");

  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);

  // render("템플릿파일이름", 객체);
  res.render("restaurants", { // restaurants.ejs
    numberOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants,
  });
});

app.get("/recommend", (req, res) => {
  res.render("recommend") // recommend.ejs
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
  res.render("confirm") // confirm.ejs
});

app.get("/about", (req, res) => {
  res.render("about") // about.ejs

});

app.listen(3000);
