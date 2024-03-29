<template>

  <v-data-table
    :headers="headers"
    :items="items"
    sort-by="name"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Admin - Manage Users</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>

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
                  md="40"
                >
                <validation-provider
                v-slot="{ errors }"
                name="User Name"
                rules="required|max:10"
              >

                  <v-text-field
                    v-model="editedItem.userName"
                    label="User Name"
                    :counter="10"
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
              name="IsAdmin"
              rules="required"
            >
            <v-select
            v-model="editedItem.isAdmin"
            :items="truefalse"
            label="IsAdmin"
            :error-messages="errors"
            required
            data-vv-name="IsAdmin"
          ></v-select>
              </validation-provider>
              </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click="clear"
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
              New User
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
                  md="40"
                >
                <validation-provider
                v-slot="{ errors }"
                name="User Name"
                rules="required|max:10"
              >
                  <v-text-field
                    v-model="editedItem.userName"
                    label="User Name"
                    :counter="10"
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
              name="IsAdmin"
              rules="required"
            >
                <v-select
                  v-model="editedItem.isAdmin"
                  :items="truefalse"
                  label="IsAdmin"
                  :error-messages="errors"
                  required
                  data-vv-name="IsAdmin"
                ></v-select>
              </validation-provider>
              </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="clear"
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
            <v-card-title class="headline">Are you sure you want to delete this user?</v-card-title>
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
        @click="initialized"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import axios from "axios";
import { required, digits, max, min, regex, numeric } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode, validate } from 'vee-validate'

  setInteractionMode('eager')

  extend('digits', {
    ...digits,
    message: 'Only 0 (Admin) and 1 (NonAdmin)',
  })

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
    message: 'Needs to be a #',
  })

  extend('min', {
    ...min,
    message: '{_field_} may not be less than {length} characters',
  })

  extend('regex', {
    ...regex,
    message: 'Only 0 (Admin) and 1 (NonAdmin)',
  })

  extend('digits_between', {
  async validate(value, { min, max }) {
        const res = await validate("editedItem.userName", `numeric|min:${min}|max:${max}`,)
            return res.valid;
  },
  params: ['min', 'max'],
  message: 'The {_field_} must be between {min} and {max} digits'
});


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
          text: 'Username',
          align: 'start',
          sortable: true,
          value: 'userName',
        },
        { text: 'Admin?', value: 'isAdmin' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      items: [],
      truefalse: ['Yes','No'], 
      editedIndex: -1,
      editedItem: {
        userName: '',
        isAdmin: '',
      },
      defaultItem: {
        userName: '',
        isAdmin: '',
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
      this.getUsers()
    },
    methods: {
      async getUsers() {
        try {
          const response = await axios.get("http://flip1.engr.oregonstate.edu:3344/userList"); //http://flip1.engr.oregonstate.edu:3344
          this.items = response.data;
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
          await axios.post("http://flip1.engr.oregonstate.edu:3344/userList", { //http://flip1.engr.oregonstate.edu:3344/userList
            userName: this.editedItem.userName,
            isAdmin: this.editedItem.isAdmin
          });
          this.userName = "";
          this.isAdmin = "";
          this.items.push(this.editedItem)
          this.close()
        } catch (err) {
          console.log(err);
        }
        },
      async deleteSql () {
          try {
            await axios.post("http://flip1.engr.oregonstate.edu:3344/deleteUser", { //http://flip1.engr.oregonstate.edu:3344/userList
              userName: this.editedItem.userName,
              isAdmin: this.editedItem.isAdmin
            });
          } catch (err) {
            console.log(err);
          }
          },
      async updateSql () {
          this.items.splice(this.editedIndex, 1)
          try {
            await axios.post("http://flip1.engr.oregonstate.edu:3344/updateUser", { //http://flip1.engr.oregonstate.edu:3344/userList
                userName: this.editedItem.userName,
                isAdmin: this.editedItem.isAdmin,
                origUserName: this.origItem.userName
                });
              this.userName = "";
              this.isAdmin = "";
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
        this.userName = "";
        this.isAdmin = "";
        this.$refs.observer.reset()
        this.dialog = false
        this.dialogUpdate = false

      },
    },

  }
</script>