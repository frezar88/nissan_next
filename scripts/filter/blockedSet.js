export function blockedSet() {
   let inputsSet = document.querySelectorAll(".filter-list__complete-set input");
   let inputsModel = document.querySelectorAll(".filter-list__model .filter-list__content input");

   inputsSet.forEach((element) => {
      if (element.checked == true) {
         let inpMod = document.querySelector(`.filter-list__model .filter-list__content input[value='${element.name}']`);
         if (!inpMod.checked && element.checked == true) {
            inpMod.click();
         }
      }
   });
}
