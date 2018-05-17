var book1 = {
    name: "O Nome do Vento",
    img: "resources/img1.jpg",
    author: "Patrick Rothfuss",
    description: "Da infância como membro de uma família unida de nómadas Edema Ruh até à provação dos primeiros dias como aluno de magia numa universidade prestigiada, o humilde estalajadeiro Kvothe relata a história de como um rapaz desfavorecido pelo destino se torna um herói, um bardo, um mago e uma lenda. O primeiro romance de Rothfuss lança uma trilogia relatando não apenas a história da Humanidade, mas também a história de um mundo ameaçado por um mal cuja existência nega de forma desesperada. O autor explora o desenvolvimento de uma personalidade enquanto examina a relação entre a lenda e a sua verdade, a verdade que reside no coração das histórias. Contada de forma elegante e enriquecida com vislumbres de histórias futuras, esta \"autobiografia\" de um herói rica em detalhes é altamente recomendada para bibliotecas de qualquer tamanho.",
    links: {
        link1: {
            url: "https://pt.wikipedia.org/wiki/O_Nome_do_Vento", 
            text: "Wikipedia"
        },
        link2: {
            url: "https://www.fnac.pt/O-Nome-do-Vento-Patrick-Rothfuss/a265597#", 
            name: "Fnac"
        },
        link3: {
            url: "https://www.wook.pt/livro/o-nome-do-vento-patrick-rothfuss/2145200", 
            name: "Wook"    
        },
        link4: {
            url: "https://google.com",
            name: "outros"
        }
    }
};
var book2 = {
    name: "The Road",
    img: "resources/img2.jpg",
    author: "Cormac McCarthy",
    description: "A father and his son walk alone through burned America. Nothing moves in the ravaged landscape save the ash on the wind. It is cold enough to crack stones, and when the snow falls it is gray. The sky is dark. Their destination is the coast, although they don’t know what, if anything, awaits them there. They have nothing; just a pistol to defend themselves against the lawless bands that stalk the road, the clothes they are wearing, a cart of scavenged food—and each other.",
    links: {
        link1: {
            url: "https://pt.wikipedia.org/wiki/A_Estrada_(livro)", 
            text: "Wikipedia"
        },
        link2: {
            url: "https://www.fnac.pt/A-Estrada-Cormac-McCarthy/a297658#", 
            name: "Fnac"
        },
        link3: {
            url: "https://www.wook.pt/livro/a-estrada-cormac-mccarthy/194209", 
            name: "Wook"    
        },
        link4: {
            url: "https://google.com",
            name: "outros"
        }
    }
};
var book3 = {
    name: "Release",
    img: "resources/img3.jpg",
    author: "Patrick Ness",
    description: "Adam Thorn is having what will turn out to be the most unsettling, difficult day of his life, with relationships fracturing, a harrowing incident at work, and a showdown between this gay teen and his preacher father that changes everything. It's a day of confrontation, running, sex, love, heartbreak, and maybe, just maybe, hope. He won't come out of it unchanged. And all the while, lurking at the edges of the story, something extraordinary and unsettling is on a collision course.",
    links: {
        link1: {
            url: "https://pt.wikipedia.org/wiki/Patrick_Ness", 
            text: "Wikipedia"
        },
        link2: {
            url: "https://www.fnac.pt/Release/a1100006#", 
            name: "Fnac"
        },
        link3: {
            url: "https://www.wook.pt/autor/patrick-ness/115075", 
            name: "Wook"    
        },
        link4: {
            url: "https://google.com",
            name: "outros"
        }
    }
};

class Library{
    constructor(){
        this.books = [book1, book2, book3];
        this.currentBook = 0;
    }
    addBook(name1, img1){
        var book = {name: name1, img: img1};
        this.books.push(book);
    }
    getNextBook(){
        return this.books[this.currentBook++].name;
    }
}

var library = new Library();
library.addBook("O Nome do Vento", "img");
console.log(library.getNextBook());





var opinions = [];
var likes = "";
var dislikes = "";
var book_count = 0;

// this event listener handles the stats output
$("button.like-dislike").click(function () {
    opinions[book_count] = $(this).attr("data-Opinion");
    if(opinions[book_count] == "like"){
        likes += " - " + $("div.active h1.title").html() + "<br>";
        $("label#likes").html(likes);
    }
    else {
        dislikes += " - " + $("div.active h1.title").html() + "<br>";
        $("label#dislikes").html(dislikes);
    }
    console.log(opinions[book_count++]);
});

//  event listener to fade out a book's entire div when like/dislike is clicked
$("button.like-dislike").click(function(){
    $current = $("div.active").removeClass("active");
    
    $next = $current.next();
    if($next.length == 0){
        $next = $(".book:first-of-type");
    }
    
    $next.addClass("active");
});

