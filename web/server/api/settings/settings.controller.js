import {settings} from '../../../../lib/db';
import Emitter from '../../../../lib/events';

export function getSettings(req, res) {
  return res.status(200).send({success: true, settings: settings.value()});
}

export async function setSettings(req, res) {
  const s = await settings.assign(req.body).write();
  Emitter.emit('system:recon');
  return res.status(200).send({success: true, settings: s});
}
