<template>
  <div class="q-ma-md">
		<!-- <q-btn @click="agrupaSuma">Agrupa i Suma</q-btn> -->
    <pre>
			Registres inventari Farhos: {{ invF.length }}

			Registres inventari Kardex (3 armaris): {{ invK.length }}
			Registres inventari Kardex agrupats i sumats: {{ Object.keys(objInventariKardexAgrupaSuma).length }}

<!-- 
			Inventari Kardex amb productes agrupats i sumats:
			<span v-for="(obj, index) in arrInventariKardexAgrupaSuma" :key="index">
				Codi: {{obj.CodiKARDEX}}    Armaris: {{ obj.Armaris.toString() }}    Unitats sumades: {{ obj.UnitatsKARDEX }} <br/>
			</span>
 -->
			<!-- suma uts diferencia: {{ sumaDiferencia }} -->
		</pre>

    <q-table
      title="Diferències entre KARDEX i FARHOS"
      :data="arrComparacio"
      :columns="columns"
      :row-key="row => row.id"
      separator="cell"
      dense
      :rows-per-page-options="[0]"
			:filter="filtreFK"
    >
		  <template v-slot:top>
				<div class="text-h6">Diferències entre FARHOS i KARDEX</div>
				<q-space />
				<q-checkbox v-model="valorDiferentDeZero" label="DIF <> 0"/>
        <q-input dense debounce="300" color="primary" v-model="filtreFK" class="q-ml-xl">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    </q-table>


  </div>
</template>

<script>
export default {
  data() {
    return {
			filtreFK: null,
			valorDiferentDeZero: false,
      columns: [
        {
          name: "codi",
          align: "left",
          label: "CODI",
          field: "codi",
          sortable: true,
          headerClasses: "bg-blue-10 text-white"
        },
        {
          name: "descripcio",
          align: "left",
          label: "DESCRIPCIO",
          field: "descripcio",
          sortable: true,
          headerClasses: "bg-blue-10 text-white"
        },
        { name: 'armaris', align: 'center', label: 'ARMARIS', field: 'armaris', sortable: true, headerClasses: "bg-blue-10 text-white" },
				
				{ name: 'unitatsK', align: 'center', label: 'Uts KARDEX', field: 'unitatsK', sortable: true, headerClasses: "bg-blue-10 text-white" },
				
				{ name: 'unitatsF', align: 'center', label: 'Uts FARHOS', field: 'unitatsF', sortable: true, headerClasses: "bg-blue-10 text-white" },
				
				{ name: 'diferencia', align: 'center', label: 'DIF. (F - K)', field: 'diferencia', sortable: true, headerClasses: "bg-blue-10 text-white" },
				
				// {
        //   name: "Recuento",
        //   align: "center",
        //   label: "RECUENTO",
        //   field: "Recuento",
        //   sortable: true,
        //   headerClasses: "bg-blue-10 text-white"
        // },
        // {
        //   name: "Valor",
        //   align: "center",
        //   label: "VALOR",
        //   field: "Valor",
        //   sortable: true,
        //   headerClasses: "bg-blue-10 text-white"
        // }
      ]

		};
  },

  methods: {
/* 
		agrupaSuma: function() {
      // debugger
      var arr = this.invK.slice(0);
			console.log(arr)

      var objResult = arr.reduce(function (objAnterior, objActual, index, array) {
				// construeix un objecte del tipus:
				// {numeroId:{ CodiKARDEX: string, DescripcioKARDEX: string, UnitatsKARDEX: number, Armari:number, Armaris: number }}
				var id = objAnterior[objActual.codiKARDEX];
        if (id) {
					id.UnitatsKARDEX += objActual.UnitatsKARDEX;
					id.Armaris.push( objActual.Armari )
        } else {
          objAnterior[objActual.CodiKARDEX] = objActual;
          objAnterior[objActual.CodiKARDEX].Armaris = [objActual.Armari];
          // delete objActual.codiKARDEX;
        }
        return objAnterior;
      }, {});

      console.log("objResult");
      console.log(objResult);
      return objResult;
		}
 */		

  },


  computed: {
    invF: function() {
      return this.$store.state.modulInventari.inventari_Farhos.map(
        (val, index) => ({ ...val, indice: index })
      );
    },
    invK: function() {
      return this.$store.getters["modulInventari/inventariKARDEX"].map(
        (val, index) => ({ ...val, id: index })
      );
		},


		objInventariKardexAgrupaSuma: function() {
      return this.$store.getters["modulInventari/objInventariKARDEX_UnicProducte_QuantitatsSumades"];
		},

/* 
		arrInventariKardexAgrupaSuma: function () {
			let arrCodis = Object.keys( this. objInventariKardexAgrupaSuma )

			// let arrCodisFiltrats = arrCodis.filter( function ( codi ) {
			// 	if ( this.objInventariKardexAgrupaSuma[codi].Armaris.length > 1 )
			// 		return codi
			// }, this)

			return arrCodis.map (function (codi) {
				return this.objInventariKardexAgrupaSuma[codi]
			}, this)
		},
*/

		objInventariFARHOS: function() {
      return this.$store.getters["modulInventari/objInventariFARHOS"];
		},

		arrComparacio: function () {
			return this.$store.getters["modulInventari/arrComparacioKARDEX_FARHOS"].filter( function(obj) {
				if (this.valorDiferentDeZero){
					if (parseInt(obj.diferencia) != 0) {
						return obj
					}
				} else {
					return obj
				}
			}, this)
		},

		sumaDiferencia: function () {
			return this.arrComparacio.reduce(function(ultimResultat, objActual, index, arr){
				if ( Number.isNaN(objActual.diferencia)) {
					console.log("Valor Diferencia NaN. Codi: " + objActual.codi)
				}else{
					return parseInt(ultimResultat) + parseInt(objActual.diferencia)
				}			
			}, 0)
		}


  }
};
</script>

<style>
</style>