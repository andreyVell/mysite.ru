const popupLinks = document.querySelectorAll(".popup-link");
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll(".lock-padding");

let unlock = true;

const timeout =300;

if (popupLinks.length > 0)
{    
    for (let index = 0; index<popupLinks.length;index++)
    {
        const popupLink = popupLinks[index];
        popupLink.addEventListener("click",function(e)
        {
            const popupName =  popupLink.getAttribute('href').replace('#','');
            const curentPopup = document.getElementById(popupName);
            popupOpen(curentPopup);
            e.preventDefault();
        });
    }
}

const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0)
{
    for (let index = 0; index<popupCloseIcon.length;index++)
    {
        const el = popupCloseIcon[index];
        el.addEventListener('click',function(e) {
            popupCloseIcon(el.closest('.popup'));
            e.preventDefault();
        });
    }
}

function popupOpen(currentPopup)
{
    
    if (currentPopup && unlock)
    {        
        const popupActive = document.querySelector(".popup.open");
        if (popupActive)
        {
            popupCloseIcon(popupActive, false);
        }        
        
        currentPopup.classList.add('open');
        currentPopup.addEventListener("click",function(e){
            if (!e.target.closest('.popup_content'))
            {
                popupClose(e.target.closest('.popup'));
            }
        });
    }
}
function popupClose(popupActive)
{
    if (unlock)
    {
        popupActive.classList.remove('open');
    }
}

document.addEventListener('keydown', function (e){
    if (e.which === 27) {
        const popupActive = document.querySelector('.popup.open');
        popupClose(popupActive);
    }
});