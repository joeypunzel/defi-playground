<template>
  <v-app id="inspire">
      <v-navigation-drawer 
      v-model="drawer"
      app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Menu
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to=item.to
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Defi Playground</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    data: () => ({ 
      drawer: null, 
      items: [
          { title: 'Home', icon: 'mdi-home-variant' , to: '/' },
          { title: 'Playground', icon: 'mdi-slide' , to: '/playground' },
          { title: 'Favorites', icon: 'mdi-star-outline', to: '/favorites' },
          { title: 'Admin: Edit Projects', icon: 'mdi-database', to: '/ManageProjects' },
          { title: 'Admin: Edit Blockchains', icon: 'mdi-database', to: '/ManageBlockchains' },
          { title: 'Admin: Edit Catagories', icon: 'mdi-database', to: '/ManageCatagories' },
          { title: 'Admin: Edit Users', icon: 'mdi-database', to: '/ManageUsers' }


        ],
    }),
    
  }
</script>