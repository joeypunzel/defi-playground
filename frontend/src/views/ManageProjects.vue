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
        <v-toolbar-title>Admin - Manage Project Inventory</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
        v-model="dialogUpdate"
        max-width="500px"
      >

        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col
                  cols="24"
                  sm="12"
                  md="8"
                >
                  <v-text-field
                    v-model="editedItem.projectName"
                    label="Project Name"
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="24"
                  sm="12"
                  md="8"
                >
                  <v-text-field
                    v-model="editedItem.marketCap"
                    label="marketCap"
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col
                class="d-flex"
                cols="12"
                sm="6"
              >
                <v-select
                  :items="blockchain_items"
                  item-text="blockchainName"
                  item-value="blockchainID"
                  v-model="editedItem.blockchainName"
                  label="blockchainName"
                  outlined
                ></v-select>
              </v-col>
              <v-col
              class="d-flex"
              cols="12"
              sm="6"
            >
              <v-select
                :items="category_items"
                item-text="categoryName"
                item-value="categoryID"
                v-model="editedItem.categoryName"
                label="categoryName"
                outlined
              ></v-select>
            </v-col>
                <v-col
                  cols="40"
                  sm="25"
                  md="14"
                >
                  <v-text-field
                    v-model="editedItem.description"
                    label="description"
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="24"
                  sm="12"
                  md="8"
                >
                <v-text-field
                v-model="editedItem.inceptionDate"
                label="Creation Year (YYYY)"
                outlined
              ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click="close"
            >
              Cancel
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="updateSql"
            >
              Update
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>



        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            dark
            class="mb-2"
            v-bind="attrs"
            v-on="on"
          >
            New Project
          </v-btn>
        </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="24"
                    sm="12"
                    md="8"
                  >
                    <v-text-field
                      v-model="editedItem.projectName"
                      label="Project Name"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="24"
                    sm="12"
                    md="8"
                  >
                    <v-text-field
                      v-model="editedItem.marketCap"
                      label="marketCap"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col
                  class="d-flex"
                  cols="12"
                  sm="6"
                >
                  <v-select
                    :items="blockchain_items"
                    item-text="blockchainName"
                    item-value="blockchainID"
                    v-model="editedItem.blockchainName"
                    label="blockchainName"
                    outlined
                  ></v-select>
                </v-col>
                <v-col
                class="d-flex"
                cols="12"
                sm="6"
              >
                <v-select
                  :items="category_items"
                  item-text="categoryName"
                  item-value="categoryID"
                  v-model="editedItem.categoryName"
                  label="categoryName"
                  outlined
                ></v-select>
              </v-col>
                  <v-col
                    cols="40"
                    sm="25"
                    md="14"
                  >
                    <v-text-field
                      v-model="editedItem.description"
                      label="description"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="24"
                    sm="12"
                    md="8"
                  >
                  <v-text-field
                  v-model="editedItem.inceptionDate"
                  label="Creation Year (YYYY)"
                  outlined
                ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">Are you sure you want to delete this project?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
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
      dialogUpdate: false,
      headers: [
        {
          text: 'Project (Ticker)',
          align: 'start',
          sortable: true,
          value: 'projectName',
        },
        { text: 'Mkt Cap ($B)', value: 'marketCap' },
        { text: 'Blockchain', value: 'blockchainName' },
        { text: 'Category', value: 'categoryName' },
        { text: 'Description', value: 'description' },
        { text: 'Creation Date', value: 'inceptionDate' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      items: [],
      blockchain_items: [],
      category_items: [],
      editedIndex: -1,
      editedItem: {
        projectName: '',
        marketCap: '',
        blockchainName: '',
        categoryName: '',
        description: '',
        inceptionDate: '',
      },
      defaultItem: {
        projectName: '',
        marketCap: '',
        blockchainName: '',
        categoryName: '',
        description: '',
        inceptionDate: '',
      },
    }),
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogUpdate (val) {
        val || this.closeUpdate()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },
    created () {
      this.getProjects(),
      this.getBlockchains(),
      this.getCategories()
    },

    methods: {
      async getProjects() {
        try {
          const response = await axios.get("http://flip1.engr.oregonstate.edu:3344/projectList"); //http://flip1.engr.oregonstate.edu:3344/projectList
          this.items = response.data;
        } catch (err) {
          console.log(err);
        }
      },
      async getBlockchains() {
        try {
          const response = await axios.get("http://flip1.engr.oregonstate.edu:3344/blockchainList"); //http://flip1.engr.oregonstate.edu:3344/blockchainList
          this.blockchain_items = response.data;
        } catch (err) {
          console.log(err);
        }
      },
      async getCategories() {
        try {
          const response = await axios.get("http://flip1.engr.oregonstate.edu:3344/categoryList"); //http://flip1.engr.oregonstate.edu:3344/categoryList
          this.category_items = response.data;
        } catch (err) {
          console.log(err);
        }
      },
      editItem (item) {
        this.editedIndex = this.items.indexOf(item)
        this.origItem = Object.assign({}, item)
        this.editedItem = Object.assign({}, item)
        this.dialogUpdate = true
      },
      deleteItem (item) {
        this.editedIndex = this.items.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },
      deleteItemConfirm () {
        this.items.splice(this.editedIndex, 1)
        this.deleteSql()
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
      closeUpdate () {
        this.dialogUpdate = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      async save () {

            try {
              await axios.post("http://flip1.engr.oregonstate.edu:3344/projectList", { //http://flip1.engr.oregonstate.edu:3344/projectList
                projectName: this.editedItem.projectName,
                marketCap: this.editedItem.marketCap,
                blockchainName: this.editedItem.blockchainName,
                categoryName: this.editedItem.categoryName,
                description: this.editedItem.description,
                inceptionDate: this.editedItem.inceptionDate
              });
              this.projectName = "";
              this.marketCap = "";
              this.blockchainID = "";
              this.categoryName = "";
              this.description = "";
              this.inceptionDate = "";
              //this.$router.push("/");
              this.items.push(this.editedItem)
              this.close()
            } catch (err) {
              console.log(err);
            }
      },
      async deleteSql () {
        try {
          await axios.post("http://flip1.engr.oregonstate.edu:3344/deleteProject", { //http://flip1.engr.oregonstate.edu:3344/userList
            projectName: this.editedItem.projectName
          });
        } catch (err) {
          console.log(err);
        }
        },
      async updateSql () {
        try {
          await axios.post("http://flip1.engr.oregonstate.edu:3344/updateProject", { //http://flip1.engr.oregonstate.edu:3344/userList
                origProjectName: this.origItem.projectName,
                projectName: this.editedItem.projectName,
                marketCap: this.editedItem.marketCap,
                blockchainName: this.editedItem.blockchainName,
                categoryName: this.editedItem.categoryName,
                description: this.editedItem.description,
                inceptionDate: this.editedItem.inceptionDate
              });
              this.projectName = "";
              this.marketCap = "";
              this.blockchainID = "";
              this.categoryName = "";
              this.description = "";
              this.inceptionDate = "";
              //this.$router.push("/");
              this.items.push(this.editedItem)
              this.closeUpdate()
            } catch (err) {
              console.log(err);
        }
        },
    },
  }
</script>