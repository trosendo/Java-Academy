var book1 = {
    name: "O Nome do Vento",
    img: "resources/img1.jpg",
    author: "Patrick Rothfuss",
    description: "Da infância como membro de uma família unida de nómadas Edema Ruh até à provação dos primeiros dias como aluno de magia numa universidade prestigiada, o humilde estalajadeiro Kvothe relata a história de como um rapaz desfavorecido pelo destino se torna um herói, um bardo, um mago e uma lenda. O primeiro romance de Rothfuss lança uma trilogia relatando não apenas a história da Humanidade, mas também a história de um mundo ameaçado por um mal cuja existência nega de forma desesperada. O autor explora o desenvolvimento de uma personalidade enquanto examina a relação entre a lenda e a sua verdade, a verdade que reside no coração das histórias. Contada de forma elegante e enriquecida com vislumbres de histórias futuras, esta \"autobiografia\" de um herói rica em detalhes é altamente recomendada para bibliotecas de qualquer tamanho.",
    opinion: "",
    links: [
        {
            url: "https://pt.wikipedia.org/wiki/O_Nome_do_Vento", 
            name: "Wikipedia"
        },
        {
            url: "https://www.fnac.pt/O-Nome-do-Vento-Patrick-Rothfuss/a265597#", 
            name: "Fnac"
        },
        {
            url: "https://www.wook.pt/livro/o-nome-do-vento-patrick-rothfuss/2145200", 
            name: "Wook"    
        },
        {
            url: "https://google.com",
            name: "outros"
        }
    ]
};
var book2 = {
    name: "The Road",
    img: "resources/img2.jpg",
    author: "Cormac McCarthy",
    description: "A father and his son walk alone through burned America. Nothing moves in the ravaged landscape save the ash on the wind. It is cold enough to crack stones, and when the snow falls it is gray. The sky is dark. Their destination is the coast, although they don’t know what, if anything, awaits them there. They have nothing; just a pistol to defend themselves against the lawless bands that stalk the road, the clothes they are wearing, a cart of scavenged food—and each other.",
    opinion: "",
    links: [
        {
            url: "https://pt.wikipedia.org/wiki/A_Estrada_(livro)", 
            text: "Wikipedia"
        },
        {
            url: "https://www.fnac.pt/A-Estrada-Cormac-McCarthy/a297658#", 
            name: "Fnac"
        },
        {
            url: "https://www.wook.pt/livro/a-estrada-cormac-mccarthy/194209", 
            name: "Wook"    
        },
        {
            url: "https://google.com",
            name: "outros"
        }
    ]
};
var book3 = {
    name: "Release",
    img: "resources/img3.jpg",
    author: "Patrick Ness",
    description: "Adam Thorn is having what will turn out to be the most unsettling, difficult day of his life, with relationships fracturing, a harrowing incident at work, and a showdown between this gay teen and his preacher father that changes everything. It's a day of confrontation, running, sex, love, heartbreak, and maybe, just maybe, hope. He won't come out of it unchanged. And all the while, lurking at the edges of the story, something extraordinary and unsettling is on a collision course.",
    opinion: "",
    links: [
        {
            url: "https://pt.wikipedia.org/wiki/Patrick_Ness", 
            text: "Wikipedia"
        },
        {
            url: "https://www.fnac.pt/Release/a1100006#", 
            name: "Fnac"
        },
        {
            url: "https://www.wook.pt/autor/patrick-ness/115075", 
            name: "Wook"    
        },
        {
            url: "https://google.com",
            name: "outros"
        }
    ]
};

class Library{
    constructor(){
        this.books = [book1, book2, book3];
        this.seenBooks = [];
        this.loadNext();
        // this.currentBook = 0;
        // this.totalBooks = 3;
    }
    loadBook(book){
        $(".book img").attr("src", book.img);
        $(".book h1").text(book.name);
        $(".book h4").text(book.author);
        $(".book p").text(book.description);
        var $links = $(".book a");
        for(var i = 0; i < 4; i++){
            $links.eq(i).text(book.links[i].name);
            $links.eq(i).attr("href", book.links[i].url);
        }
        this.seenBooks.push(this.books.splice(0, 1)[0]);
    }
    loadNext(opinion){
        // var i = this.nextIndex();
        // console.log(i);
        if(this.books[0] == undefined){
            return -1;
        }
        if(opinion != undefined){
            this.books[0].opinion = opinion;
        }
        this.loadBook(this.books[0]);
        return 0;
    }
    reset(){
        for(var i = 0; i < this.seenBooks.length; i++){
            this.books.push(this.seenBooks[i]);
        }
        this.seenBooks = [];
        this.books.forEach(function(value, index){
            console.log(value);
        });
    }
    addBook(book){
        this.books.push(book);
        this.totalBooks++;
    }
}

var library = new Library();




// var opinions = [];
var likes = "";
var dislikes = "";

// this event listener handles the stats output
$("button.like-dislike").click(function () {
    var opinion = $(this).attr("data-Opinion");
    if(opinion == "like"){
        likes += " - " + $(".book h1.title").text() + "<br>";
        $("label#likes").html(likes);
    }
    else {
        dislikes += " - " + $(".book h1.title").text() + "<br>";
        $("label#dislikes").html(dislikes);
    }
    // console.log(opinions[book_count++]);
    if(library.loadNext(opinion) == -1){
        $(".book").addClass("inactive");
        $(".stats").removeClass("inactive");
    }
});

$("button.reset").click(function() {
    library.reset();
    library.loadNext();
    $(".stats").addClass("inactive");
    $(".book").removeClass("inactive");
    likes = "";
    dislikes = "";
    $("label").text("None");
});

//  event listener to fade out a book's entire div when like/dislike is clicked
// $("button.like-dislike").click(function(){
//     $current = $("div.active").removeClass("active");
    
//     $next = $current.next();
//     if($next.length == 0){
//         $next = $(".book:first-of-type");
//     }
    
//     $next.addClass("active");
// });
