import './progrecss.styl';

class Progrecss {
  constructor(props) {
    console.info('created...');
  }
};

(function(){
  var btn = document.querySelector('button');
  var prg = document.querySelector('progress');
  var changeVal = function() {
    var val = Math.floor(Math.random() * 100) + 1;
    prg.setAttribute('value', val);
  };
  btn.addEventListener('click', changeVal);
})();

window.Progrecss = Progrecss;
