<template>
  <div>
        <v-card outlined :class="cardColor[value]">
          <v-card-title :class="textColor[value]">{{casesTally}}</v-card-title>
          <v-card-subtitle class="overline pt-0" :class="textColor[value]">{{value}}</v-card-subtitle>
          <v-card-actions></v-card-actions>
        </v-card >
  </div>
</template>
<script>
import { category, cardColor, textColor } from "@/shared/colorScheme.js";
export default {
  name: "Card",
  data() {
    return {
      category: category,
      cardColor: cardColor,
      textColor: textColor
    };
  },
  props: {
    casesTally: {
      type:[String,Number]
    },
    value:{
      type:String
    }
  },
  methods:{
     value1(){
      console.log('hello')
    }
  }
};
</script>