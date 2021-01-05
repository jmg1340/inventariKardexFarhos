<template>
  <q-layout view='lHh Lpr lFf'>
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon='menu'
          aria-label='Menu'
          @click='leftDrawerOpen = !leftDrawerOpen'
        />

        <q-toolbar-title>Diferències inventaris KARDEX - FARHOS</q-toolbar-title>

        <!-- <div>Quasar v{{ $q.version }}</div> -->
      </q-toolbar>
    </q-header>

    <q-drawer v-model='leftDrawerOpen' show-if-above bordered content-class='bg-grey-1'>
      <q-list>
        <q-item-label header class='text-grey-8'>Opcions</q-item-label>

        <q-item to='/importF'>
          <q-item-section avatar>
            <q-icon name='import_export' />
          </q-item-section>
          <q-item-section>Importació inventari FARHOS</q-item-section>
          <!-- <q-item-section side>Side</q-item-section> -->
        </q-item>

				<q-separator  inset />

        <q-item to='/importK'>
          <q-item-section avatar>
            <q-icon name='import_export' />
          </q-item-section>
          <q-item-section>Importació inventari KARDEX</q-item-section>
          <!-- <q-item-section side>Side</q-item-section> -->
        </q-item>

				<q-separator  inset />

        <q-item to='/comparativa'>
          <q-item-section avatar>
            <q-icon name='view_list' />
          </q-item-section>
          <q-item-section>Comparar inventaris</q-item-section>
          <!-- <q-item-section side>Side</q-item-section> -->
        </q-item>

				<q-separator  inset />

      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',

  data () {
    return {
      leftDrawerOpen: false
    }
  }
}
</script>
