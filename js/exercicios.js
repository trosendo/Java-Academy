function likeClick() {
    alert("Like Clicked!");
}

function dislikeClick() {
    alert("Dislike Clicked!");
}


function getMax(a, b) {
    if (a > b) {
        return a;
    }
    return b;
}

function getMin(a, b) {
    if (a < b) {
        return a;
    }
    return b;
}

function sort_three(a, b, c) {
    var maxA_B = getMax(a, b);
    var maxTotal = getMax(maxA_B, c);

    var minA_B = getMin(a, b);
    var minTotal = getMin(minA_B, c);

    var middle = (a + b + c) - (maxTotal + minTotal);

    console.log("Min: " + minTotal + "\nMiddle: " + middle + "\nMax: " + maxTotal);
}

function sort_three_v2(a, b, c) {
    var temp;
    if (a > b) {
        temp = a;
        a = b;
        b = temp;
    }

    if (b > c) {
        temp = b;
        b = c;
        c = temp;
    }

    if (a > b) {
        temp = a;
        a = b;
        b = temp;
    }

    console.log("Min: " + a + "\nMiddle: " + b + "\nMax: " + c);
}

function sign(a, b, c) {
    z = a * b * c;
    if (z > 0) {
        return "The sign is +";
    }
    return "The sign is -";
}

function getMaxOfFive(n1, n2, n3, n4, n5) {
    var max1_2 = getMax(n1, n2);
    var max3_4 = getMax(n3, n4);
    var max12_34 = getMax(max1_2, max3_4);

    return getMax(max12_34, n5);
}


var liv1;
var liv2;
var liv3;

$("#liv1 button").click(function () {
    liv1 = $(this).attr("data-Opinion");
    console.log(liv1);
});
$("#liv2 button").click(function () {
    liv2 = $(this).attr("data-Opinion");
    console.log(liv2);
});
$("#liv3 button").click(function () {
    liv3 = $(this).attr("data-Opinion")
    console.log(liv3);
});

// event listener to fade out a book's entire div when like/dislike is clicked
// $(".btn").click(function(){
//     $(this).parents(".col-sm").fadeOut();
// });