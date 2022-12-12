import FreeSound from 'freesound-client';
import { RESPONSE_LIMIT_DEFAULT } from 'next/dist/server/api-utils';

async function main(request, response) {

  const freeSound = new FreeSound();
  freeSound.setToken(process.env.CLIENT_SECRET);
  freeSound.setClientSecrets(process.env.CLIENT_ID, process.env.CLIENT_SECRET);

  const pack = await freeSound.getPack(36925);
  const packSounds = await pack.sounds ();

response.setHeader('Cache-Control', 's-maxage=10, state-while-revalidate');

  response.json({
  titulos: packSounds,
  });
}

export default main;