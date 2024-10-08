import { readFile, writeFile } from 'node:fs/promises';

import { Injectable } from '@nestjs/common';

@Injectable()
export class FsService {
  constructor() {}

  async readFile<T>(path: string): Promise<T> {
    const buffer = await readFile(path);
    return JSON.parse(buffer.toString());
  }

  async writeFile(path: string, data: string): Promise<void> {
    await writeFile(path, data);
  }
}
