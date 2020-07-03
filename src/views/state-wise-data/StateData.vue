<!-- up left side cards. clicking cards changes the data in active recovery etc
right side map with hover showing that district cases again active or recovered etc.
 depending upon which card is selected 
 also add home button reuse cards-->
<template>
  <div>
    <v-container>
      <div class="text-md-h4 red--text ma-5" >{{selectedStateName}}</div>
      <v-sheet max-width="50%">
        <v-row>
      <v-col v-for="(data,index) in casesTally" :key="index">
       <appCard :casesTally="data" :value="category[index]"  @click.native="selectCategory(category[index])"/>
      </v-col>
          </v-row>
         <div :class="textColor[selectedCategory]" class="text-md-h5 mt-4"> Top Districts</div>
        <v-row>
          
          <v-col
            v-for="(data,districtName) in selectedStateData.districtData"
            :key="districtName"
            cols="12"
            xs="12"
            sm="4"
            md="4"
          >
            <span class="text-md-h6">{{data[selectedCategory] }}</span>
            <span class="caption" > {{districtName.toUpperCase()}}</span>
          </v-col>
        </v-row>
      </v-sheet>
    </v-container>
  </div>
</template>

<script>
import { stateDistrictWiseData } from "@/service/index.js";
import {category, cardColor, textColor} from "@/shared/colorScheme.js"
import appCard from "@/components/status-card/Card.vue";
export default {
  name: "SelectedStateData",
  components:{
    appCard
  },
  data() {
    return {
      selectedStateName: this.$route.params.id,
      districtWiseData: {},
      selectedStateData: {},
      selectedCategory: "confirmed",
      category:category,
      textColor:textColor
    };
  }
  ,
  created() {
    this.getStateDistrictWiseData();
  },
  methods: {
    async getStateDistrictWiseData() {
      const promise = await stateDistrictWiseData();
      this.districtWiseData = promise.data;
      this.selectedStateData = this.getSelectedStateData;
    },
      selectCategory(value){
        console.log(value)
      this.selectedCategory=value;
    }
   
  },
  computed: {
    getSelectedStateData() {
      return this.districtWiseData[this.selectedStateName];
    },
    casesTally(){
      let confirmed=0,active=0,recovered=0,deceased=0;
      for(let names in this.selectedStateData.districtData)
     {
       confirmed+= this.selectedStateData.districtData[names].confirmed;
       active+= this.selectedStateData.districtData[names].active;
       recovered+= this.selectedStateData.districtData[names].recovered;
       deceased+= this.selectedStateData.districtData[names].deceased;
     }
     return [confirmed,active,recovered,deceased];
    }
  }
};
</script>