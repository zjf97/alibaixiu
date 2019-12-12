$('#exit').on('click', function () {
    var isConfirm = confirm('您真的要退出吗?')
    if (isConfirm) {
        $.ajax({
            type: "post",
            url: "/logout",
            success: function (response) {
                location.href = 'login.html'
                console.log(response.message);
            },
            error: function (response) {
                alert('退出失败')
            }
        })
    }
})