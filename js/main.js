class Library{
    constructor(search){
        this.books = [];
        this.seenBooks = [];
        this.searchParam = search;
        this.currentIndex = 0;
        this.getBooks(this.searchParam, this.currentIndex);
    }
    getBooks(search, start_index){
        var obj = this;
        $.ajax({
            url: "https://www.googleapis.com/books/v1/volumes?q=" + search + "&startIndex=" + start_index + "&key=AIzaSyBf2jdRZ2SBVT12yzYUBkQuT-TtgvaPJTQ"
        }).done(function(data){
            if(data.totalItems == 0){
                $(".book").addClass("inactive");
                $(".stats").removeClass("inactive");
                console.log("NO BOOK AVAILABLE WITH THE FOLLOWING SEARCH: \"" + search + "\"");
                return -1;
            }
            var book;
            for(var i = 0; i < data.items.length; i++){
                var value = data.items[i];
                book = {};
                if(value != undefined){
                    if(value.volumeInfo != undefined){
                        if(value.volumeInfo.title != undefined){
                            book.name = value.volumeInfo.title;
                        } else {
                            book.name = "TITLE NOT AVAILABLE";
                        }
                        if(value.volumeInfo.authors != undefined){
                            book.authors = value.volumeInfo.authors;
                        } else {
                            book.authors =  ["NO AUTHOR AVAILABLE"];
                        }
                        if(value.volumeInfo.imageLinks != undefined){
                            book.img = value.volumeInfo.imageLinks.thumbnail;
                        } else {
                            book.img = "resources/no_cover.png";
                        }
                        if(value.volumeInfo.description != undefined){
                            book.description = value.volumeInfo.description;
                        } else {
                            book.description = "NO DESCRIPTION AVAILABLE";
                        }
                        if(value.volumeInfo.canonicalVolumeLink != undefined){
                            book.links = [
                                {
                                    url: value.volumeInfo.canonicalVolumeLink,
                                    name: "More Info"
                                }
                            ];
                        }
                        book.opinion = "";
                    }
                }
                obj.books.push(book);
            }
            if(start_index != 0){
                $(".stats").addClass("inactive");
                $(".book").removeClass("inactive");
            }
            obj.loadNext();
        });
    }
    loadBook(book){
        $(".book img").attr("src", book.img);
        $(".book h1").text(book.name);
        var authors = book.authors[0];
        var i;
        for(i = 1; i < book.authors.length; i++){
            authors += ", " + book.authors[i];
        }
        $(".book h4").text(authors);
        $(".book p").text(book.description);
        var $links = $(".book a");
        for(i = 0; i < book.links.length; i++){
            $links.eq(i).text(book.links[i].name);
            $links.eq(i).attr("href", book.links[i].url);
        }
        this.seenBooks.push(this.books.splice(0, 1)[0]);
    }
    loadNext(opinion){
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
    }
    addBook(book){
        this.books.push(book);
        this.totalBooks++;
    }
}

var library = new Library("Harry Potter");

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
    $(".stats").addClass("inactive");
    $(".book").removeClass("inactive");
    likes = "";
    dislikes = "";
    $("label").text("None");
    var search = library.searchParam;
    library = new Library(search);
    // library.reset();
    // if(library.loadNext() != -1){
    //     $(".stats").addClass("inactive");
    //     $(".book").removeClass("inactive");
    //     likes = "";
    //     dislikes = "";
    //     $("label").text("None");
    // }
});

$(".ten-more").click(function(){
    library.currentIndex += 10;
    library.getBooks(library.searchParam, library.currentIndex);
});

$(".search").click(function(){
    $(".stats").addClass("inactive");
    $(".search-page").removeClass("inactive");
});

$("div.search-page button").click(function(){
    var search = $("#input-text").val();
    library = new Library(search);
    $(".search-page").addClass("inactive");
    $(".book").removeClass("inactive");
});