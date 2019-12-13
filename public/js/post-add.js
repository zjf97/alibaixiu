$.ajax({
    type: "get",
    url: "/categories",
    success: function (response) {
        var html = template('postTpl', { data: response })
        // console.log(html);

        $('#category').html(html)
    }
});

$('#feature').on('change', function () {
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