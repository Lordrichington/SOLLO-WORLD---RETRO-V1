import {injectable} from 'inversify'

import IRoomManager from './IRoomManager'
import RoomScene from './RoomScene'
import RoomData from './data/RoomData'
import Room from './Room'
import SolloContainer from '../injectors/SolloContainer'
import Sollo from '../Sollo'

@injectable()
export default class RoomManager implements IRoomManager {

	private currentRoom: RoomScene

	public leaveRoom(): void {
	}

	public setRoom(room: RoomScene): void {
		this.currentRoom = room

		const game = HabboContainer.get(Sollo)
		game.loadRoom(this.currentRoom)
	}

	public createRoom(roomData: RoomData): RoomScene {
		const game = HabboContainer.get(Sollo)

		return new Room(roomData, game)
	}

}
