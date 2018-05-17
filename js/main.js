class Library{
    constructor(){
        this.books = [];
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

