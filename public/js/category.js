$('#className').on('submit', '#addClass', function () {
    var formData = $(this).serialize()
    $.ajax({
        type: "post",
        url: "/categories",
        data: formData,
        success: function (response) {
            // console.log(response);
            location.reload()
        }
    });
    return false
})

$.ajax({
    type: "get",
    url: "/categories",
    success: function (response) {
        // console.log(response);

        var html = template('listTpl', { data: response })
        // console.log(html);

        $('#classList').html(html)
    }
});

function formteDate(date) {
    date = new Date(date)
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}


$('#classList').on('click', '.edit', function () {
    var id = $(this).attr('data-id')
    $.ajax({
        type: "get",
        url: "/categories/" + id,
        success: function (response) {
            var html = template('editTpl', response)
            $('#className').html(html)
        }
    });
})

$('#className').on('submit', '#editClass', function () {
    var formData = $(this).serialize()
    var id = $(this).attr('data-id')
    $.ajax({
        type: "put",
        url: "/categories/" + id,
        data: formData,
        success: function (response) {
            location.reload()
        }
    });
    return false
})

$('#classList').on('click', '.delete', function () {
    if (confirm('您确定要删除吗?')) {
        var id = $(this).attr('data-id')
        $.ajax({
            type: "delete",
            url: "/categories/" + id,
            success: function (response) {
                location.reload()
            }
        });
    }
})

$('#cheAll').on('change', function () {
    var status = $(this).prop('checked')
    $('#classList').find('input').prop('checked', status)
    $('#deleteBtn').css({ 'display': 'block' })
    if ($('#classList').find('input').filter(':checked').length == 0) {
        $('#deleteBtn').css({ 'display': 'none' })
    }
})

$('#classList').on('change', 'input', function () {
    $('#deleteBtn').css({ 'display': 'block' })
    if ($('#classList').find('input').filter(':checked').length == $('#classList').find('input').length) {
        $('#cheAll').prop('checked', true)
    } else {
        $('#cheAll').prop('checked', false)
    }

    if ($('#classList').find('input').filter(':checked').length == 0) {
        $('#deleteBtn').css({ 'display': 'none' })
    }
})

$('#deletes').on('click', function () {
    if (confirm('您确定要删除吗?')) {
        var arr = []
        $.each($('#classList').find('input').filter(':checked'), function (index, value) {
            arr.push($(value).attr('data-id'))
        });
        var id = arr.join('-')
        console.log(id);

        $.ajax({
            type: "delete",
            url: "/categories/" + id,
            success: function (response) {
                location.reload()
            }
        });
    }
})