const fs = require("fs");
const path = require("path");

const express = require("express");
const uuid = require("uuid"); // uuid 패키지

const app = express();

// set();
// 옵션을 설정한다
// 1. 뷰 엔진(템플릿 엔진)으로 EJS 설정
// 2. 뷰 파일(템플릿 파일)이 존재하는 views 폴더 경로 설정
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

// 동적 라우팅(dynamic routing)
// :placeholder(=:id)
app.get("/restaurants/:id", (req, res)=>{ // "/restaurant/r1"
  // params
  // 동적 라우팅으로 설정한 모든 placeholder(=key)에 대한 정보를 갖는 객체
  const restaurantId = req.params.id;

  const filePath = path.join(__dirname, "data", "restaurants.json");

  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);

  for (let restaurant of storedRestaurants) {
    if (restaurant.id === restaurantId) {
      res.render("restaurant-detail", { restaurant: restaurant }); // restaurant-detail.ejs
      return;
    }
  }

  // 서버의 정상적인 응답 실패를 알려준다
  res.render("404"); // 404.ejs
})


app.get("/recommend", (req, res) => {
  res.render("recommend") // recommend.ejs
});

app.post("/recommend", (req, res) => {
  const newRestaurant = req.body;

  // 객체에 새로운 프로퍼티(id) 생성
  // uuid 패키지를 사용해서 '고유한 id값' 부여
  newRestaurant.id = uuid.v4();

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

// client side error
// 유효하지 않은 모든 나머지 요청 처리
app.use(function(req, res) {
  // 서버의 정상적인 응답 실패를 알려준다
  res.render("404"); // 404.ejs
})

// server side error
// 서버 측 에러가 발생했을 때 동작
app.use(function(error, req, res, next) {
  res.render("500"); // 500.ejs
})

app.listen(3000);
