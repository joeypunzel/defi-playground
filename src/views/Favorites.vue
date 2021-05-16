<template>
  <v-data-table
    :headers="headers"
    :items="items"
    sort-by="marketCap"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>My DeFi Favorites</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
 


        <v-dialog v-model="dialogDelete" max-width="600px">
          <v-card>
            <v-card-title class="headline">Are you sure you want to delete this Favorite?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">No</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">Yes, Delete</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>

    </template>
    <template v-slot:item.actions="{ item }">
  
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
// import axios
import axios from "axios";

  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Project (Ticker)',
          align: 'start',
          sortable: true,
          value: 'projectName',
        },
        { text: 'Mkt Cap ($B)', value: 'marketCap',sortable: true },
        { text: 'Blockchain', value: 'blockchainName',sortable: true },
        { text: 'Category', value: 'categoryName',sortable: true },
        { text: 'Description', value: 'description', sortable: false },
        { text: 'Creation Date', value: 'inceptionDate',sortable: true },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      items: [],
      defaultItem: {
        projectName: '',
        marketCap: 0,
        blockchainID: '',
        categoryID: '',
        description: '',
        inceptionDate: '',
      },
    }),
    computed: {
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },
    created () {
      this.getProjects()
    },
    methods: {
      async getProjects() {
        try {
          const response = await axios.get("http://localhost:5000/projectList");
          this.items = response.data;
        } catch (err) {
          console.log(err);
        }
      },
      deleteItem (item) {
        this.editedIndex = this.favorites.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },
      deleteItemConfirm () {
        this.favorites.splice(this.editedIndex, 1)
        this.closeDelete()
      },
      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.favorites[this.editedIndex], this.editedItem)
        } else {
          this.favorites.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>