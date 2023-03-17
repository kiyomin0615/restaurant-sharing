const express = require("express");

// router 객체
// app 객체와 마찬가지로 get(), post() 메소드 존재
// 다양한 라우트(route)를 처리할 수 있다
const router = express.Router();

router.get("/", (req, res) => {
  // render("템플릿파일이름");
  // 템플릿 엔진의 도움을 받아 템플릿 파일을 분석해서 html 파일로 바꾸고
  // 요청에 대한 응답으로 html 파일 전송
  res.render("index"); // index.ejs
});

router.get("/index", (req, res) => {
  res.render("index") // index.ejs
});

router.get("/about", (req, res) => {
  res.render("about") // about.ejs
});

module.exports = router;