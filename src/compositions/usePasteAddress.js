import { provide } from 'vue';

export default function (getAddress, setFieldValue) {
  provide('pasteAddress', () => {
    const { city, street, house, flat } = getAddress();
    setFieldValue('documents_obtaining.mailing_address.city', city);
    setFieldValue('documents_obtaining.mailing_address.street', street);
    setFieldValue('documents_obtaining.mailing_address.house', house);
    setFieldValue('documents_obtaining.mailing_address.flat', flat);
  });
}
