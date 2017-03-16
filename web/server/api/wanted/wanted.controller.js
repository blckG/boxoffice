import {wanted} from '../../../../lib/db';
import Emitter from '../../../../lib/events';

export function listWanted(req, res) {
  return res.status(200).send(wanted.value());
}

export async function addWanted(req, res) {
  if (!(await wanted.find({imdbId: req.body.imdbId}).value())) {
    const movie =
      await wanted.push()
      .push({
        title: req.body.title,
        quality: req.body.quality,
        imdbId: req.body.imdbId
      })
      .last()
      .write();
    Emitter.emit('scan:single', movie);
    return res.status(200).send({success: true, movie});
  }
  return res.status(200).send({success: false, error: 'Movie already in wanted list'});
}

export function removeWanted(req, res) {
  // TODO: add optiont to also remove from torrent client
  const movie = wanted.remove({imdbId: req.body.imdbId})
        .last()
        .write();
  return res.status(200).send(movie || 'Nothing matching that imdbId');
}
