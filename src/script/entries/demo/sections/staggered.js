import { updateAndSet } from '../utils';

const staggeredBar = document.getElementById('staggered-bar');
const setMock = document.getElementById('staggered-set');
const staggeredMarkup = document.getElementById('staggered-markup');
const changeMock = (e) => {
  const attr = 'data-staggered-mock';
  updateAndSet(e.target, attr, staggeredMarkup);
}


setMock.addEventListener('input', changeMock);
