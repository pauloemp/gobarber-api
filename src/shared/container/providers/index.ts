import { container } from 'tsyringe';

import StorageProvider from './storage/models/storage.provider';
import DiskStorageProvider from './storage/implementations/disk.implementation';

container.registerSingleton<StorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);
