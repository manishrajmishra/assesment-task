<template>
  <v-data-table
    :headers="headers"
    :items="tableData"
    class="elevation-5 pa-5 ma-15"
    hide-default-footer
  >
    <template v-slot:item.avatar="{ item }">
      <v-avatar color="indigo" class="ma-1">
        <v-icon dark>
          {{ item.avatar }}
        </v-icon>
      </v-avatar>
    </template>
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>User Records</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              Add New
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="justify-center">
              <span class="text-h5">Add New Record</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="4">
                    <v-subheader>Email</v-subheader>
                  </v-col>
                  <v-col cols="8">
                    <v-text-field
                      v-model="editedItem.email"
                      label="Email"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4">
                    <v-subheader>Full Name</v-subheader>
                  </v-col>
                  <v-col cols="8">
                    <v-text-field
                      v-model="editedItem.name"
                      label="Full Name"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="5"
                    ><v-subheader>Date of Joining</v-subheader></v-col
                  >
                  <v-col cols="7">
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
                          label="Date of Joining"
                          append-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          outlined
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="date" scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="modal = false">
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
                  <v-col cols="5"
                    ><v-subheader>Date of Leaving</v-subheader></v-col
                  >
                  <v-col cols="7">
                    <v-dialog
                      ref="dialog"
                      v-model="modalTwo"
                      :return-value.sync="date"
                      persistent
                      width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="date"
                          label="Date of Leaving"
                          append-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          outlined
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="date" scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="modal = false">
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
              <v-btn color="primary" dark text @click="save">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small @click="deleteItem(item)">
        mdi-close-thick
      </v-icon>
    </template>
  </v-data-table>
</template>
<script>
import { headers, data } from "../utils/tableHeaders.js";
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers,
    tableData: [],
    data,
    editedItem: {
      name: "",
      email: "",
      avatar: "",
      experience: "",
    },
    modal: false,
    modalTwo: false,
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
  }),

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.tableData = data;
  },

  methods: {

    deleteItem(item) {
      this.editedIndex = this.tableData.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.tableData.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.tableData[this.editedIndex], this.editedItem);
      } else {
        this.tableData.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>
