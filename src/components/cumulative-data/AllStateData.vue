<template>
  <div>
    <v-data-table
      :headers="tableHeaders"
      :items="compiledStateWiseData"
      :items-per-page="10"
      :disable-pagination="true"
      hide-default-footer
      @click:row="details($event.state)"
      class="pointer"
    ></v-data-table>
  </div>
</template>

<script>
export default {
  name: `StateData`,
  data() {
    return {
      tableHeaders: [
        {
          text: "State/UT",
          value: "state"
        },
        {
          text: "Confirmed",
          value: "confirmed"
        },
        {
          text: "Active",
          value: "active"
        },
        {
          text: "Recovered",
          value: "recovered"
        },
        {
          text: "Deceased",
          value: "deceased"
        }
      ]
    };
  },
  props: {
    stateWiseData: {
      type: [Array, Object]
    }
  },
  computed: {
    //,deceased,recovered,state
    compiledStateWiseData() {
      let compiledData = [];
      for (let iterator in this.stateWiseData) {
        let { C: confirmed, A: active, D: deceased, R: recovered, S: state } = {
          C: this.stateWiseData[iterator].confirmed,
          A: this.stateWiseData[iterator].active,
          D: this.stateWiseData[iterator].deaths,
          R: this.stateWiseData[iterator].recovered,
          S: this.stateWiseData[iterator].state
        };
        compiledData.push({ state, confirmed, active, recovered, deceased });
      }
      let total = compiledData.shift();
      compiledData.push(total);
      return compiledData;
    }
  },
  methods: {
    details(value) {
      this.$router.push({name:'StateWiseData', params:{id:value}});
    }
  }
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>
