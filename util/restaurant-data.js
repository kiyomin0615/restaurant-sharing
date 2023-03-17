const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, '..', "data", "restaurants.json");

// 파일 읽기
function getStoredRestaurants() {
  const fileData = fs.readFileSync(filePath);

  const storedRestaurants = JSON.parse(fileData);

  return storedRestaurants;
}

// 파일 쓰기
function storeRestaurants(restaurants) {
  fs.writeFileSync(filePath, JSON.stringify(restaurants));
}

// 외부에 공개할 프로퍼티, 메소드 설정
module.exports = {
  // key - value
  getStoredRestaurants: getStoredRestaurants,
  storeRestaurants: storeRestaurants,
}