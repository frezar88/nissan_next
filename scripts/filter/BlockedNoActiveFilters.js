export function blockedFilters(params) {
    params.forEach((element) => {

        for (const key in element) {
            switch (true) {
                case element.id == "model":
                    element.options.forEach((option) => {
                        let h4 = document.querySelector('.filter-list__complete-set .filter-list__content h4[name="' + option.category + '"')

                        let input = document.querySelector('input[name="' + element.id + '"][value="' + option.category + '"]');
                        if (option.disabled) {
                            input.parentElement.classList.add("true");
                            if (h4 != null) {
                                h4.classList.add('true')
                            }
                        } else {
                            input.parentElement.classList.remove("true");
                            if (h4 != null) {
                                h4.classList.remove('true')
                            }
                        }
                        option.options.forEach(comlect => {
                            let input = document.querySelector('input[name="' + option.category + '"][value="' + comlect.name + '"]');

                            if (!input) {
                                return
                            } else {
                                if (comlect.disabled) {
                                    input.parentElement.classList.add("true");
                                } else {
                                    input.parentElement.classList.remove("true");
                                }
                            }
                        });
                    });
                    break;
                case element.id == "year":
                    element.options.forEach((option) => {

                        let input = document.querySelector('input[name="' + element.id + '"][value="' + option.name + '"]');

                        if (option.disabled) {
                            input.parentElement.classList.add("true");
                        } else {
                            input.parentElement.classList.remove("true");
                        }
                    });
                    break;
                case element.id == "engine":
                    element.options.forEach((option) => {
                        option.options.forEach(element1 => {
                            console.log()
                            let input = document.querySelector('input[name="' + option.category + '"][value="' + element1.name + '"]');

                            if (option.disabled || element1.disabled) {
                                input.parentElement.classList.add("true");
                            } else {
                                input.parentElement.classList.remove("true");
                            }
                        });
                    });
                    break;
                case element.id == "transmission":
                    element.options.forEach((option) => {

                        let input = document.querySelector('input[name="' + element.id + '"][value="' + option.name + '"]');

                        if (option.disabled) {
                            input.parentElement.classList.add("true");
                        } else {
                            input.parentElement.classList.remove("true");
                        }
                    });
                    break;
                case element.id == "drive":
                    element.options.forEach((option) => {

                        let input = document.querySelector('input[name="' + element.id + '"][value="' + option.name + '"]');

                        if (option.disabled) {
                            input.parentElement.classList.add("true");
                        } else {
                            input.parentElement.classList.remove("true");
                        }
                    });
                    break;
                case element.id == "state":
                    element.options.forEach((option) => {

                        let input = document.querySelector('input[name="' + element.id + '"][value="' + option.name + '"]');

                        if (option.disabled) {
                            input.parentElement.classList.add("true");
                        } else {
                            input.parentElement.classList.remove("true");
                        }
                    });
                    break;
                case element.id == "color":
                    element.options.forEach((option) => {

                        let input = document.querySelector('input[name="' + element.id + '"][value="' + option.name + '"]');

                        if (option.disabled) {
                            input.parentElement.style.display = "none"
                        } else {
                            input.parentElement.style.display = "flex"
                        }
                    });
                    break;
                default:
                    break;
            }
        }
    });

    let inputsState = document.querySelectorAll('.filter-list__state input')
    console.log(inputsState)
    inputsState.forEach(element => {
        if (element.defaultValue == 'Новый' && element.checked == true) {
            let fdsfds = document.querySelectorAll('.true')
            fdsfds.forEach(element => {
                element.classList.add('bu')
                
            });
            
        }
        if (element.defaultValue == 'Б/У' && element.checked == true) {
            let fdsfds = document.querySelectorAll('.true')
            fdsfds.forEach(element => {
                element.classList.add('new')
            });
        }
        if (element.defaultValue == 'Новый' && element.checked == true && element.defaultValue == 'Б/У' && element.checked == true) {
            console.log('fdsfds')
        }
    });
}