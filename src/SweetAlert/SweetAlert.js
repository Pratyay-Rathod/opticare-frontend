import Swal from 'sweetalert2';

export function showSuccessNotification() {
  Swal.fire({
    icon: 'success',
    title: 'Form Filled',
    text: 'The form has been successfully filled.',
    confirmButtonText: 'OK'
  });
}

export function showErrorNotification(errorMessage) {
  Swal.fire({
    icon: 'error',
    title: 'Error',
    text: errorMessage,
    confirmButtonText: 'OK',
    customClass: {
      popup: 'error-popup'
    }
  });
}
