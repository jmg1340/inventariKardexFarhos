<template>
  <q-page class="q-ma-md">
    <!-- <q-banner
      class="bg-red text-white q-mb-lg"
    >Abans de res, eliminar tots els registres de la taula INVENTARI KARDEX</q-banner>-->

    <p>
      El fitxer obtingut de Farhos es un RTF.
      <br />1) Obrir el fitxer RTF i eliminar la 1ª capçalera i noms de camps (que la primera linea siguin dades).
      <br />2) Fer un "guardar como" del fitxer RTF i a "guardar como tipo" seleccionar "Texto sin formato". Posar-li el nom "InventariFARHOS.txt" i guardar-lo a la mateixa carpeta on esta aquest Accesss.
    </p>

    <!-- <p>Importar el fitxer "invetnariFARHOS.txt"</p> -->
    <q-file
      filled
      bottom-slots
      v-model="fitxer"
      label="Clica aqui per seleccionar fitxer"
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
        <q-btn dense label="Importar" noCaps color="negative" @click="importar" v-if="fitxer != null" />
      </template>
    </q-file>

    <pre>
			Registres: {{ dInventariFarhos.length }}
			<!-- Suma camp Totales: {{ sumaTotales }} -->
		</pre>

    <q-table
      title="Inventari FARHOS"
      :data="dInventariFarhos"
      :columns="columns"
      :row-key="row => row.id"
      separator="cell"
      dense
      :rows-per-page-options="[0]"
			:filter="filtre"
    >
		  <template v-slot:top>
				<div class="text-h6">Inventari FARHOS</div>
				<q-space />
        <q-input dense debounce="300" color="primary" v-model="filtre">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    </q-table>


  </q-page>
</template>




<script>
// import arrIF from "./provaArrayInventFarhos"

export default {
  name: "PageIndex",
  data() {
    return {
			fitxer: null,
			filtre: null,

      columns: [
        {
          name: "Espec",
          align: "left",
          label: "ESPEC",
          field: "Espec",
          sortable: true,
          headerClasses: "bg-blue-10 text-white"
        },
        {
          name: "Nombre",
          align: "left",
          label: "NOMBRE",
          field: "Nombre",
          sortable: true,
          headerClasses: "bg-blue-10 text-white"
        },
        // { name: 'Famili', align: 'left', label: 'FAMILI', field: 'Famili', sortable: true },
        // { name: 'Envases', align: 'left', label: 'ENVASES', field: 'Envases', sortable: true },
        // { name: 'Unidades', align: 'left', label: 'UNIDADES', field: 'Unidades', sortable: true },
        // { name: 'Totales', align: 'left', label: 'TOTALES', field: 'Totales', sortable: true },
        {
          name: "Totales",
          align: "center",
          label: "TOTALES",
          field: "Totales",
          sortable: true,
          headerClasses: "bg-blue-10 text-white"
        },
        {
          name: "Valor",
          align: "center",
          label: "VALOR",
          field: "Valor",
          sortable: true,
          headerClasses: "bg-blue-10 text-white"
        }
      ]
    };
  },

  methods: {
    importar: async function() {
      //console.log(this.fitxer.path);

      var arr = [];
      var arrFitxerLlegit = null;

			function readFileAsync(file) {
				return new Promise((resolve, reject) => {
					let reader = new FileReader();

					reader.onload = () => {
						resolve(reader.result);
					};
					reader.onerror = reject;

					reader.readAsText(file);
				})
			}

			try {
				arrFitxerLlegit = await readFileAsync(this.fitxer)
			} catch (error) {
				console.log("Hi ha hagut error en la lectura del fitxer txt del Farhos: " + error)
				return
			}


			// console.log("arrFitxerLlegit")
			// console.log(arrFitxerLlegit)

      var lines = arrFitxerLlegit.split("\n");
      for (var index in lines) {
        // valors = array dels valors dels camps que hi ha en una linia
        var valors = lines[index].split("\t");

				// la següent condicio equival a tenir només en compte els registres amb dades (en funcio del primer valor)
				
				console.log("linia fitxer: " + (index))

        if (
          valors[0].trim().length != 0 &&
          /^C.digo/.test(valors[0]) == false &&
          /^Espec/.test(valors[0]) == false
        ) {
					// creacio obejcte
					// console.log("codi: " + valors[0] +  "\tTotales: " +  valors[5])
          var obj = {
            Espec: valors[0],
            Nombre: valors[1],
            Famili: valors[2],
            Almacen: valors[3],
            Envases: valors[4],
            Unidades: valors[5],
            Totales: valors[6],
            Recuento: valors[7],
            Valor: valors[8]
          };

					console.log("Linia amb les següents dades:")
					console.log(obj)

					if ( obj.Unidades == undefined ){
						console.log("Unidades == undefined -> codi: " + valors[0])
						obj.Valor = obj.Envases
						obj.Totales = obj.Almacen
					
					} else if (!isNaN(obj.Almacen)) {
						// si Almacen ES numeric
						// console.log("Almacen ES numèric -> codi: " + valors[0])
            obj.Valor = obj.Totales;
            // obj.Recuento = obj.Unidades;
						obj.Totales = obj.Unidades;
						
          } else {
						obj.Totales = obj.Recuento
					}
					//console.log(obj)
					obj.Totales = obj.Totales.replace(/\./g, ''),   // eliminacio del punt (mil). P.ex.: 4.200 -> 4200

					// console.log("codi: " + obj.Espec +  "\tTotales: " +  obj.Recuento + "\n")
          arr.push(obj);
				}
				
				console.log("-------------")
      }
			// console.log("---")
			// console.log(JSON.stringify(arr))
			this.$store.commit("modulInventari/mutImportarFARHOS", arr);

    }
  },



  computed: {
    dInventariFarhos: function() {
      return this.$store.state.modulInventari.inventari_Farhos.map(
        (val, index) => ({ ...val, Espec: parseInt(val.Espec), id: index })
      );
		},

		sumaTotales: function () {
			return this.dInventariFarhos.reduce(function(ultimResultat, objActual, index, arr){
				if ( Number.isNaN(objActual.Totales)) {
					console.log("Valor TOTALES NaN. Codi: " + objActual.Espec)
				}else{
					return parseInt(ultimResultat) + parseInt(objActual.Totales)
				}			
			}, 0)
		}
		
  }
};
</script>
