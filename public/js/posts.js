$.ajax({
    type: "get",
    url: "/posts",
    success: function (response) {
        var html = template('postTpl', { data: response.records })
        $('#postList').html(html)

        var page = template('pageTpl', { data: response })
        $('#page').html(page)
        // console.log(page);

    }
});

function formteDate(date) {
    date = new Date(date)
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}

function changePage(page) {
    $.ajax({
        type: "get",
        url: "/posts",
        data: {
            page: page
        },
        success: function (response) {
            var html = template('postTpl', { data: response.records })
            $('#postList').html(html)

            var page = template('pageTpl', { data: response })
            $('#page').html(page)
        }
    });
}

$.ajax({
    type: "get",
    url: "/categories",
    success: function (response) {
        // console.log(response);
        var html = template('categoryTpl', { data: response })
        // console.log(html);
        $('#categoryBox').html(html)
    }
});

$('#filterForm').on('submit', function () {
    var formData = $(this).serialize()
    // console.log(formData);

    $.ajax({
        type: "get",
        url: "/posts",
        data: formData,
        success: function (response) {
            var html = template('postTpl', { data: response.records })
            $('#postList').html(html)

            var page = template('pageTpl', { data: response })
            $('#page').html(page)
        }
    });

    return false
})