import { APP_ID, APP_NAME, run, makeAppDir, mktmp, MappedFS, CORDOVA_PLUGIN_ID } from './util';

import { runCommand } from '../src/common';
import { mkdirAsync, writeFileAsync } from '../src/util/fs';

import { join } from 'path';

describe('Update: Android', () => {
  let appDirObj;
  let appDir;
  let FS;

  beforeAll(async () => {
    // These commands are slowww...
    jest.setTimeout(20000);
    appDirObj = await makeAppDir();
    appDir = appDirObj.appDir;
    // Init in this directory so we can test add
    await run(appDir, `init "${APP_NAME}" "${APP_ID}"`);
    await run(appDir, `add android`);
    // Redundant, because add does this, but called explicitly for thoroughness
    await run(appDir, `update android`);
    FS = new MappedFS(appDir);
  });

  afterAll(() => {
    //appDirObj.cleanupCallback();
  });

  it('Should update', async () => {
  });

  it('Should install Cordova plugin JS', async () => {
    const cordovaPluginJSContent = await FS.read('android/app/src/main/assets/public/cordova_plugins.js');
    let regex = new RegExp(CORDOVA_PLUGIN_ID);
    expect(regex.test(cordovaPluginJSContent)).toBe(true);
  });

  // Other test ideas:
  // should install/copy pre-existing cordova/capacitor plugins in package.json
});