function navBar() {
    let menu = document.querySelector('.accord-info')
    let navBar = document.querySelector('.header-nav-container__menu')
    navBar.addEventListener('click', ({ target, currentTarget }) => {
        addActiveClassToListItem(target, currentTarget,menu)
    })
 
}

function addActiveClassToListItem(target, currentTarget, menu) {
    showCurrentMenu(target)
    currentTarget.querySelectorAll('.item').forEach(element => {
        if (element && element!==target) {
            element.classList.remove('active')
        }
    });
    if (target.className === 'item') {
        target.classList.add('active')
        showOrCloseMenu(menu)
    } else {
        target.classList.remove('active')
        showOrCloseMenu(menu,true)
    }
 
}   

function showCurrentMenu(target) {
    let dataTypeAttributes = target.attributes['data-type'].value
    let allMenu = document.querySelectorAll('.menu')
    if (dataTypeAttributes) {
        allMenu.forEach(el => {
            if (dataTypeAttributes === el.id) {
               
                el.style.display = 'flex'
               
            } else {
              
                el.style.display = 'none'
            }
        })
    }
       
}
function showOrCloseMenu(menu, status) {
    if (!status) {
        menu.style.maxHeight = menu.scrollHeight + 'px'
    } else {
        menu.style.maxHeight = 0
    }
  
}
navBar()




function MobileOrPortableMenuBlock() {
    let shadowBlock = document.querySelector('.mobile-menu-block')
    let portableMenu = document.querySelector('.mobile-menu-block__wrapper')
    let btnPortable = document.querySelector('.mobile-menu')
    let btnCloseMenu = document.querySelector('.btn-close-cross')

    moveMenu(shadowBlock,portableMenu, btnPortable, btnCloseMenu)
}

function moveMenu(shadowBlock, menu, btnShow, btnCLose) {
    
    btnShow.addEventListener('click', () => {
        shadowBlock.style.display = 'block'
        setTimeout(() => {
            menu.style.transform = 'translateX(0)'
        }, 300);
    })
    btnCLose.addEventListener('click', () => {
        menu.style.transform = 'translateX(-10000px)'
        setTimeout(() => {
            shadowBlock.style.display = 'none'
        }, 300);
    })
    shadowBlock.addEventListener('click', ({target}) => {
        if (target === shadowBlock) {
            menu.style.transform = 'translateX(-10000px)'
            setTimeout(() => {
                shadowBlock.style.display = 'none'
            }, 300);
        }
     
    })

}


MobileOrPortableMenuBlock()