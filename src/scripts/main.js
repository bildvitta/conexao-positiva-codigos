import $ from 'jquery'

$(document).ready(function () {
  function updateMessage (message, status) {
    var element = $('.message')
    element.show()

    element[0].className = 'message' + (status ? ' message--' + status : '')
    element[0].innerText = message
  }

  var codeElement = $(this).find('input[name="code"]')

  codeElement.on('input', function () {
    $('.message').hide()
  })

  $('.form').on('submit', function () {
    var code = codeElement.val()

    if (code.length < 6) {
      updateMessage('O código possui 6 digitos.', 'warning')
      return false
    }

    $.ajax({
      type: 'get',
      url: this.action,
      data: { code: code },

      beforeSend: function () {
        updateMessage('Validando...')
      },

      success: function (data) {
        updateMessage(data.message, data.valid ? 'success' : 'error')
      },

      error: function () {
        updateMessage('Ops! Ocorreu um erro inesperado, verifique a sua conexão e tente novamente.', 'warning')
      }
    })

    return false
  })
})
