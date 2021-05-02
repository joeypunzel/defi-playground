<template>
  <v-data-table
    :headers="headers"
    :items="projects"
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
            New Item
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
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.projectName"
                      label="Project projectName"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.marketCap"
                      label="marketCap"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.blockchainName"
                      label="blockchainName"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.categoryName"
                      label="categoryName"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.description"
                      label="description"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                  <v-dialog
                  ref="dialog"
                  v-model="modal"
                  :return-value.sync="date"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="date"
                      label="Inception date of project"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="date"
                    scrollable
                  >
                    <v-spacer></v-spacer>
                    <v-btn
                      text
                      color="primary"
                      @click="modal = false"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.dialog.save(date)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-dialog>
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
            <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
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
  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Project (Ticker)',
          align: 'start',
          sortable: false,
          value: 'projectName',
        },
        { text: 'Mkt Cap ($B)', value: 'marketCap' },
        { text: 'Blockchain', value: 'blockchainName' },
        { text: 'Category', value: 'categoryName' },
        { text: 'Description', value: 'description' },
        { text: 'Creation Date', value: 'inceptionDate' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      projects: [],
      editedIndex: -1,
      editedItem: {
        projectName: '',
        marketCap: 0,
        blockchainName: '',
        categoryName: '',
        description: '',
        inceptionDate: '',
      },
      defaultItem: {
        projectName: '',
        marketCap: 0,
        blockchainName: '',
        categoryName: '',
        description: '',
        inceptionDate: 1/1/2020,
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
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },
    created () {
      this.initialize()
    },
    methods: {
      initialize () {
        this.projects = [
          {
            projectName: 'AAVE (AAVE)',
            marketCap: '6.2',
            blockchainName: 'Ethereum',
            categoryName: 'Lending/Borrowing',
            description: 'Lenders earn interest by providing liquidity, while borrowers collateralize crypto for loans from liquidity pools',
            inceptionDate: '9/1/2018',
          },
          {
            projectName: 'Compound (COMP)',
            marketCap: '4.4',
            blockchainName: 'Ethereum',
            categoryName: 'Lending/Borrowing',
            description: 'Establishes money markets by pooling assets together and algorithmically setting interest rates',
            inceptionDate: '6/1/2020',
          },
          {
            projectName: 'PancakeSwap (CAKE)',
            marketCap: '6.6',
            blockchainName: 'Binance Smart Chain',
            categoryName: 'Decentralized Exchange',
            description: 'Biggest Automated Market Maker based exchange in BSC.',
            inceptionDate: '9/1/2020',
          },
          {
            projectName: 'Uniswap (UNI)',
            marketCap: 22,
            blockchainName: 'Ethereum',
            categoryName: 'Decentralized Exchange',
            description: 'Swap an ERC-20 token(s) without the need of a centralized intermediary',
            inceptionDate: '11/1/2018',
          },
          {
            projectName: 'THORChain (RUNE)',
            marketCap: 4.5,
            blockchainName: 'THORChain',
            categoryName: 'Cross-chain decentralized exchange',
            description: 'Allows users to swap tokens across various Layer 1 blockchains',
            inceptionDate: '10/1/2018',
          },
        ]
      },
      editItem (item) {
        this.editedIndex = this.projects.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      deleteItem (item) {
        this.editedIndex = this.projects.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },
      deleteItemConfirm () {
        this.projects.splice(this.editedIndex, 1)
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
          Object.assign(this.projects[this.editedIndex], this.editedItem)
        } else {
          this.projects.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>