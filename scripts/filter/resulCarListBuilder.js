import { showPopUpDiscriptionBuCar } from "./popUpDescriptionByCar.js";

let carDescription = {};
export class CarBuilder {
   carContainer;
   path;
   car;

   constructor(car, path) {
      this.path = path;
      this.car = car;
      carDescription[car.id] = car;
      this.carContainer = this.createCar(this.car, this.path);
      this.carContainer.addEventListener("click", (e) => {
         /* let carListItem = e.currentTarget;
         let cloneCarListItem = carListItem.cloneNode(true);
         let popUpReserve = document.querySelector(".modal-dialog.dialog");
         let carListItemInPopUp = document.querySelector(".modal-dialog .car-list__item");
         if (carListItemInPopUp) {
            carListItemInPopUp.remove();
         } 

         popUpReserve.appendChild(cloneCarListItem);*/

         let eventCurentTargetDataCarId = e.currentTarget.attributes["data-car-id"].value;

         if (e.target.className == "CarName_БУ") {
            showPopUpDiscriptionBuCar(e, carDescription);
            /* let currentTargetByCarInfo = carDescription[eventCurentTargetDataCarId];
            sessionStorage.currentByCarInfo = JSON.stringify({ currentTargetByCarInfo });
            document.location.href = "/by-full-information?id=" + car.id; */
         }
      });
      this.append(path, this.carContainer);
      this.keepTrackOfTheCurrentPrice();
   }

   createElement(settings) {
      let dom = document.createElement(settings.elem);
      this.createElementSettings(dom, settings);

      return dom;
   }

   createElementSettings(dom, settings) {
      for (let key in settings.attributes) {
         dom.setAttribute(key, settings.attributes[key]);
      }
      if (typeof settings.inner == "object") {
         settings.inner.forEach((inner) => {
            dom.append(this.createElement(inner));
         });
      } else {
         dom.innerText = settings.inner ? settings.inner : "";
      }
   }

   createCar() {
      this.createItem(this.car.id, this.car.type);
      this.addImg(this.car.image, this.car.images);
      this.addTitle(this.car.name, this.car.year, this.car.win ? this.car.win : "", this.car.type);
      this.addFeatures(this.car.engine_capacity, this.car.power, this.car.transmission, this.car.drive, this.car.engine_name);
      this.addComplectation(this.car.complectation);
      this.addStatus("В наличии");
      this.addPrice(this.car.price, this.car.discount_price);
      this.addAdvantage(this.car.advantage);
      this.addAdvansedPrice(this.car.name, this.car.price, this.car.advantage);
      this.addLocation(this.car.location ? this.car.location : "Минск");
      this.addBtnreserve(this.car.id);

      return this.carContainer;
   }
   createItem(id, type) {
      return (this.carContainer = this.createElement({
         elem: "div",
         attributes: {
            class: "car-list__item",
            "data-car-id": id,
            "data-type": type,
         },
      }));
   }
   addComplectation(complectation) {
      if (!complectation) {
         return null;
      }

      let complect = document.createElement("div");
      complect.classList.add("complect-set");
      complect.innerHTML = "Комплектация: " + complectation;
      return this.carContainer.appendChild(complect);
   }
   addImg(image, images) {
      let carListBlock = document.createElement("div");
      carListBlock.classList.add("car-list__img");
      let imgCar = new Image();
      imgCar.src = image ? image : images[0].image_path + images[0].image_name;
      carListBlock.append(imgCar);
      /* imgCar.onerror = function () {
         imgCar.setAttribute("src", "/images/new-filter/img/noimage2.png");
         imgCar.setAttribute("style", "width:260px; height: 250px;");
      }; */
      return this.carContainer.append(carListBlock);
   }
   addTitle(CarName, year, win, type) {
      return this.carContainer.appendChild(
         this.createElement({
            elem: "div",
            attributes: {
               class: "car-list__title",
            },
            inner: [
               {
                  elem: "h3",
                  attributes: { class: "CarName_" + type.replace("/", "") },
                  inner: CarName,
               },
               {
                  elem: "div",
                  inner: [
                     { elem: "span", inner: year },
                     { elem: "span", inner: win },
                  ],
               },
            ],
         })
      );
   }
   addFeatures(engine_capacity, power, transmission, drive, engine_name, complectation) {
      return this.carContainer.appendChild(
         this.createElement({
            elem: "div",
            attributes: {
               class: "car-list__features",
            },
            inner: [
               {
                  elem: "div",
                  inner: [
                     {
                        elem: "img",
                        attributes: {
                           src: "../../images/filter/car-list-item/malfunction-indicador.svg",
                           alt: "#",
                        },
                     },
                     {
                        elem: "p",
                        inner: engine_capacity + " л., " + power + " " + engine_name,
                     },
                  ],
               },
               {
                  elem: "div",
                  inner: [
                     {
                        elem: "img",
                        attributes: {
                           src: "../../images/filter/car-list-item/manual-transmission.svg",
                           alt: "#",
                        },
                     },
                     {
                        elem: "p",
                        inner: transmission,
                     },
                  ],
               },
               {
                  elem: "div",
                  inner: [
                     {
                        elem: "img",
                        attributes: {
                           src: "../../images/filter/car-list-item/axle.svg",
                           alt: "#",
                        },
                     },
                     {
                        elem: "p",
                        inner: drive,
                     },
                  ],
               },
            ],
         })
      );
   }

   addStatus(status) {
      let stat;
      if (status) {
         stat = {
            elem: "div",
            attributes: { class: "car-list__in-stock car-list__status" },
            inner: [{ elem: "span" }, { elem: "span", inner: status }],
         };
      } else {
         stat = {
            elem: "div",
            attributes: { class: "car-list__in-stock car-list__status" },
            inner: [
               { elem: "span", attributes: { style: `background:red` } },
               { elem: "span", inner: "Нет в наличии" },
            ],
         };
      }
      return this.carContainer.appendChild(this.createElement(stat));
   }
   addPrice(price, discountPrice) {
     
      if (discountPrice && price != discountPrice) {
         return this.carContainer.appendChild(
            this.createElement({
               elem: "div",
               attributes: { class: "car-list__price car-list__price" },
               inner: [
                  {
                     elem: "div",
                     attributes: { class: "car-list__price car-list__price-from" },
                     inner: [
                        {
                           elem: "span",
                           attributes: { class: "new-price" },
                           inner: discountPrice.replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1"),
                        },
                        { elem: "span", inner: " BYN " },
                     ],
                  },
                  {
                     elem: "div",
                     attributes: { class: "car-list__price car-list__price-to" },
                     inner: [
                        {
                           elem: "span",
                           inner: price.replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1"),
                        },
                        { elem: "span", inner: " BYN " },
                     ],
                  },
               ],
            })
         );
      } else {
         return this.carContainer.appendChild(
            this.createElement({
               elem: "div",
               attributes: { class: "car-list__price car-list__price" },
               inner: [
                  {
                     elem: "div",
                     attributes: { class: "car-list__price car-list__price-from" },
                     inner: [
                        {
                           elem: "span",
                           attributes: { class: "new-price" },
                           inner: price.replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1"),
                        },
                        { elem: "span", inner: " BYN " },
                     ],
                  },
                  
               ],
            })
         );
      }

   }
   addAdvantage(advantage) {
      if (advantage && advantage != "0") {
         return this.carContainer.appendChild(
            this.createElement({
               elem: "div",
               attributes: { class: "car-list__advantage" },
               inner: [{ elem: "span", inner: String(-advantage).replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1") + " BYN выгода по trade-in" }],
            })
         );
      }
   }

   addAdvansedPrice(carName, carPrice, advantage) {
      return this.carContainer.appendChild(
         this.createElement({
            elem: "div",
            attributes: {
               class: "car-list__more-price",
               "data-name-car": carName,
               "data-price-car": carPrice,
               "data-advantage": advantage,
            },
            inner: [
               {
                  elem: "div",
                  attributes: { class: "adVansedPrice" },
                  inner: [
                     {
                        elem: "img",
                        attributes: { class: "adVansedPrice", src: "../../images/filter/round-info-button.svg", alt: "#" },
                     },
                     { elem: "p", attributes: { class: "adVansedPrice" }, inner: "Подробнее о цене" },
                  ],
               },
            ],
         })
      );
   }

   addLocation(location) {
      return this.carContainer.appendChild(
         this.createElement({
            elem: "div",
            attributes: {
               class: "car-list__location",
            },
            inner: [
               {
                  elem: "img",
                  attributes: {
                     src: "../../images/filter/ArrowLocation.png",
                     alt: "#",
                  },
               },
               {
                  elem: "span",
                  inner: location,
               },
            ],
         })
      );
   }
   addBtnreserve(carId) {
      return this.carContainer.appendChild(
         this.createElement({
            elem: "div",
            attributes: {
               class: "btn-reserve",
            },
            inner: [
               {
                  elem: "a",
                  attributes: {
                     href: "#",
                     class: "red_button viewer",
                     "data-toggle": "modal",
                     "data-target": "#pop-up",
                     "data-type": "car-in-stock",
                     "data-car": carId,
                  },
                  inner: "ЗАРЕЗЕРВИРОВАТЬ",
               },
            ],
         })
      );
   }

   append(path, content) {
      document.querySelector(path).appendChild(content);
   }

   keepTrackOfTheCurrentPrice() {
      let inputPriceTradeInStatus = document.getElementById("trade-in_switch");

      if (inputPriceTradeInStatus.checked && localStorage.finalPriceYouCar) {
         let price = document.querySelectorAll('.car-list__price-to[style="display:none;"]');
         price.forEach((element) => {
            element.style.display = "block";
         });
      } else return;
   }
}
