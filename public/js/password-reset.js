$('#setPass').on('submit', function () {
    var formData = $(this).serialize()
    $.ajax({
        type: "put",
        url: "/users/password",
        data: formData,
        success: function () {
            // console.log(response.message);
            location.href = '/admin/login.html'
        },
        error: function (res) {
            // console.log(JSON.parse(res.responseText).message);
            $('#errMsg').html('<strong>错误！</strong>' + JSON.parse(res.responseText).message)
            $('#errMsg').css({'display': 'block'})
        }
    })
    return false
})