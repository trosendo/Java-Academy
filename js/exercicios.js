// function likeClick() {
//     alert("Like Clicked!");
// }

// function dislikeClick() {
//     alert("Dislike Clicked!");
// }


// function getMax(a, b) {
//     if (a > b) {
//         return a;
//     }
//     return b;
// }

// function getMin(a, b) {
//     if (a < b) {
//         return a;
//     }
//     return b;
// }

// function sort_three(a, b, c) {
//     var maxA_B = getMax(a, b);
//     var maxTotal = getMax(maxA_B, c);

//     var minA_B = getMin(a, b);
//     var minTotal = getMin(minA_B, c);

//     var middle = (a + b + c) - (maxTotal + minTotal);

//     console.log("Min: " + minTotal + "\nMiddle: " + middle + "\nMax: " + maxTotal);
// }

// function sort_three_v2(a, b, c) {
//     var temp;
//     if (a > b) {
//         temp = a;
//         a = b;
//         b = temp;
//     }

//     if (b > c) {
//         temp = b;
//         b = c;
//         c = temp;
//     }

//     if (a > b) {
//         temp = a;
//         a = b;
//         b = temp;
//     }

//     console.log("Min: " + a + "\nMiddle: " + b + "\nMax: " + c);
// }

// function sign(a, b, c) {
//     z = a * b * c;
//     if (z > 0) {
//         return "The sign is +";
//     }
//     return "The sign is -";
// }

// function getMaxOfFive(n1, n2, n3, n4, n5) {
//     var max1_2 = getMax(n1, n2);
//     var max3_4 = getMax(n3, n4);
//     var max12_34 = getMax(max1_2, max3_4);

//     return getMax(max12_34, n5);
// }

// $(".inactive").hide();


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
        $next = $(".book").first();
    }
    
    $next.addClass("active");
});


// $("#liv2 button").click(function () {
//     opinions[1] = $(this).attr("data-Opinion");
//     if(opinions[1] == "like"){
//         likes += $("div#liv1 h1.title").html();
//         $("label#likes").html(likes);
//     }
//     else {
//         dislikes += $("div h1.title").html();
//         $("label#disliked").html(dislikes);
//     }
//     console.log(opinions[1]);
// });
// $("#liv3 button").click(function () {
//     opinions[2] = $(this).attr("data-Opinion")
//     if(opinions[2] == "like"){
//         likes += $("div#liv1 h1.title").html();
//         $("label#likes").html(likes);
//     }
//     else {
//         dislikes += $("div h1.title").html();
//         $("label#disliked").html(dislikes);
//     }
//     console.log(opinions[2]);
// });
