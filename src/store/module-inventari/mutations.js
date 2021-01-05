
export function mutImportarFARHOS ( state, arr ) {
	state.inventari_Farhos = []
	state.inventari_Farhos = arr.slice(0)
}
export function mutImportarKARDEX ( state, payload ) {
	state["inventari_Kardex" + payload.numArmari] = []
	state["inventari_Kardex" + payload.numArmari] = payload.arr.slice(0)
}
