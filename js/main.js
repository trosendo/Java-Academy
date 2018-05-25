class Library{
    constructor(search){
        this.books = [];
        this.searchedParams = {
            param: search,
            count: 1
        };
        this.searchParam = search;
        this.searchIndex = 0;
        this.bookIndex = 0;
        this.getBooks(this.searchParam, this.searchIndex);
    }
    getBooks(search, start_index){
        var obj = this;
        $.ajax({
            url: "https://www.googleapis.com/books/v1/volumes?q=" + search + "&startIndex=" + start_index + "&key=AIzaSyBf2jdRZ2SBVT12yzYUBkQuT-TtgvaPJTQ",
            beforeSend: function(){
                $("#waiting").toggle();
            }
        }).done(function(data){
            if(data.totalItems == 0 || data.items == undefined){
                alert("No book availabe with the following search: \"" + search + "\"");
                return -1;
            }else if(data.totalItems < 10){
                $("div.stats button.ten-more").prop("disabled",true);
            } else {
                $("div.stats button.ten-more").prop("disabled",false);
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
                        book.seen = false;
                    }
                }
                if(i == 0 && obj.books.length > 0 && book == obj.books[obj.books.length - 1]){
                    console.log("ERROR");
                    continue;
                }
                obj.books.push(book);
            }
            if(start_index != 0){
                $(".stats").toggle();
                $(".book").toggle();
            }
            $(".search-page").hide();
            $("#waiting").hide();
            $(".book").show();
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
        // this.books[this.currentIndex++].seen = true; NOT SEEN YET (ONLY WHEN LIKE/DISLIKE IS CLICKED)!
    }
    loadNext(){
        if(this.bookIndex >= this.books.length){
            return -1;
        }
        this.loadBook(this.books[this.bookIndex]);
        return 0;
    }
    setCurrentBookAsSeen(opinion){
        this.books[this.bookIndex].seen = true;
        this.books[this.bookIndex++].opinion = opinion;
    }
    reset(){
        for(var i = 0; i < this.books.length; i++){
            this.books[i].seen = true;
        }
        this.bookIndex = 0;
        this.loadNext();
    }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$("#input-text").val("");
var library;

var likes = "";
var dislikes = "";
var typingTimer;
var doneTypingInterval = 2000; // 2 seconds

// this event listener handles the stats output
$("button.like-dislike").click(function () {
    var opinion = $(this).attr("data-Opinion");
    var currentBook = library.books[library.bookIndex];
    if(currentBook != undefined){    
        var c = (opinion == "Like") ? "table-success" : "table-danger";
        var txt = ` <tr class="` + c + `">
                        <td>` + (library.bookIndex+1) + `</td>
                        <td><a target="_blank" href="` + currentBook.links[0].url + `">` + currentBook.name + `</a></td>
                        <td>` + opinion + `</td>
                    </tr>`;
        $("table#display tbody").append(txt);
    }
    library.setCurrentBookAsSeen(opinion);
    var nextBook = library.loadNext(); // load next book and assign the return value to variable nextBook
    if(nextBook == -1){ // end of books
        $(".book").toggle(); // hide
        $(".stats").toggle(); // show
    } 
});

$("div.stats button.reset").click(function() {
    $(".stats").toggle();
    $(".book").toggle();
    likes = "";
    dislikes = "";
    $("table#display tbody").html("");
    library.reset();
});

$("div.stats button.ten-more").click(function(){
    library.searchIndex += 10;
    library.getBooks(library.searchParam, library.searchIndex);
});

$("div.stats button.search").click(function(){
    $(".stats").toggle();
    $(".search-page").toggle();
    $("#input-text").val("");
    // likes = "";
    // dislikes = "";
    // $("table#display tbody").html("");
});

function doneTyping(){
    
}

$("div.search-page button").click(function(){
    var search = $("#input-text").val();
    if(library == undefined){
        library = new Library(search);
    } else {
        library.getBooks(search, 0);
    }
});

$("#input-text").keyup(function() {
    clearTimeout(typingTimer);
    if($(this).val().length > 2){
        typingTimer = setTimeout(function(){
            $("div.search-page button").click(); 
        }, doneTypingInterval);
    }
});
