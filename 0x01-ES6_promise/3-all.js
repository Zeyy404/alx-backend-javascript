/* eslint-disable */
import { uploadPhoto, createUser } from './utils';

export default function handleProfileSignup() {
  return Promise.all([uploadPhoto(), createUser()])
    .then((resolve) => {
      const [photoResponse, userResponse] = resolve;
      console.log(`${photoResponse.body} ${userResponse.firstName} ${userResponse.lastName}`);
    })
    .catch((reject) => {
      console.error('Signup system offline');
    });
}
