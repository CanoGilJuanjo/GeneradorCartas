//Carta
var openCarta = document.getElementById("generar");
var closeCarta = document.getElementById('close_carta');
var fondoCarta = document.getElementById('fondoCarta');
var  modalC = document.getElementById('carta');

function closeC(){
	modalC.style.display = "none";
	fondoCarta.style.display = "none";
}

function openC(){
	modalC.style.display = "block";
	fondoCarta.style.display = "block";
}



//Modal
var openModal = document.getElementById('open_modal');
var closeModal = document.getElementById('close_modal');
var fondoModal = document.getElementById('fondoModal');
var modal = document.getElementById('modal');

function close(){
	modal.style.display = "none";
	fondoModal.style.display = "none";
}

function open(){
	modal.style.display = "block";
	fondoModal.style.display = "block";
}

openModal.addEventListener('click', open);
openCarta.addEventListener('click', openC);
closeModal.addEventListener('click', close);
fondoModal.addEventListener('click', close);
closeCarta.addEventListener('click', closeC);
fondoCarta.addEventListener('click', closeC);