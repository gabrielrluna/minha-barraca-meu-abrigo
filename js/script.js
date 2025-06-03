const wrapperDup = document.querySelector(".wrapperDup");
const carouselDup = document.querySelector(".carouselDup");
const arrowBtnsDup = document.querySelectorAll(".wrapperDup i");
const firstCardWidthDup = carouselDup.querySelector(".cardDup").offsetWidth;
const carouselChildrensDup = [...carouselDup.children];

let isDraggingDup = false, startXDup, startScrollLeftDup, timeoutIdDup;

let cardPerViewDup = Math.round(carouselDup.offsetWidth / firstCardWidthDup);

carouselChildrensDup.slice(-cardPerViewDup).reverse().forEach(cardDup => {
  carouselDup.insertAdjacentHTML("afterBegin", cardDup.outerHTML);
});

carouselChildrensDup.slice(0, cardPerViewDup).forEach(cardDup => {
  carouselDup.insertAdjacentHTML("beforeend", cardDup.outerHTML);
});

arrowBtnsDup.forEach(btnDup => {
  btnDup.addEventListener("click", () => {
    // console.log(btn.id);
    carouselDup.scrollLeft += btnDup.id === "left" ? -firstCardWidthDup : firstCardWidthDup;
  })
})

//As funções a seguir servem para que o carrossel consiga ser mexido com o arrastar do mouse.
const dragStartDup = (e) => {
  isDraggingDup = true;
  carouselDup.classList.add("dragging");
  startXDup = e.pageX;
  startScrollLeftDup = carouselDup.scrollLeft;
}

const draggingDup = (e) => {
  // console.log(e.pageX);
  if(!isDraggingDup) return;
  carouselDup.scrollLeft = startScrollLeftDup - (e.pageX - startXDup);
}

const dragStopDup = () => {
  isDraggingDup = false;
  carouselDup.classList.remove("dragging");
}


//Função que ativa o rolamento automático dos cards
const autoPlayDup = () => {
  if(window.innerWidth < 800) return;
  timeoutIdDup = setTimeout(() => carouselDup.scrollLeft += firstCardWidthDup, 3500);
}

autoPlayDup(); //Aqui o rolamento automático é ativado. 

//O script abaixo deixa o carrossel "infinito"
const infiniteScrollDup = () => {
  if(carouselDup.scrollLeft === 0) {
    carouselDup.classList.add("no-transition");
    carouselDup.scrollLeft = carouselDup.scrollWidth - (2 * carouselDup.offsetWidth);
    carouselDup.classList.remove("no-transition");
  } else if(Math.ceil(carouselDup.scrollLeft) === carouselDup.scrollWidth - carouselDup.offsetWidth){
    carouselDup.classList.add("no-transition");
    carouselDup.scrollLeft = carouselDup.offsetWidth;
    carouselDup.classList.remove("no-transition");

  }
  clearTimeout(timeoutIdDup);
  if(!wrapperDup.matches(":hover")) autoPlayDup();
}

carouselDup.addEventListener("mousedown", dragStartDup);
carouselDup.addEventListener("mousemove", draggingDup);
document.addEventListener("mouseup", dragStopDup);
wrapperDup.addEventListener("mouseenter", () => clearTimeout(timeoutIdDup));
wrapperDup.addEventListener("mouseleave", autoPlayDup);
carouselDup.addEventListener("scroll", infiniteScrollDup);