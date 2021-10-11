import { toast } from 'react-toastify';



function sendErrorNotification(message){
  toast.error(message);
}



export default sendErrorNotification
