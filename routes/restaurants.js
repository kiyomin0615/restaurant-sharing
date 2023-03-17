const express =require("express");

const router = express.Router();

const restaurantData = require("../util/restaurant-data"); // restaurant-data 패키지(=모듈)

router.get("/restaurants", (req, res) => {
  const restaurants = restaurantData.getStoredRestaurants();

  // req.body -> post 요청의 폼데이터
  // req.query -> get 요청의 폼데이터
  let order = req.query.order;
  let nextOrder = "desc"

  if (order !== "asc" || oreder !== "desc") {
    order = "asc";
  }

  if (order === "desc") {
    nextOrder = "asc";
  }

  // 배열 정렬
  restaurants.sort(function(res1, res2) {
    if (order === "asc" && res1.name > res2.name) {
      return 1; // res1, res2 위치 바꾼다(오름차순)
    } else if (order === "desc" && res2.name > res1.name) {
      return 1; // res1, res2 위치 바꾼다(내림차순)
    }
    return -1;
  })

  // render("템플릿파일이름", 객체);
  res.render("restaurants", { // restaurants.ejs
    numberOfRestaurants: restaurants.length,
    restaurants: restaurants,
    nextOrder: order,
  });
});

// 동적 라우팅(dynamic routing)
// :placeholder(=:id)
router.get("/restaurants/:id", (req, res)=>{ // "/restaurant/r1"
  // params
  // 동적 라우팅으로 설정한 모든 placeholder(=key)에 대한 정보를 갖는 객체
  const restaurantId = req.params.id;

  const restaurants = restaurantData.getStoredRestaurants();

  for (let restaurant of restaurants) {
    if (restaurant.id === restaurantId) {
      res.render("restaurant-detail", { restaurant: restaurant }); // restaurant-detail.ejs
      return;
    }
  }

  // 서버의 정상적인 응답 실패를 알려준다
  res.status(404).render("404"); // 404.ejs
})

router.get("/recommend", (req, res) => {
  res.render("re  commend") // recommend.ejs
});

router.post("/recommend", (req, res) => {
  const newRestaurant = req.body;

  // 객체에 새로운 프로퍼티(id) 생성
  // uuid 패키지를 사용해서 '고유한 id값' 부여
  newRestaurant.id = uuid.v4();

  const restaurants = restaurantData.getStoredRestaurants();

  restaurants.push(newRestaurant);

  restaurantData.storeRestaurants(restaurants);

  // post 요청 특유의 재접속을 막는 현상 해결
  // redirect("URL경로");
  // 해당 URL로 이동시킨다(해당 URL에 대한 요청)
  res.redirect("/confirm")
});

router.get("/confirm", (req, res) => {
  res.render("confirm") // confirm.ejs
});

module.exports = router;