const form=document.getElementById("film-form");
const titleElement=document.querySelector('#title');
const directorElement=document.querySelector('#director');
const urlElement= document.querySelector('#url');
const secondCardBody= document.querySelectorAll(".card-body")[1];
const clear= document.getElementById("clear-films");

//UI Objesini başlatma:

const ui= new UI();

//storage object producting..

const storage = new Storage();
// Load all events: 

eventListeners();

function eventListeners(){
    form.addEventListener('submit', addFilm);


    document.addEventListener('DOMContentLoaded', function(){
        let films = storage.getFilmsFromStorage()
            ui.loadAllFilms(films);

    })
    secondCardBody.addEventListener("click", deleteFilm);

    clear.addEventListener("click", clearAllFilms);


    


}

function addFilm(e){
    const title= titleElement.value.trim();

    const director= directorElement.value.trim();

    const url= urlElement.value.trim();

    if( title === '' || director=== '' || url===''){

        ui.displayMessages("Tüm alanları doldurun...", "danger");
    }

    else{
        //new film
        const newFilm= new film(title,director,url);

        ui.addFilmToUI(newFilm);// adding films to UI

        storage.addFilmToStorage(newFilm);// adding films to storage
        ui.displayMessages("Yeni film başarıyla eklenmiştir...", "success");

    }

    ui.clearInputs(titleElement, urlElement, directorElement);

    e.preventDefault();


    
}

function deleteFilm(e){

    if (e.target.id === "delete-film") {
        ui.deleteFilmFromUI(e.target);
        storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);

        ui.displayMessages("Silme işlemi başarılı...","success");

    }

};

function clearAllFilms(){

    if(confirm("Hepsini silmek istediğinize emin misiniz")){

        ui.clearAllFilmsFromUI();
        storage.clearAllFilmsFromStorage();
    

    }
   
}