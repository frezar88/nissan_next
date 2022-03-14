import { priceRangeSlider, priceSlider, updateRangeInput } from "./range-slider.js";
import { sideBar } from "./side-bar.js";
import { CarBuilder } from "./resulCarListBuilder.js";
import { RequestData } from "./ajax.js";
import { pyramidSortPrice } from "./priceSortPiramid.js";
import { Filter } from "./filter.js";
import { CreateElementResultCarAndBtnShowMore } from "./CreateElementResultCarAndBtnShowMore.js";
import { countAuto } from "./countAuto.js";
import { CreateFormData } from "./createFormData.js";
import { hideNoActiveFilters } from "./hideNoActiveFilters.js";
import { blockedFiltersByOrNew } from "./blockedFiltersByOrNew.js";
import {} from "./popUpDescriptionByCar.js";
/* import "./headerCar.js"; */
import { blockedSet } from "./blockedSet.js";
import { editAttributesForHeaderCarsContent, followOnActiveInputInModelFilterBlock } from "./headerCar.js";
export const theNumberOfDisplayedCarCards = 15;
let page = 0;
let form = document.querySelector("form");
let newFormData;
let host = "";
if (window.location.hostname == "127.0.0.1") {
   host = "https://vitebsk.nissan-global.by/";
}

allOthersPageEvent();

new RequestData().requestRun(host + "/car-in-stock/react-filters", "POST", statusFilterCreater()).then((data) => {
   defaultSetValueStartFilterAndCreateFilter(data);

   let noActiveFilter = document.querySelectorAll(".filter-list__item .true input");

   noActiveFilter.forEach((element) => {
      element.parentNode.parentNode.style.opacity = "0";
      element.parentNode.parentNode.style.zIndex = "-1000";
      element.parentNode.parentNode.style.position = "absolute";
   });
});

const debounce = (fn, ms) => {
   let timeout;
   return function () {
      const fnCall = () => {
         fn.apply(this, arguments);
      };

      clearTimeout(timeout);

      timeout = setTimeout(fnCall, ms);
   };
};

form.addEventListener("change", (e) => followOnActiveInputInModelFilterBlock(e));
let debounceOnChangeForm = debounce(onChangeForm, 2000);

form.addEventListener("change", debounceOnChangeForm);

export function creatBlockCarNotFound(params) {
   const carListWrapper = document.querySelector(".car-list__wrapper");
   let blockNotFound = document.createElement("div");
   blockNotFound.className = "car-not-found";
   blockNotFound.innerHTML = "Автомобиль не найден";

   carListWrapper.appendChild(blockNotFound);
}

function filterBlockFilterHideSetNewValueInputRange(dataPost, inputMin, inputMax) {
   blockedFiltersByOrNew(dataPost.data);
   hideNoActiveFilters(dataPost.data);
   rangeSliderSetNewValueAndNewPosition(dataPost, inputMin, inputMax);
}

function defaultSetValueStartFilterAndCreateFilter(data1) {
   let createFilters = new Filter(data1.data);
   sideBar(data1.newModelsList);
   defaultSetRangeSliderMinMax(data1);
   sortYear();
}

function allOthersPageEvent() {
   btnShowMoreEvent();
   new pyramidSortPrice();
}

function defaultSetRangeSliderMinMax(data1) {
   priceRangeSlider(+data1.data[2].options.min, +data1.data[2].options.max, ".slider-range", 0);
   priceRangeSlider(+data1.data[3].options.min, +data1.data[3].options.max + 3000, ".slider-range", 1);
}

function formDataCreateAndAddPriceOrTradeIn(e) {
   newFormData;
   switch (e.target.className) {
      case "car-price":
         newFormData = CreateFormData("car-price");
         break;
      case "car-trade-in":
         newFormData = CreateFormData("car-trade-in");
         break;
      default:
         newFormData = CreateFormData();
         break;
   }
   newFormDataCreateAddparams(newFormData);
   return newFormData;
}

function newFormDataCreateAddparams(params) {
   params.page = page;
   params.amount = theNumberOfDisplayedCarCards;
   return params;
}

function rangeSliderSetNewValueAndNewPosition(params, inpMin, inpMax) {
   let inputs = document.querySelectorAll('.filter__wrapper input[class="inp"]:checked');
   inputs.forEach((element) => {
      element.addEventListener("click", function () {
         setTimeout(() => {
            priceSlider[0].noUiSlider.reset();
            priceSlider[1].noUiSlider.reset();
         }, 800);
      });
   });
   params.data.forEach((element) => {
      for (const key in element) {
         if (element.id == "price") {
            let price = document.querySelector(".filter-list__price .filter-list__item");
            if (params.data[2].options.min == params.data[2].options.max) {
               document.querySelector(".slider-range").setAttribute("disabled", true);
               inpMin[0].value = params.data[2].options.max;
               inpMax[0].value = params.data[2].options.max;
               price.setAttribute("style", "pointer-events: none; opacity: 0.5;");
            } else {
               price.removeAttribute("style");
               document.querySelector(".slider-range").removeAttribute("disabled");
            }
            updateRangeInput(0, params.data[2].options.min, params.data[2].options.max);
         }
         if (element.id == "trade-in") {
            let price = document.querySelector(".filter-list__trade-in .filter-list__item");

            if (params.data[3].options.min == params.data[3].options.max || params.data[3].options.min == "") {
               document.querySelector(".filter-list__trade-in .slider-range").setAttribute("disabled", true);
               inpMin[1].value = params.data[3].options.max;
               inpMax[1].value = params.data[3].options.max;
               price.setAttribute("style", "cursor: not-allowed; pointer-events: none; opacity: 0.5;");
            } else {
               price.removeAttribute("style");
               document.querySelector(".filter-list__trade-in .slider-range").removeAttribute("disabled");
            }
            if (params.data[3].options.min == "") {
               updateRangeInput(1, +0, params.data[3].options.max);
            } else {
               updateRangeInput(1, params.data[3].options.min, params.data[3].options.max);
            }
         }
      }
   });
   priceSlider[0].noUiSlider.set([+inpMin[0].value.replace(/\s+/g, ""), +inpMax[0].value.replace(/\s+/g, "")]);
   priceSlider[1].noUiSlider.set([+inpMin[1].value.replace(/\s+/g, ""), +inpMax[1].value.replace(/\s+/g, "")]);
}

function carListCreateAndReturnPage(data) {
   let carsArray = data.cars;

   if (page == 0) {
      document.querySelector(".car-list__wrapper").innerHTML = "";
   }

   CreateElementResultCarAndBtnShowMore(carsArray, CarBuilder);
   if (data.cars.length != theNumberOfDisplayedCarCards) {
      page = 0;
   }
   countAuto(data.count);

   return page;
}
function trackingInputBuArwNew() {
   let inputsState = document.querySelectorAll('.form input[type="checkbox"]');

   for (let i = 3; i < inputsState.length; i++) {
      inputsState[i].addEventListener("click", () => {
         return (page = 0);
      });
   }
}

function btnShowMoreEvent() {
   let btnMore = document.querySelector(".result-footer button");
   btnMore.addEventListener("mousedown", () => {
      let chang = document.querySelector(".change");
      btnMore.classList.add("spiner-active");
      setTimeout(() => {
         chang.click();
      }, 500);
      page++;
   });
}
function trackingStateInputBYOrNew() {
   let inputState = document.querySelectorAll(".filter-list__state input");

   for (let i = 0; i < inputState.length; i++) {
      let checkedInp = document.querySelectorAll(".filter-list__state input:checked");
      if (checkedInp.length == 1) {
         checkedInp.forEach((element) => {
            element.setAttribute("disabled", "");
         });
      }
      if (checkedInp.length == 2) {
         checkedInp.forEach((element) => {
            element.removeAttribute("disabled");
         });
      }
   }
}

function offSpinerInBlockBtnSHowMoreCar() {
   let btnShowMoreCar = document.querySelector(".result-footer .spiner-active ");
   if (btnShowMoreCar) {
      btnShowMoreCar.classList.remove("spiner-active");
   }
}

function sortYear() {
   let noSortArr = [];
   let yearSpan = document.querySelectorAll(".filter-list__year label span");
   yearSpan.forEach((element) => {
      noSortArr.push(element);
   });
   noSortArr.map(() => {
      noSortArr.sort((a, b) => (+a.innerHTML > +b.innerHTML ? 1 : -1));
      for (let i = 0; i < noSortArr.length; i++) {
         const element = noSortArr[i];
         let parentUnit = element.parentNode.parentNode;
         parentUnit.style.order = i;
      }
   });
   sortModel();
   sortEngine(".filter-list__engine .бензин label span");
   sortEngine(".filter-list__engine .дизель label span");
}

function sortEngine(path) {
   let noSortArr = [];
   let engineSpan = document.querySelectorAll(path);

   engineSpan.forEach((element) => {
      noSortArr.push(element);
   });
   noSortArr.map(() => {
      noSortArr.sort((a, b) => (a.innerHTML.substr(0, 3) > b.innerHTML.substr(0, 3) ? 1 : -1));

      for (let i = 0; i < noSortArr.length; i++) {
         const element = noSortArr[i];
         let parentUnit = element.parentNode.parentNode;
         parentUnit.style.order = i;
      }
   });
}

function sortModel() {
   let noSortArr = [];
   let engineSpan = document.querySelectorAll(".filter-list__model label span");

   engineSpan.forEach((element) => {
      noSortArr.push(element);
   });
   noSortArr.map(() => {
      noSortArr.sort((a, b) => (a.innerHTML.substr(0, 1) > b.innerHTML.substr(0, 1) ? 1 : -1));

      for (let i = 0; i < noSortArr.length; i++) {
         const element = noSortArr[i];
         let parentUnit = element.parentNode.parentNode;
         parentUnit.style.order = i;
      }
   });
}

function onChangeForm(e) {
   let carListWrapper = document.querySelector(".car-list__wrapper");
   let btnResetFilter = document.querySelector(".filter-list__clearbtn");
   let headerCar = document.querySelector(".header-cars-content");
   let inpMin = document.querySelectorAll(".minPrice");
   let inpMax = document.querySelectorAll(".maxPrice");
   formDataCreateAndAddPriceOrTradeIn(e);

   let form = this;

   let timeout;
   timeout = setTimeout(() => {
      btnResetFilter.style.pointerEvents = "none";
      btnResetFilter.style.opacity = 0.7;
      form.style.pointerEvents = "none";
      form.style.opacity = 0.7;
      if (headerCar) {
         headerCar.style.pointerEvents = "none";
         headerCar.style.opacity = 0.7;
      }
   }, 300);

   addSpinnerForCarListWrapper(carListWrapper, true);

   new RequestData().requestRun(host + "/car-in-stock/react-filters", "POST", newFormData).then((newData) => {
      filterBlockFilterHideSetNewValueInputRange(newData, inpMin, inpMax);
      formDataCreateAndAddPriceOrTradeIn(e);

      new RequestData().requestRun(host + "/car-in-stock/react-filters", "POST", newFormData).then((newData) => {
         filterBlockFilterHideSetNewValueInputRange(newData, inpMin, inpMax);
         formDataCreateAndAddPriceOrTradeIn(e);
         editAttributesForHeaderCarsContent();
      });
      new RequestData().requestRun(host + "/car-in-stock/get-cars", "POST", newFormData).then((data) => {
         trackingInputBuArwNew();
         carListCreateAndReturnPage(data);
         offSpinerInBlockBtnSHowMoreCar();
         form.addEventListener("change", (event) => blockedSet(event));

         if (data.count == 0) {
            creatBlockCarNotFound();
         }

         clearTimeout(timeout);
         if (headerCar) {
            headerCar.style.pointerEvents = "unset";
            headerCar.style.opacity = 1;
         }

         btnResetFilter.style.pointerEvents = "unset";
         btnResetFilter.style.opacity = 1;
         form.style.pointerEvents = "unset";
         form.style.opacity = 1;
      });
   });
}

function addSpinnerForCarListWrapper(Path, status) {
   let spinner = document.createElement("div");
   let spinnerContainer = document.createElement("div");
   spinnerContainer.appendChild(spinner);
   spinner.classList.add("loader1");
   spinner.classList.add("spinner-car-list");
   spinnerContainer.style.position = "absolute";
   spinnerContainer.style.width = "100%";
   spinnerContainer.style.height = "100%";
   spinnerContainer.style.background = "#00000030";
   spinnerContainer.style.minHeight = "600px";
   spinnerContainer.style.pointerEvents = "Arrow";
   spinnerContainer.style.zIndex = "1000";
   spinner.style.marginTop = "300px";

   if (status && page === 0) {
      Path.appendChild(spinnerContainer);
   } else {
      spinner.remove();
   }
}

function statusFilterCreater() {
   let statusFilter = {};
   let url = new URL(window.location.href);
   let by = url.searchParams.get("by");
   let model = url.searchParams.get("id");

   if (!model && !by) {
      statusFilter = {
         state: ["Новый"],
      };
   } else if (model) {
      statusFilter = {
         state: ["Новый"],
      };
   } else {
      statusFilter = {
         state: ["Б/У"],
      };
   }
   return statusFilter;
}
