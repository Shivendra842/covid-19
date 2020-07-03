<template>
  <div>
    <h2 class="text-center ma-3">Covid-19 website home page</h2>
    <v-container>
      <v-row class="mt-4">
        <v-col>
          <stateData :stateWiseData="stateWiseData" />
        </v-col>
        <v-col>
          <v-row>
            <v-col v-for="(data,index) in category" :key="index">
              <v-card outlined :class="cardColor[index]">
                <v-card-title :class="textColor[index]">{{casesTally[index]}}</v-card-title>
                  <v-card-subtitle class="overline pt-0" :class="textColor[index]">{{data}}</v-card-subtitle>
                  
                
              </v-card>
            </v-col>
          </v-row>
          <v-col>
            <v-row v-for="(data,index) in visualization" :key="index">
              <appGraph
                :dataPoints="data"
                :dateLable="dateLabel"
                :name="category[index]"
                :color="cardColor[index]"
              />
            </v-row>
          </v-col>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { timeSeriesData } from "@/service/index.js";
import appGraph from "@/components/visualization/Graph.vue";
import stateData from "@/components/cumulative-data/AllStateData.vue";
export default {
  name: `AppHome`,
  components: {
    appGraph,
    stateData
  },
  data() {
    return {
      nationalData: {},
      caseTimeSeries: {},
      stateWiseData: {},
      sampleTestedTimeSeries: {},
      dateLabel: undefined,
      category: ["confirmed", "active", "recovered", "deaths"],
      cardColor: [
        "red lighten-4",
        "blue lighten-4",
        "green lighten-4",
        "grey lighten-4"
      ],
      textColor: ["red--text", "blue--text", "green--text", "grey--text"]
    };
  },
  async created() {
    await this.getNationalData();
    this.caseTimeSeries = this.getCaseTimeSeriesData;
    this.stateWiseData = this.getStateWiseData;
    this.sampleTestedTimeSeries = this.getSampleTestedTimeSeries;
  },
  methods: {
    async getNationalData() {
      /*
            const promise= timeSeriesData();
            promise.then(response => {
                this.nationalData=response.data;
            })*/
      const promise = await timeSeriesData();
      this.nationalData = promise.data;
      //  console.log(this.nationalData)
      // console.log(`after getting the nationalData for fisrt time`)
    }
  },
  computed: {
    getCaseTimeSeriesData() {
      return this.nationalData.cases_time_series;
    },
    getStateWiseData() {
      return this.nationalData.statewise;
    },
    getSampleTestedTimeSeries() {
      return this.nationalData.tested;
    },
    casesTally() {
      let tally = [];
      tally.push(this.stateWiseData[0].confirmed);
      tally.push(this.stateWiseData[0].active);
      tally.push(this.stateWiseData[0].recovered);
      tally.push(this.stateWiseData[0].deaths);
      return tally;
      /*
       */
    },
    visualization() {
      let positiveCount = [];
      let recoveredCount = [];
      let deceasedCount = [];
      let activeCount = [];
      let dateLabel = [];
      for (let iterator in this.caseTimeSeries) {
        dateLabel.push(this.caseTimeSeries[iterator].date);
        positiveCount.push(
          Number(this.caseTimeSeries[iterator].totalconfirmed/1000)
        );
        //positiveCount.push(Number(this.caseTimeSeries[iterator].dailyconfirmed));
        recoveredCount.push(
          Number(this.caseTimeSeries[iterator].totalrecovered)
        );
        deceasedCount.push(Number(this.caseTimeSeries[iterator].totaldeceased));
        // dateLabel.push(Number(this.caseTimeSeries[iterator].date));
        activeCount.push(
          this.caseTimeSeries[iterator].totalconfirmed -
            this.caseTimeSeries[iterator].totalrecovered -
            this.caseTimeSeries[iterator].totaldeceased
        );
      }
      this.dateLabel = dateLabel;
      var mov=moment();
    //  let str = moment(dateLabel[0],'mm')
     console.log(str)
      //console.log(positiveCount)
      return [positiveCount, activeCount, recoveredCount, deceasedCount];
      // return [positiveCount.slice(100,positiveCount.length-1),activeCount,recoveredCount,deceasedCount,dateLabel];
    }
  }
};
</script>

<style scoped>
.size {
  max-width: 20px;
  max-height: 20px;
}
</style>


