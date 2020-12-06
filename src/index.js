import init from './init';
import emitActionEvent from './emitter/emitActionEvent';
import emitCountEvent from './emitter/emitCountEvent';
import emitReqEvent from './emitter/emitReqEvent';
import emitRespEvent from './emitter/emitRespEvent';

const emitter = {
  emitActionEvent,
  emitCountEvent,
  emitReqEvent,
  emitRespEvent
}

export {
  init,
  emitter
}