const backToTop = document.getElementById('backtotop');

const checkScroll = () => {
    /*
      웹페이지가 수직으로 얼마나 스크롤되었는지를 확인하는 값(픽셀 단위로 반환)
      https://developer.mozilla.org/ko/docs/Web/API/Window/pageYOffset
      */

    let pageYOffset = window.pageYOffset;

    if (pageYOffset !== 0) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
}

const moveBackToTop = () => {
    if (window.pageYOffset > 0) {
        /*
        smooth 하게 스크롤하기
        https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollTo
        */

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }
}

window.addEventListener('scroll', checkScroll);
backToTop.addEventListener('click', moveBackToTop);



/*----------------------------------------------------------------------*/
function transformNext(event) {
    const slideNext = event.target;
    const slidePrev = slideNext.previousElementSibling;

    const classList = slideNext.parentElement.parentElement.nextElementSibling;
    let activeLi = classList.getAttribute('data-position');
    const liList = classList.getElementsByTagName('li');

    // 하나의 카드라도 왼쪽으로 이동했다면, 오른쪽으로 갈 수 있음
    if (Number(activeLi) < 0) {
        activeLi = Number(activeLi) + 260;


        //왼쪽에 있던 카드가 오른쪽으로 갔다면, 다시 왼쪽으로 갈 수 있으므로 PREV 버튼 활성화
        slidePrev.style.color = '#2f3059';
        slidePrev.classList.add('slide-prev-hover');
        slidePrev.addEventListener('click', transformPrev);

        // 맨 왼쪽에 현재 보이는 카드가, 맨 첫번쨰 카드라면, 오른쪽 즉, NEXT 로 갈 수 없으므로 NEXT 버튼 비활성화
        if (Number(activeLi) === 0) {
            slideNext.style.color = '#cfd8bc';
            slideNext.classList.add('slide-prev-hover');
            slideNext.removeEventListener('click', transformNext);
        }
    }

    classList.style.transition = 'transform 1s';
    classList.style.transform = 'translateX(' + String(activeLi) + 'px)';
    classList.setAttribute('data-position', activeLi); //data-position에 위치값 저장
}


function transformPrev(event) {
    const slidePrev = event.target;
    const slideNext = slidePrev.nextElementSibling;

    //ul 태그 선택
    const classList = slidePrev.parentElement.parentElement.nextElementSibling;
    let activeLi = classList.getAttribute('data-position');
    const liList = classList.getElementsByTagName('li');


    if (classList.clientWidth < (liList.length * 260 + Number(activeLi))) {
        //위치를 왼쪽으로 260 이동 (-260px)
        activeLi = Number(activeLi) - 260;

        slideNext.style.color = '#2f3059';
        slideNext.classList.add('slide-next-hover');
        //slideNext
        if (classList.clientWidth > (liList.length * 260 + Number(activeLi))) {
            slidePrev.style.color = '#cfd8dc';
            slidePrev.classList.remove('slide-prev-hover');
            slidePrev.removeEventListener('click', transformPrev);
        }

        slideNext.style.color = '#2f3059';
        slideNext.classList.add('slide-next-hover');
        slideNext.addEventListener('click', transformNext);
    }

    classList.style.transition = 'transform 1s';
    classList.style.transform = 'translateX(' + String(activeLi) + 'px)';
    classList.setAttribute('data-position', activeLi); //data-position에 위치값 저장

}


const slidePrevlist = document.getElementsByClassName('slide-prev');

for (let i = 0; i < slidePrevlist.length; i++) {
    // ul 태그 선택
    let classList = slidePrevlist[i].parentElement.parentElement.nextElementSibling;
    let liList = classList.getElementsByTagName('li');

    //카드가 ul 태그 너비보다 넘치면, 왼쪽(PREV) 버튼을 활성화하고, 오른쪽(NEXT)는 현재 맨 첫카드 위치이므로 비활성화
    if (classList.clientWidth < (liList.length * 269)) {
        slidePrevlist[i].classList.add('slide-prev-hover');
        slidePrevlist[i].addEventListener('click', transformPrev);
    } else {
        /*태그 삭제시, 부모 요소에서 reomoveChild 를 통해 삭제해야 함
        딱라서, 1. 먼저 부모 요소를 찾아서,
              2. 부모 요소의 자식 요소로 있는 PREV 와 NEXT 요소를 삭제함 
        */

        const arrowContainer = slidePrevlist[i].parentElement;
        arrowContainer.removeChild(slidePrevlist[i].nextElementSibling);
        arrowContainer.removeChild(slidePrevlist[i]);
    }
}