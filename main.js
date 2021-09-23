//query selector variables
var grid = document.querySelector('#gridContainer');

//event listeners
grid.addEventListener('click', getBoxID);

//event handler and helper functions
function getBoxID(event){
  console.log(event.target.firstElementChild);
  event.target.firstElementChild.classList.remove('hidden');
  console.log(event.target.lastElementChild);
}git ad
