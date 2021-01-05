<template>
  <q-page class="q-ma-md">
    <!-- <q-banner
      class="bg-red text-white q-mb-lg"
    >Abans de res, eliminar tots els registres de la taula INVENTARI KARDEX</q-banner>-->

    <p>
      Els fitxers obtinguts de Kardex són TXT.
      <br />A cada fitxer TXT posar-li el nom "InventariKARDEXn.TXT" sent la "n" final el numero d'armari.
    </p>

		<q-card>
			<q-card-section v-for="n in 3" :key="n">
				<cmp_importacioArmari :numArmari="n" />
			</q-card-section>
		</q-card>

		<q-card>
			<q-card-section>
				registres inventari KARDEX total: {{ dInventariKardex.length}}
			</q-card-section>
		</q-card>




  </q-page>
</template>

<script>
import cmp_importacioArmari from "../components/importacioArmari.vue"

export default {
	components: {cmp_importacioArmari},

	computed: {

		dInventariKardex: function() {
      return this.$store.getters["modulInventari/inventariKARDEX"].map(
        (val, index) => ({ ...val, id: index })
      );
		}

	}



}
</script>

<style>

</style>