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

$.ajax({
    type: 'get',
    url: '/users/' + userId,
    success: function (response) {
      //获取到相应信息后，展示在页面
      $('.avatar').attr('src', response.avatar)
      $('.profile .name').html(response.nickName)
    }
  })