export class CarListBuilder {
  constructor(data, list) {
    data.forEach((element) => {
      const carList = document.querySelector(list);
      const carListItem = document.createElement("div");
      carListItem.classList.add("car-list__item");
      carList.appendChild(carListItem);

      const imgItem = document.createElement("div");
      imgItem.classList.add("car-list__img");
      carListItem.appendChild(imgItem);

      const img = document.createElement("img");
      img.setAttribute("src", element.image);
      imgItem.appendChild(img);

      const carListTitle = document.createElement("div");
      carListTitle.classList.add("car-list__title");
      carListItem.appendChild(carListTitle);

      const carListTitleH3 = document.createElement("h3");
      carListTitleH3.innerHTML = element.name;
      carListTitle.appendChild(carListTitleH3);
      
      const carListTitleDiv = document.createElement("div");
      carListTitle.appendChild(carListTitleDiv);

      const carYear = document.createElement("span");
      carYear.innerHTML = element.year;
      carListTitleDiv.appendChild(carYear);

      const carListFeatures = document.createElement("div");
      carListFeatures.classList.add("car-list__features");
      carListItem.appendChild(carListFeatures);

      const carListFeaturesDiv1 = document.createElement("div");
      carListFeatures.appendChild(carListFeaturesDiv1);

      const carListFeaturesImg1 = document.createElement("img");
      carListFeaturesImg1.setAttribute("src", "img/ScreenShot1.jpg");
      carListFeaturesDiv1.appendChild(carListFeaturesImg1);

      const arListFeaturesP = document.createElement("p");
      arListFeaturesP.innerHTML =
        element.engine_capacity + " л, " + element.power + " л.с," + " Бензин";
      carListFeaturesDiv1.appendChild(arListFeaturesP);

      const carListFeaturesDiv2 = document.createElement("div");
      carListFeatures.appendChild(carListFeaturesDiv2);

      const carListFeaturesImg2 = document.createElement("img");
      carListFeaturesImg2.setAttribute("src", "img/ScreenShot2.jpg");
      carListFeaturesDiv2.appendChild(carListFeaturesImg2);

      const arListFeaturesP2 = document.createElement("p");
      arListFeaturesP2.innerHTML = element.transmission;
      carListFeaturesDiv2.appendChild(arListFeaturesP2);

      const carListFeaturesDiv3 = document.createElement("div");
      carListFeatures.appendChild(carListFeaturesDiv3);

      const carListFeaturesImg3 = document.createElement("img");
      carListFeaturesImg3.setAttribute("src", "img/ScreenShot3.jpg");
      carListFeaturesDiv3.appendChild(carListFeaturesImg3);

      const arListFeaturesP3 = document.createElement("p");
      arListFeaturesP3.innerHTML = element.drive;
      carListFeaturesDiv3.appendChild(arListFeaturesP3);

      const carCondition = document.createElement("div");
      carCondition.classList.add("car-list__condition");
      carListItem.appendChild(carCondition);

      const carListStatus = document.createElement("div");
      carListStatus.classList.add("car-list__in-stock");
      carListStatus.classList.add("car-list__status");
      carCondition.appendChild(carListStatus);

      const carListStatusColor = document.createElement("span");
      carListStatus.appendChild(carListStatusColor);

      const carListStatusText = document.createElement("span");
      carListStatusText.innerHTML = element.status;
      carListStatus.appendChild(carListStatusText);
      if (carListStatusText.innerHTML == "Нет в наличии") {
        carListStatusColor.style.backgroundColor = "red";
      }

      const carListPrice = document.createElement("div");
      carListPrice.classList.add("car-list__price");
      carListItem.appendChild(carListPrice);

      const carListPriceFrom = document.createElement("div");
      carListPriceFrom.classList.add("car-list__price-from");
      carListPrice.appendChild(carListPriceFrom);

      const carListPriceFromP = document.createElement("p");
      carListPriceFromP.innerHTML = `от <span>${element.price}</span> BYN`;
      carListPriceFrom.appendChild(carListPriceFromP);

      const carListPriceTo = document.createElement("div");
      carListPriceTo.classList.add("car-list__price-to");
      carListPrice.appendChild(carListPriceTo);

      const carListPriceToP = document.createElement("p");
      carListPriceToP.innerHTML = `до <span>${
        element.price - 25000
      }</span> BYN`;
      carListPriceTo.appendChild(carListPriceToP);

      const carListMorePrice = document.createElement("div");
      carListMorePrice.classList.add("car-list__more-price");
      carListItem.appendChild(carListMorePrice);

      const carListMorePriceA = document.createElement("a");
      carListMorePriceA.setAttribute("href", "#");
      carListMorePrice.appendChild(carListMorePriceA);

      const carListMorePriceImg = document.createElement("img");
      carListMorePriceImg.setAttribute("src", "img/ScreenShot5.png");
      carListMorePriceA.appendChild(carListMorePriceImg);

      const carListMorePriceP = document.createElement("p");
      carListMorePriceP.innerHTML = "Подробнее о цене";
      carListMorePriceA.appendChild(carListMorePriceP);

      const carListLocation = document.createElement("div");
      carListLocation.classList.add("car-list__location");
      carListItem.appendChild(carListLocation);

      const carListLocationImg = document.createElement("img");
      carListLocationImg.setAttribute("src", "img/ScreenShot4.png");
      carListLocation.appendChild(carListLocationImg);

      const carListLocationSpan = document.createElement("span");
      carListLocationSpan.innerHTML = "Минск";
      carListLocation.appendChild(carListLocationSpan);
    });
  }
}


  

