$('#userForm').on('submit', function () {
    var formData = $(this).serialize()
    $.ajax({
        type: "post",
        url: "/users",
        data: formData,
        success: function (response) {
            location.reload()
        },
        error: function (err) {
            var res = JSON.parse(err.responseText)
            alert(res.message)
        }
    });
    return false
})

$('#modifyBox').on('change', '#avatar', function () {
    var formData = new FormData()
    formData.append('avatar', this.files[0])
    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            // console.log(response);
            $('#preview').attr('src', response[0].avatar)
            $('#hiddenAvatar').val(response[0].avatar)
        }
    });
})

$.ajax({
    type: "get",
    url: "/users",
    success: function (response) {
        // console.log(response);
        var html = template('userTpl', { data: response })
        $('#tbodyBox').html(html)
    }
});

$('#tbodyBox').on('click', '.edit', function () {
    var id = $(this).attr('data-id')
    console.log(id);
    $.ajax({
        type: "get",
        url: "/users/" + id,
        success: function (response) {
            // console.log(response);
            var html = template('modifyTpl', response)
            // console.log(html);
            $('#modifyBox').html(html)
        }
    });
})

$('#modifyBox').on('submit', '#modifyForm', function () {
    var formData = $(this).serialize()
    var id = $(this).attr('data-id')
    // console.log(formData);
    // console.log(id);
    
    $.ajax({
        type: "put",
        url: "/users/" + id,
        data: formData,
        success: function (response) {
            location.reload()
        }
    });
    return false
}) 

$('#tbodyBox').on('click', '.delete', function () {
    // alert($(this).attr('data-id'))
    var id = $(this).attr('data-id')
    $.ajax({
        type: "delete",
        url: "/users/" + id,
        success: function (response) {
            location.reload()
        }
    });
})