//import throttle from 'lodash-es/throttle';

// let accumulation = 0;
let prevPos = 0;
let isScrollingUp = false;

const root = document.documentelement;

function flip(attr , state, listenerArray) {
  listenerArray.map(x => {
    x.setAttribute(`data-${attr}`, `${state}`);
  });
}

function scrollHandler(listenerArray) {
  const pos = window.scrollY;
  const delta = pos - prevPos;

  const scrollDirection = Math.sign(delta) === -1;
  const isBottom = pos + window.innerHeight > document.body.offsetHeight - 100;
  const isTop = pos < 50;

  if (delta < -15 || delta > 15) {
    isScrollingUp = scrollDirection;
  }
  // console.log({ accumulation, delta });

  flip('is-scrolling-up', isScrollingUp, listenerArray);
  flip('is-bottom', isBottom, listenerArray);
  flip('is-top', isTop, listenerArray);

  prevPos = pos;
  // console.log({ pos });
}

document.addEventListener(
  'scroll',
  () => {
    let arr = document.querySelectorAll('.scrollobserver');
    scrollHandler([...arr])
  }
  //throttle(() => scrollHandler(), 100),
  //{ passive: true },
);

window.addEventListener('load', () => {
  // console.log({ event });
  const windowHeight = window.innerHeight;
  const documentHeight = document.body.getBoundingClientRect().height;
  // console.log({ documentHeight, windowHeight });
  let arr = document.querySelectorAll('.scrollobserver');

  if (documentHeight / windowHeight > 2) {
    flip('has-scroll', true, [...arr]);
  } else {
    flip('has-scroll', false, [...arr]);
  }
});
