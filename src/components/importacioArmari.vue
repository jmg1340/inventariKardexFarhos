<template>
  <div class="">
    <q-file
      filled
      v-model="fitxer"
      :label="'Clica aqui per seleccionar fitxer del ARMARI ' + numArmari "
      max-files="1"
      dense
    >
      <template v-slot:append>
        <q-icon
          v-if="fitxer !== null"
          name="close"
          @click.stop="fitxer = null"
          class="cursor-pointer"
        />
        <q-icon name="note_add" @click.stop />
      </template>

      <template v-slot:after>
        <q-btn v-if="fitxer != null" dense label="Importar" noCaps color="negative" @click="importar" />
        <q-btn v-if="dInventariKardex.length != 0" dense label="Mostrar" noCaps color="green-9" @click="activar = !activar" />
      </template>
    </q-file>

		<pre>
			Registres: {{ dInventariKardex.length }}
			<!-- suma UnitatsKARDEX: {{ sumaUnitatsKARDEX }} -->
			</pre>


    <q-dialog
      v-model="activar"
    >
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
					<q-table
						:title="'Inventari ARMARI ' + numArmari"
						:data="dInventariKardex"
						:columns="columns"
						:row-key="row => row.id"
						separator="cell"
						dense
						:rows-per-page-options="[0]"
					/>

        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>



  </div>
	
</template>

<script>
export default {

	props: ["numArmari"],
  data() {
    return {
			fitxer: null,
			activar: false,

      columns: [
        {
          name: "CodiKARDEX",
          align: "left",
          label: "CODI",
          field: "CodiKARDEX",
          sortable: true,
          headerClasses: "bg-blue-10 text-white"
        },
        {
          name: "DescripcioKARDEX",
          align: "left",
          label: "DESCRIPCIO",
          field: "DescripcioKARDEX",
          sortable: true,
          headerClasses: "bg-blue-10 text-white"
        },
        {
          name: "UnitatsKARDEX",
          align: "center",
          label: "UNITATS",
          field: "UnitatsKARDEX",
          sortable: true,
          headerClasses: "bg-blue-10 text-white"
        },
        {
          name: "Armari",
          align: "center",
          label: "ARMARI",
          field: "Armari",
          sortable: true,
          headerClasses: "bg-blue-10 text-white"
        },
			]

		}
	},

	methods:{
    importar: async function() {
      //console.log(this.fitxer.path);

      var arr = [];
      var arrFitxerLlegit = null;

			function readFileAsync(file) {
				return new Promise((resolve, reject) => {
					let reader = new FileReader();

					reader.addEventListener("loadend", function() {
						// reader.result contains the contents of blob as a typed array
						// we insert content of file in DOM here
						resolve(reader.result);
					});					
					
					// reader.onload = () => {
					// 	resolve(reader.result);
					// };
					
					reader.onerror = reject;

					reader.readAsText(file);
				})
			}

			try {
				arrFitxerLlegit = await readFileAsync(this.fitxer)
			} catch (error) {
				console.log("Hi ha hagut error en la lectura del fitxer txt del Farhos: " + error)
			}


			console.log("arrFitxerLlegit")
			console.log(arrFitxerLlegit)

      var lines = arrFitxerLlegit.split("\n");
      for (var index in lines) {
        // valors = array dels valors dels camps que hi ha en una linia
        var linia = lines[index]
				// console.log("LINIA: " + linia)

        // la següent condicio equival a tenir només en compte els registres amb dades (en funcio del primer valor)
        if (
          linia.trim().length != 0 &&
          /Art.culo/g.test(linia) == false
        ) {
          // creacio obejcte
          var obj = {
						CodiKARDEX: linia.substring(1, linia.indexOf("-")).trim(),
						DescripcioKARDEX: linia.substring(linia.indexOf("-")+1, 67).trim(),
            UnitatsKARDEX: parseInt(linia.substring(115).trim()),
						Armari: this.numArmari, 
          };

          arr.push(obj);
        }
      }

			this.$store.commit("modulInventari/mutImportarKARDEX", {arr: arr, numArmari: this.numArmari});

    }		
	},
  computed: {
    dInventariKardex: function() {
      return this.$store.state.modulInventari["inventari_Kardex" + this.numArmari].map(
        (val, index) => ({ ...val, id: index })
      );
		},
		sumaUnitatsKARDEX: function () {
			return this.dInventariKardex.reduce(function(ultimResultat, objActual, index, arr){
				if ( Number.isNaN(objActual.UnitatsKARDEX)) {
					console.log("Valor UnitatsKARDEX NaN. Codi: " + objActual.CodiKARDEX)
				}else{
					return parseInt(ultimResultat) + parseInt(objActual.UnitatsKARDEX)
				}			
			}, 0)
		}
		
  }

}
</script>

<style>



</style>