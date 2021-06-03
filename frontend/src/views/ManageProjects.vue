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

          <validation-observer
          ref="observer"
          v-slot="{ invalid }"
        >
          <form @submit.prevent="submit">

          <v-card-text>
            <v-container>
              <v-row>
                <v-col
                cols="12"
                sm="6"
                md="400"
              >
              <validation-provider
              v-slot="{ errors }"
              name="Project Name"
              rules="required|max:25"
            >
                  <v-text-field
                    v-model="editedItem.projectName"
                    label="Project Name"
                    :counter="25"
                    :error-messages="errors"
                    required
                  ></v-text-field>
                </validation-provider>
                </v-col>
                <v-col
                cols="12"
                sm="6"
                md="400"
              >
              <validation-provider
              v-slot="{ errors }"
              name="marketCap"
              rules="required|numeric|max:12"
            >
                  <v-text-field
                    v-model="editedItem.marketCap"
                    label="marketCap"
                    :counter="12"
                    :error-messages="errors"
                    required
                  ></v-text-field>
                </validation-provider>

                </v-col>
                
                <v-col
                class="d-flex"
                cols="12"
                sm="6"
              >
              <validation-provider
              v-slot="{ errors }"
              name="blockchainName"
              rules="required"
            >
                <v-select
                  :items="blockchain_items"
                  item-text="blockchainName"
                  item-value="blockchainID"
                  v-model="editedItem.blockchainName"
                  label="blockchainName"
                  :error-messages="errors"
                  required
                ></v-select>
              </validation-provider>
              </v-col>
              <v-col
              class="d-flex"
              cols="12"
              sm="6"
            >
            <validation-provider
            v-slot="{ errors }"
            name="blockchainName"
            rules="required"
          >
              <v-select
                :items="category_items"
                item-text="categoryName"
                item-value="categoryID"
                v-model="editedItem.categoryName"
                label="categoryName"
                :error-messages="errors"
                required
              ></v-select>
            </validation-provider>
            </v-col>
            <v-col
            cols="12"
            sm="6"
            md="400"
          >
          <validation-provider
          v-slot="{ errors }"
          name="description"
          rules="required|max:100"
        >
                  <v-text-field
                    v-model="editedItem.description"
                    label="description"
                    :counter="100"
                    :error-messages="errors"
                    required
                  ></v-text-field>
                </validation-provider>

                </v-col>
              <validation-provider
              v-slot="{ errors }"
              name="marketCap"
              rules="required|numeric|max:4"
            >
                <v-col
                  cols="24"
                  sm="12"
                  md="400"
                >
                <v-text-field
                v-model="editedItem.inceptionDate"
                label="Creation Year (YYYY)"
                :counter="4"
                :error-messages="errors"
                required
              ></v-text-field>
                </v-col>
              </validation-provider>

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
              class="mr-4"
              type="submit"
              :disabled="invalid"
            >
              Update
            </v-btn>
          </v-card-actions>
        </form>
      </validation-observer>
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

            <validation-observer
            ref="observer"
            v-slot="{ invalid }"
          >
            <form @submit.prevent="submit">

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                  cols="12"
                  sm="6"
                  md="400"
                >
                <validation-provider
                v-slot="{ errors }"
                name="Project Name"
                rules="required|max:25"
              >
                    <v-text-field
                      v-model="editedItem.projectName"
                      label="Project Name"
                      :counter="25"
                      :error-messages="errors"
                      required
                    ></v-text-field>
                  </validation-provider>
                  </v-col>
                  <v-col
                  cols="12"
                  sm="6"
                  md="400"
                >
                <validation-provider
                v-slot="{ errors }"
                name="Market Cap"
                rules="required|numeric|max:12"
              >
                    <v-text-field
                      v-model="editedItem.marketCap"
                      label="Market Cap"
                      :counter="12"
                      :error-messages="errors"
                      required
                    ></v-text-field>
                  </validation-provider>
  
                  </v-col>
                  
                  <v-col
                  class="d-flex"
                  cols="12"
                  sm="6"
                >
                <validation-provider
                v-slot="{ errors }"
                name="blockchainName"
                rules="required"
              >
                  <v-select
                    :items="blockchain_items"
                    item-text="blockchainName"
                    item-value="blockchainID"
                    v-model="editedItem.blockchainName"
                    label="blockchainName"
                    :error-messages="errors"
                    required
                  ></v-select>
                </validation-provider>
                </v-col>
                <v-col
                class="d-flex"
                cols="12"
                sm="6"
              >
              <validation-provider
              v-slot="{ errors }"
              name= "CategoryName"
              rules="required"
            >
                <v-select
                  :items="category_items"
                  item-text="categoryName"
                  item-value="categoryID"
                  v-model="editedItem.categoryName"
                  label="CategoryName"
                  :error-messages="errors"
                  required
                ></v-select>
              </validation-provider>
              </v-col>
              <v-col
              cols="12"
              sm="6"
              md="400"
            >
            <validation-provider
            v-slot="{ errors }"
            name="description"
            rules="required|max:100"
          >
                    <v-text-field
                      v-model="editedItem.description"
                      label="description"
                      :counter="100"
                      :error-messages="errors"
                      required
                    ></v-text-field>
                  </validation-provider>

                  </v-col>
                <validation-provider
                v-slot="{ errors }"
                name="Creation Year (YYYY)"
                rules="required|numeric|max:4"
              >
                  <v-col
                    cols="24"
                    sm="12"
                    md="400"
                  >
                  <v-text-field
                  v-model="editedItem.inceptionDate"
                  label="Creation Year (YYYY)"
                  :counter="4"
                  :error-messages="errors"
                  required
                ></v-text-field>
                  </v-col>
                </validation-provider>

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
                class="mr-4"
                type="submit"
                :disabled="invalid"
              >
                Save
              </v-btn>
            </v-card-actions>
          </form>
        </validation-observer>
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
import { required, max, numeric } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

  setInteractionMode('eager')

  extend('required', {
    ...required,
    message: '{_field_} can not be empty',
  })

  extend('max', {
    ...max,
    message: '{_field_} may not be greater than {length} characters',
  })

  extend('numeric', {
    ...numeric,
    message: 'Can only be a number',
  })

  export default {
    components: {
      ValidationProvider,
      ValidationObserver,
    },
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
          const response = await axios.get("http://localhost:3344/projectList"); //http://localhost:3344/projectList
          this.items = response.data;
        } catch (err) {
          console.log(err);
        }
      },
      async getBlockchains() {
        try {
          const response = await axios.get("http://localhost:3344/blockchainList"); //http://localhost:3344/blockchainList
          this.blockchain_items = response.data;
        } catch (err) {
          console.log(err);
        }
      },
      async getCategories() {
        try {
          const response = await axios.get("http://localhost:3344/categoryList"); //http://localhost:3344/categoryList
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
              await axios.post("http://localhost:3344/projectList", { //http://flip1.engr.oregonstate.edu:3344
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
          await axios.post("http://localhost:3344/deleteProject", { //http://localhost:3344/userList
            projectName: this.editedItem.projectName
          });
        } catch (err) {
          console.log(err);
        }
        },
      async updateSql () {
        this.items.splice(this.editedIndex, 1)
        try {
          await axios.post("http://localhost:3344/updateProject", { //http://localhost:3344/userList
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
      submit () {
        this.$refs.observer.validate()
      },
      clear () {
        this.projectName = "";
        this.marketCap = "";
        this.blockchainID = "";
        this.categoryName = "";
        this.description = "";
        this.inceptionDate = "";
        this.$refs.observer.reset()
      },
    },
  }
</script>