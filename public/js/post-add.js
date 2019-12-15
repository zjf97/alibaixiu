$.ajax({
    type: "get",
    url: "/categories",
    success: function (response) {
        var html = template('postTpl', { data: response })
        // console.log(html);

        $('#category').html(html)
    }
});

$('#parentBox').on('change', '#feature', function () {
    var file = this.files[0]
    var formData = new FormData()
    formData.append('cover', file)
    $.ajax({
        type: "post",
        url: "/upload",
        data: formData, processData: false,
        contentType: false,
        success: function (response) {
            // console.log(response);
            $('#thumbnail').val(response[0].cover)
            $('#pic').prop('src', response[0].cover).show()
        }
    });
})

$('#addPost').on('submit', function () {
    var formData = $(this).serialize()
    console.log(formData);
    $.ajax({
        type: "post",
        url: "/posts",
        data: formData,
        success: function (response) {
            console.log(response);
            location.href = '/admin/posts.html'
        }
    });
    return false
})

var id = getUrlParams('id')

if (id != -1) {
    $.ajax({
        type: "get",
        url: "/posts/" + id,
        success: function (response) {
            console.log(response);
            
            $.ajax({
                type: "get",
                url: "/categories",
                success: function (categories) {
                    console.log(categories);
                    
                    response.categories = categories
                    console.log(response);
                    
                    var html = template('modifyTpl', response)
                    $('#parentBox').html(html)
                }
            });
        }
    });
}

$('#parentBox').on('submit', '#editPost', function () {  
    var id = $("#editPost").attr('data-id')
    var data = $(this).serialize()
    $.ajax({
        type: "put",
        url: "/posts/" + id,
        data: data,
        success: function (response) {
            location.href = 'posts.html'
        }
    });
    return false
})


function getUrlParams(name) {  
    var paramsAry = location.search.substr(1).split('&')
    // console.log((paramsAry));
    for (var i = 0; i < paramsAry.length; i++) {
        var tmp = paramsAry[i].split('=')
        if (tmp[0] == name) {
            return tmp[1]
        }
    }
    return -1
}