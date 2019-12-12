$('#addClass').on('submit', function () {
    var formData = $(this).serialize()
    $.ajax({
        type: "post",
        url: "/categories",
        data: formData,
        success: function (response) {
            console.log(response);
        }
    });
    return false
})

$.ajax({
    type: "get",
    url: "/categories",
    success: function (response) {
        // console.log(response);
        
        var html = template('listTpl', {data: response})
        // console.log(html);
        
        $('#classList').html(html)
    }
});