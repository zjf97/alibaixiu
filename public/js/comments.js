$.ajax({
    type: "get",
    url: "/comments",
    success: function (response) {
        var html = template('commentsTpl', response)
        // console.log(html);
        $('#comList').html(html)

        // var page = template('pageTpl', response)
        // $('#page').html(page)
        $('#page').twbsPagination({
            totalPages: response.pages,
            visiblePages: 5,
            first: '首页',
            prev: '上一页',
            next: '下一页',
            last: '尾页',
            onPageClick: function (event, page) {  
                changePage(page)
            }
        })
    }
});


function changePage(page) {
    $.ajax({
        type: "get",
        url: "/comments",
        data: {
            page: page
        },
        success: function (response) {
            var html = template('commentsTpl', response)
            // console.log(html);
            $('#comList').html(html)

            // var page = template('pageTpl', response)
            // $('#page').html(page)
        }
    });
}

$('#comList').on('click', '.status', function () {
    var id = $(this).attr('data-id')
    var status = $(this).attr('data-status')
    $.ajax({
        type: "put",
        url: "/comments/" + id,
        data: {
            state: status == 1 ? 0 : 1
        },
        success: function (response) {
            location.reload()
        }
    });
})

$('#comList').on('click', '.delete', function () {
    if (confirm('您真的要删除这条评论吗？')) {
        var id = $(this).attr('data-id')
        $.ajax({
            type: "delete",
            url: "/comments/" + id,
            success: function (response) {
                location.reload()
            }
        });
    }
})