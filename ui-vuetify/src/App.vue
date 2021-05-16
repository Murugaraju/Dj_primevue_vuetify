<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark

    >
     <v-app-bar-nav-icon @click.stop="drawer=!drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Dashboard</v-toolbar-title>


      <v-spacer></v-spacer>

     
    </v-app-bar>
   <v-navigation-drawer
      v-model="drawer"
    mini-variant
     app
     class="green darken-1"
    >
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/82.jpg"></v-img>
        </v-list-item-avatar>

        
      </v-list-item>

      <v-divider></v-divider>

      <v-list >
        <v-list-item
          :to="'/Dashboard/User'"
          link  
        >
         
            <v-icon class="white--text sample">{{  'mdi-home-city' }}</v-icon>
       

         
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main >
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    drawer: true,
       
  }),
};
</script>


<style lang="scss">

</style>
