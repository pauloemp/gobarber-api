import { container } from 'tsyringe';

import HashProvider from './hash/models/hash.provider';
import BCryptHashProvider from './hash/implementations/bcrypt.implementation';

container.registerSingleton<HashProvider>('HashProvider', BCryptHashProvider);
