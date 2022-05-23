import {Router} from 'express';
import {authControllers} from '@/controllers';

const auth = Router();

auth.post('/sign_in', authControllers.signIn);
auth.post('/sign_up', authControllers.signUp);

export {auth};
