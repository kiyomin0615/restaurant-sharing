const path = require("path");

const express = require("express");
const uuid = require("uuid"); // uuid 패키지

const defaultRoutes = require("./routes/default"); // default.js
const retaurantRoutes = require("./routes/restaurants"); // restaurants.js

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

// use 메소드에서 사양한 경로는 '필터링' 기능
// 해당 경로를 '포함'한 모든 경로를 허용
app.use("/", defaultRoutes);
app.use("/", retaurantRoutes);

// client side error
// 유효하지 않은 모든 나머지 요청 처리
app.use(function(req, res) {
  // 서버의 정상적인 응답 실패를 알려준다
  // status(상태코드);
  // 객체의 상태 코드를 변경하고 새로운 객체를 리턴한다
  res.status(404).render("404"); // 404.ejs
})

// server side error
// 서버 측 에러가 발생했을 때 동작
app.use(function(error, req, res, next) {
  res.status(500).render("500"); // 500.ejs
})

app.listen(3000);
