const unidades = [
  {
    "unidade":"Nebulosa",
    "idade":"10 anos",
    "conselheiros":"xyz",
    "instrutores":"xyzda",
    "grito":""
  },
  {
    "unidade":"Rigel",
    "idade":"11 anos",
    "conselheiros":"xyz",
    "instrutores":"xyzda",
    "grito":"xyzda"
  },
  {
    "unidade":"Bellatrix",
    "idade":"12 anos",
    "conselheiros":"xyz",
    "instrutores":"xyzda",
    "grito":"Moral! Moral! Moral! Moral! Moral!<br>Moral do batalhão! Bellatrix é a força, poder e União!<br>Bellatrix é moral! Moral do batalhão!<br> Guerra nosso lema, vontade e tradição!<br>E na nossa unidade não tem moleza não!<br>Na terra, no céu, seja onde for,<br>Unidade Bellatrix mostrando seu Valor!<br>Bella! Bella! Bellatrix!<br>Fé em Deus que Ele é justo! (2x)<br> Se Deus é por nós, quem será contra nós (2x)<br>Unidos Venceremos (2x)<br>1, 2, 3, Bella!"
  },
  {
    "unidade":"Saiph",
    "idade":"13 e 14 anos",
    "conselheiros":"xyz",
    "instrutores":"xyzda",
    "grito":"xyzda"
  },
  {
    "unidade":"Sigma",
    "idade":"15 anos",
    "conselheiros":"xyz",
    "instrutores":"xyzda",
    "grito":"xyzda"
  },
  {
    "unidade":"Hatsya",
    "idade":"10 anos",
    "conselheiros":"xyz",
    "instrutores":"xyzda",
    "grito":"xyzda"
  },
  {
    "unidade":"Meissa",
    "idade":"11 anos",
    "conselheiros":"xyz",
    "instrutores":"xyzda",
    "grito":"xyzda"
  },
  {
    "unidade":"Alnilan",
    "idade":"12 anos",
    "conselheiros":"xyz",
    "instrutores":"xyzda",
    "grito":"xyzda"
  },
  {
    "unidade":"Alnitak",
    "idade":"13 e 14 anos",
    "conselheiros":"xyz",
    "instrutores":"xyzda",
    "grito":"xyzda"
  },
  {
    "unidade":"M78",
    "idade":"15 anos",
    "conselheiros":"xyz",
    "instrutores":"xyzda",
    "grito":"xyzda"
  },

]

function unidadeModal(unidadeNum){
  var unidadeAr = unidades[unidadeNum];
    // console.log(unidadeAr.unidade);

  $(".modal-title").html("Unidade: "+unidadeAr.unidade)
  $("#conteudoModal").html("<p><b>Unidade: "+unidadeAr.unidade+"</b></p><p><b></b>Idade: "+unidadeAr.idade+"</b></p><p><b></b>Conselheiros: "+unidadeAr.conselheiros+"</b></p><p><b></b>Instrutores: "+unidadeAr.instrutores+"</b></p>");
  $("#grito").html("<h4>Grito de Guerra</h4>"+unidadeAr.grito);

}

//Script Carrossel - Direçao

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