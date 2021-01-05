export function inventariKARDEX(state) {
	return state.inventari_Kardex1.concat(state.inventari_Kardex2).concat(state.inventari_Kardex3)
}


export function objInventariKARDEX_UnicProducte_QuantitatsSumades(state, getters) {

	var arr = JSON.parse(JSON.stringify(getters.inventariKARDEX))

	var objResult = arr.reduce(function (objResultat, objActual, index, array) {
		// construeix un objecte d'objectes del tipus:
		// {CodiKARDEX:{ CodiKARDEX: string, DescripcioKARDEX: string, UnitatsKARDEX: number, Armari:number, Armaris: [] }}
		var id = objResultat[objActual.CodiKARDEX];
		if (id) {
			id.UnitatsKARDEX += objActual.UnitatsKARDEX;
			id.Armaris.push( objActual.Armari )
		} else {
			objResultat[objActual.CodiKARDEX] = objActual;
			objResultat[objActual.CodiKARDEX].Armaris = [objActual.Armari];
			// delete objActual.codiKARDEX;
		}
		return objResultat;
	}, {});

	// console.log("objResult");
	// console.log(objResult);
	return objResult;
}



/* {Espec: ', Nombre: ', Famili: ', Envases: ', Unidades: 0, Totales: 0, Recuento: 0, Valor: 0} */
export function objInventariFARHOS(state) {
	var arr = JSON.parse(JSON.stringify(state.inventari_Farhos))
	var obj = {}
	arr.forEach( function (element) {
		obj[element.Espec] = {
			Nombre: element.Nombre,
			Totales: parseInt(element.Totales),
			// Recuento: element.Recuento
		}
	})
	return obj
}



export function arrComparacioKARDEX_FARHOS (state, getters) {
	var objKdx = getters.objInventariKARDEX_UnicProducte_QuantitatsSumades
	var objFhs = getters.objInventariFARHOS
	var arrRegistres = []
	
	var arrKeysKARDEX = Object.keys(objKdx)
	var obj = {}
	arrKeysKARDEX.forEach( function (key, index) {
		if (objFhs[key]){
			// muntem el registre i l'afegim al array Registres
			arrRegistres.push({
				codi: key,
				descripcio: objKdx[key].DescripcioKARDEX,
				armaris: objKdx[key].Armaris.toString(),
				unitatsK: objKdx[key].UnitatsKARDEX,
				unitatsF: objFhs[key].Totales,
				diferencia: objFhs[key].Totales - objKdx[key].UnitatsKARDEX
			})
		}
	})
	return arrRegistres
}
