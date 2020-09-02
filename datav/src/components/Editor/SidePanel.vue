<template>
  <div class="panel">
    <div class="title" v-if="panelKey === 'layers'"><span>图层 ({{chartData.elements.length}})</span></div>
    <div class="title" v-else-if="panelKey !== ''"><span>{{componentList[panelKey].name}}
        ({{componentList[panelKey].children.length}})</span></div>
    <div class="layer-list" v-if="panelKey === 'layers'">
      <draggable v-model="chartData.elements" @start="handleLayerListDragStart" @end="handleLayerListDragEnd"
        ghost-class="ghost">
        <transition-group type="transition" :name="!drag ? 'flip-list' : null">
          <div class="list-item" v-for="(item, index) in chartData.elements" :key="item.name"
            @click="$parent.$parent.setActiveComponentByIndex(index)"
            :class="{active: index === $parent.$parent.currentElementIndex}">
            <div class="name">{{item.name}}</div><i class="el-icon-delete icon"
              @click="handleDeleteComponent(index)"></i>
          </div>
        </transition-group>
      </draggable>
    </div>
    <div class="component-list" v-else-if="panelKey !== ''">
      <div class="list-item" v-for="item in componentList[panelKey].children" @click="handleAddComponent(item)" :key="item.name">
        <div class="img-wrapper"><img :src="item.img" /></div>
        <div class="name">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import chartType from "../../assertData/constant";
import proxyData from "../../assertData/index";
/* eslint-disable */

export default {
  props: ["panelKey"],
  components: {
    draggable
  },
  data () {
    return {
      drag: false,
      componentList: {
        chart: {
          name: "图表",
          children: [
            {
              id: "line",
              name: "折线图",
              img: require("@/assets/img/charts/line.png"),
              type: chartType.line
            },
            {
              id: "histogram",
              name: "柱状图",
              img: require("@/assets/img/charts/histogram.png"),
              type: chartType.histogram
            },
            {
              id: "bar",
              name: "条形图",
              img: require("@/assets/img/charts/bar.png"),
              type: chartType.bar
            },
            {
              id: "pie",
              name: "饼图",
              img: require("@/assets/img/charts/pie.png"),
              type: chartType.pie
            },
            {
              id: "ring",
              name: "环状图",
              img: require("@/assets/img/charts/ring.png"),
              type: chartType.ring
            },
            {
              id: "funnel",
              name: "漏斗图",
              img: require("@/assets/img/charts/funnel.png"),
              type: chartType.funnel
            },
            {
              id: "radar",
              name: "雷达图",
              img: require("@/assets/img/charts/radar.png"),
              type: chartType.redar
            },
            // {
            //   id: "map-world",
            //   name: "世界地图",
            //   img: require("@/assets/img/charts/map-world.png")
            // },
            {
              id: "map",
              name: "中国地图",
              img: require("@/assets/img/charts/map-china.png"),
              type: chartType.map
            },
            // {
            //   id: "sankey",
            //   name: "桑基图",
            //   img: require("@/assets/img/charts/sankey.png")
            // },
            // {
            //   id: "scatter",
            //   name: "散点图",
            //   img: require("@/assets/img/charts/scatter.png")
            // },
            // {
            //   id: "candle",
            //   name: "K线图",
            //   img: require("@/assets/img/charts/candle.png")
            // },
            // {
            //   id: "gauge",
            //   name: "仪表盘",
            //   img: require("@/assets/img/charts/gauge.png")
            // },
            {
              id: "liquidfill",
              name: "水球图",
              img: require("@/assets/img/charts/liquidfill.png"),
              type: chartType.liquidfill
            },
            // {
            //   id: "wordcloud",
            //   name: "词云图",
            //   img: require("@/assets/img/charts/wordcloud.png")
            // }
          ]
        },
        text: {
          name: "文本",
          children: [
            {
              id: "text",
              name: "文本",
              img: require("@/assets/img/charts/text.png"),
              type: chartType.text1
            }
          ]
        },
        picture: {
          name: "图片",
          children: [
            {
              id: "image",
              name: "图片",
              img: require("@/assets/img/charts/image.png"),
              type: chartType.image1
            }
          ]
        },
        tools: {
          name: "组件",
          children: [
            {
              id: "border",
              name: "边框",
              img: require("@/assets/img/charts/border.png"),
              type: chartType.boeder
            }
          ]
        }
      },
      layerList: []
    };
  },
  computed: {
    chartData () {
      return this.$parent.chartData;
    }
  },
  methods: {
    handleLayerListDragStart (e) {
      this.drag = true;
      this.$parent.$parent.setActiveComponentByIndex(e.oldIndex);
    },
    handleLayerListDragEnd (e) {
      this.drag = false;
      this.$parent.$parent.setActiveComponentByIndex(e.newIndex);
    },
    async handleAddComponent (item) {
      let initData = {};
      const data = await proxyData[item.type]
      if (item.id == 'text') {
        initData = Object.assign(data)
      } else if (item.id == 'image') {
        initData = {
          type: "image",
          ...data
        };
      } else if (item.id == 'border') {
        initData = {
          type: "border",
          ...data
        };
      } else {
        initData = {  
          type: "chart",
          settings: {
            type: item.id,
          },
          ...data
        };
      }
      const component = {
        name: "新建图层" + (this.chartData.elements.length + 1),
        x: 10,
        y: 10,
        w: 400,
        h: 200,
        bgcolor: "rgba(0, 0, 0, 0)",
        active: false,
        data: initData
      };
      this.$parent.$parent.addComponent(component);
    },
    handleDeleteComponent (index) {
      this.$parent.$parent.deleteComponent(index);
    }
  }
};
</script>

<style lang="scss" scoped>
.panel {
  height: 100%;
  width: 250px;
  display: flex;
  flex-direction: column;
  background: #ffffffe9;
  box-shadow: 4px 0 4px #00000005;
}
.title {
  color: #999999;
  padding: 10px 16px 16px;
}
.component-list {
  flex: 1;
  padding: 0 10px 0 16px;
  overflow: scroll;

  .list-item {
    display: inline-block;
    width: 100px;
    background: rgba(64, 160, 255, 0.06);
    border: 1px solid rgba(64, 160, 255, 0.1);
    margin-right: 10px;
    margin-bottom: 12px;
    opacity: 0.6;
    transition: opacity, background 0.3s ease;
    text-align: center;
    padding: 5px 0;

    &:hover {
      cursor: pointer;
      opacity: 0.8;
      background: rgba(64, 160, 255, 0.1);
      border: 1px solid #409eff;
      .name {
        color: #666666;
      }
    }

    .img-wrapper {
      display: flex;
      width: 100%;
      height: 80px;
      align-items: center;
      justify-content: center;
      img {
        height: 54px;
      }
    }

    .name {
      height: 20px;
      line-height: 20px;
      font-size: 13px;
      color: #777777;
    }
  }
}

.flip-list-move {
  transition: transform 0.5s;
}

.ghost {
  opacity: 0.3;
  background: #c8ebfb;
}

.layer-list {
  flex: 1;
  padding: 0;
  overflow: scroll;

  .list-item {
    display: flex;
    align-items: center;
    height: 48px;
    width: 100%;
    transition: background 0.3s ease;
    border-top: 1px solid rgba(0, 0, 0, 0.03);
    border-bottom: 1px solid rgba(0, 0, 0, 0.03);
    border-right: 6px solid transparent;
    margin-bottom: -1px;
    padding: 0 16px;
    box-sizing: border-box;

    &.active {
      background: rgba(64, 160, 255, 0.06);
      border-right: 6px solid #409eff7d;
    }

    &:hover {
      opacity: 1;
      background: rgba(64, 160, 255, 0.06);

      .icon {
        opacity: 1;
      }
    }

    .name {
      flex: 1;
      color: #777777;
    }

    .icon {
      float: right;
      color: #999999;
      font-size: 14px;
      opacity: 0;
      transition: opacity 0.3s ease;

      &:hover {
        color: #409eff;
        cursor: pointer;
      }
    }
  }
}
</style>
