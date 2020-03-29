import { toast } from 'react-toastify';

export function configureToast() {
  toast.configure({
    position: toast.POSITION.TOP_CENTER,
    toastClassName: 'toastify',
  });
}
