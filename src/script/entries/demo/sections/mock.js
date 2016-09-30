import { updateAndSet } from '../utils';

const mockBar = document.getElementById('mock-bar');
const setMock = document.getElementById('mock-set');
const mockMarkup = document.getElementById('mock-markup');
const changeMock = (e) => {
  const attr = 'data-mock';
  updateAndSet(e.target, attr, mockMarkup);
}


setMock.addEventListener('input', changeMock);
