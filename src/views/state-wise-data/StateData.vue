<!-- up left side cards. clicking cards changes the data in active recovery etc
right side map with hover showing that district cases again active or recovered etc.
 depending upon which card is selected 
 also add home button reuse cards-->
<template>
  <div>
    <v-container>
      <span class="text-md-h4 red--text">{{selectedStateName}}</span>
      <v-sheet max-width="50%">
        <v-row>
          <v-col
            v-for="(data,districtName) in selectedStateData.districtData"
            :key="districtName"
            cols="4"
          >
            <v-row no-gutters>
              <v-col>
                <span class="text-md-h6">{{data.confirmed }}</span>
                <span class="caption"> {{districtName.toUpperCase()}}</span>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-sheet>
    </v-container>
  </div>
</template>

<script>
import { stateDistrictWiseData } from "@/service/index.js";
export default {
  name: "SelectedStateData",
  data() {
    return {
      selectedStateName: this.$route.params.id,
      districtWiseData: {},
      selectedStateData: {}
    };
  },
  created() {
    this.getStateDistrictWiseData();
  },
  methods: {
    async getStateDistrictWiseData() {
      const promise = await stateDistrictWiseData();
      this.districtWiseData = promise.data;
      this.selectedStateData = this.getSelectedStateData;
    }
  },
  computed: {
    getSelectedStateData() {
      return this.districtWiseData[this.selectedStateName];
    }
  }
};
</script>