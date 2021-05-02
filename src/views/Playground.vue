<template>
  <v-container fluid>
    <v-switch
      v-model="singleExpand"
      label="Expand Single Item"
    ></v-switch>
    <v-data-iterator
      :items="projects"
      item-key="name"
      :items-per-page="4"
      :single-expand="singleExpand"
      hide-default-footer
    >
      <template v-slot:default="{ items, isExpanded, expand }">
        <v-row>
          <v-col
            v-for="item in items"
            :key="item.name"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card>
              <v-card-title>
                <h4>{{ item.name }}</h4>
              </v-card-title>
              <v-switch
                :input-value="isExpanded(item)"
                :label="isExpanded(item) ? 'Expanded' : 'Closed'"
                class="pl-4 mt-0"
                @change="(v) => expand(item, v)"
              ></v-switch>
              <v-divider></v-divider>
              <v-list
                v-if="isExpanded(item)"
                dense
              >
                <v-list-item>
                  <v-list-item-content>Calories:</v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{ item.calories }}
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>Fat:</v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{ item.fat }}
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>Carbs:</v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{ item.carbs }}
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>Protein:</v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{ item.protein }}
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>Sodium:</v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{ item.sodium }}
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>Calcium:</v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{ item.calcium }}
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>Iron:</v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{ item.iron }}
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>