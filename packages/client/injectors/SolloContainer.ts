import { Container } from 'inversify'

import ISocketManager from '../communication/ISocketManager'
import SocketManager from '../communication/SocketManager'

import IEventsManager from '../communication/events/IEventsManager'
import EventsManager from '../communication/events/EventsManager'

import IRoomManager from '../rooms/IRoomManager'
import RoomManager from '../rooms/RoomManager'

import ICullManager from '../rooms/cull/ICullManager'
import CullManager from '../rooms/cull/CullManager'

import Sollo from '../Sollo'

const SolloContainer = new Container()

SolloContainer.bind<Sollo>(Sollo).toSelf().inSingletonScope()
SolloContainer.bind<ISocketManager>('ISocketManager').to(SocketManager).inSingletonScope()
SolloContainer.bind<IEventsManager>('IEventsManager').to(EventsManager).inSingletonScope()
SolloContainer.bind<IRoomManager>('IRoomManager').to(RoomManager).inSingletonScope()
SolloContainer.bind<ICullManager>('ICullManager').to(CullManager).inSingletonScope()

export default SolloContainer
