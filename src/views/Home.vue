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
      <v-col v-for="(data,index) in casesTally" :key="index">
        <appCard :casesTally="data" :value="category[index]" />
      </v-col>
          </v-row>
          <v-col>
          <v-row v-for="(data,index) in visualization" :key="index">
             <appGraph
                :dataPoints="data"
                :dateLable="dateLabel"
                :name="category[index]"
                :color="cardColor[category[index]]"
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
import appCard from "@/components/status-card/Card.vue";
import appGraph from "@/components/visualization/Graph.vue";
import stateData from "@/components/cumulative-data/AllStateData.vue";
import {category, cardColor, textColor} from "@/shared/colorScheme.js"
export default {
  name: `AppHome`,
  components: {
    appGraph,
    stateData,
    appCard
  },
  data() {
    return {
      nationalData: {},
      caseTimeSeries: {},
      stateWiseData: {},
      sampleTestedTimeSeries: {},
      dateLabel: undefined,
      category: category,
      cardColor: cardColor,
      textColor: textColor
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
          Number(this.caseTimeSeries[iterator].totalconfirmed )
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


