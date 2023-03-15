const drawerButtonElement = document.getElementById("drawer-button");
const mobileDrawerElement = document.getElementById("mobile-drawer");

// drawer-button 요소에 클릭 이벤트가 발생하면
drawerButtonElement.addEventListener("click", () => {
  // mobile-drawer 요소에 open 클래스를 ON/OFF
  mobileDrawerElement.classList.toggle("open");
})