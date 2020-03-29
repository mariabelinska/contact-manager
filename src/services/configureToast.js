import { toast } from 'react-toastify';

export default function configureToast() {
  toast.configure({
    position: toast.POSITION.TOP_CENTER,
    toastClassName: 'toastify',
  });
}
